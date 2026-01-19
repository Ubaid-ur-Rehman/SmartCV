import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import ATS from '~/Components/ATS';
import Details from '~/Components/Details';
import Summary from '~/Components/Summary';
import { usePuterStore } from '~/lib/puter';

const resume = () => {
    const {auth , kv , fs , isLoading} = usePuterStore();
    const [resumeURL, setResumeURL] = React.useState<string | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [feedback, setFeedback] = React.useState<any>(null);
    const {id} =  useParams();

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if(!resume) return;
            const resumeData = JSON.parse(resume);
            const resumeBlob = await fs.read(resumeData.resumePath);
            if(!resumeBlob) return;
            const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeURL(resumeUrl);
            const imageBlob = await fs.read(resumeData.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
            setFeedback(resumeData.feedback);
        }
        loadResume();
    }, [id]);
  return (
    <main className='!pt-0'>
        <nav className='resume-nav'>
            <Link to={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
        <p className='text-2xl font-bold text-gradient'> SMART CV</p>
            </Link>
        </nav>
        <div className='flex flex-row w-full max-lg:flex-col-reverse'>
        <section className='feedback-section bg-[url("/images/bg-small.svg")] bg-cover  sticky top-0 justify-center items-center h-full w-full max-w-4xl mx-auto px-8 py-16'>
           {imageUrl && resumeURL && (
            <div className='animate-in fade-in duration-1000 gradient-border '>
                <a href={resumeURL} target="_blank" rel="noopener noreferrer" className='h-full w-full'>
                    <img src={imageUrl} alt="Resume Preview" className='w-full h-full object-contain rounded-lg'/>
                </a>
            </div>
           )}
        </section>
        <section className='feedback-section'>
            <h2 className='text-black font-bold text-4xl'>Resume feedback</h2>
            {feedback ? (
                <div className='flex flex-col gap-6 mt-8 fade-in animate-in duration-1000'>
                    <Summary feedback={feedback} />
                    <ATS  score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                    <Details feedback={feedback} />
                </div>
                    ) : (
                    <img src="/images/resume-scan-2.gif" alt="Score Icon" className='inline w-full justify-center  mr-2'/>
                    )}
        </section>
        </div>
    </main>
  )
}

export default resume