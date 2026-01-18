import React, { useState } from 'react'
import Navbar from '~/Components/Navbar'
import UploadFile from '~/Components/UploadFile';

const upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [statusText, setStatusText] = useState("Uploading your resume...");
    const [file, setFile] = useState<File | null>(null);    
    const onFileSelect = (file: File) => {
        console.log("Selected file:", file);
        setFile(file);
        // You can add further processing here if needed
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;
        console.log({companyName, jobTitle, jobDescription, file});
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