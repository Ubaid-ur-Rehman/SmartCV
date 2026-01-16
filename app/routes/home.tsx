import Navbar from "~/Components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/Components/ResumeCard";
import { resumes } from "../../constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart CV" },
    { name: "description", content: "Smart Feedback for you dream Job!" },
  ];
}

export default function Home() {
  return (
    <>
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
        <h1>Track you Applications and Resume Ratings</h1>
        <h2>Review your submissions & check AI-Powered feedback</h2>
          
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume)=> {
              return(
                <ResumeCard key={resume.id} resume={resume} />
              )
            })}
          </div>
        )}
      </section>
    </main>
    </>
  )
}
