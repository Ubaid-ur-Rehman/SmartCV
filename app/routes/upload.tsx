import React, { useState } from 'react'
import Navbar from '~/Components/Navbar'
import UploadFile from '~/Components/UploadFile';
import { convertPdfToImage } from '~/lib/pdf2image';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/lib/utils';
import {prepareInstructions} from '../../constants/index'

const upload = () => {
    const {fs , ai , kv , auth } = usePuterStore();
    const [isLoading, setIsLoading] = useState(false);
    const [statusText, setStatusText] = useState("Uploading your resume...");
    const [file, setFile] = useState<File | null>(null);    
    const onFileSelect = (file: File) => {
        console.log("Selected file:", file);
        setFile(file);
        // You can add further processing here if needed
    }
    let handleAnalysis = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string,}) => {
        setIsLoading(true);
        setStatusText("Uploading your resume...");

        const uploadedFile = await fs.upload(file);
        if(!uploadedFile) return setStatusText("Failed to upload file. Please try again.");
        setStatusText("Converting to Image...");
        const imageFile : any = await convertPdfToImage(file);
        if(!imageFile) return setStatusText("Failed to convert PDF to Image. Please try again.");
        setStatusText("Uploading the Image...");
        const uploadedImage = await fs.upload(imageFile.file);
        if(!uploadedImage) return setStatusText("Failed to upload image. Please try again.");
        setStatusText("Preparing Data...");

        const uuid = generateUUID();

        const data = {
            id: uuid,
            jobTitle,
            jobDescription,
            companyName,
            resumePath: uploadedFile.path,
            imagePath : uploadedImage.path,
            feedback : ''

        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText("Analyzing...");

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        );
        if(!feedback) return setStatusText("Failed to get feedback. Please try again.");
        // const feedbackText = typeof feedback.message.content ==  ? feedback.message.content : JSON.stringify(feedback.message.content);
            const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText("Analysis Complete!");
        console.log("Analysis complete:", data);

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;
        // console.log({companyName, jobTitle, jobDescription, file});
        if(!file) return;
        handleAnalysis({companyName, jobTitle, jobDescription, file});
    }
    return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
            <h2 className='font-bold'>Smart feedback for your dream job</h2>
            { isLoading ? (
                <>                
                    <h2>{statusText}</h2>
                <img src="/images/resume-scan.gif" alt="Loading..." className='mx-auto mt-4 w-16 h-16'/>
                </>
            ) : (
                <h3>Drop your resume for an ATS score and improvments tips</h3>

            )}
            {!isLoading && (
                <form className='mt-8 flex flex-col gap-2' id="upload-form" onSubmit={handleSubmit}> 
                <div className='form-div'>
                    <label htmlFor="company-name">Company Name</label>
                    <input type="text" name='company-name' placeholder='Company Name' id='company' />
                </div>
                <div className='form-div'>
                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name='job-title' placeholder='Job Title' id='job' />
                </div>
                <div className='form-div'>
                    <label htmlFor="job-description">Job Description</label>
                    <textarea rows={5} name='job-description' placeholder='Job Description' id='job' />
                </div>
                <div className='form-div'>
                    <label htmlFor="uploader">Upload Resume</label>
                    <UploadFile onFileSelect={onFileSelect} />
                </div>
                <button className='primary-button' type="submit">Analyse Resume</button>
                </form>
            )}
        </div>
        </section>
        </main>
  )
}

export default upload