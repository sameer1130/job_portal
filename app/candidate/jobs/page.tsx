
import { getJobs } from "@/actions/jobs";
import Link from "next/link";

export default async function candidateJobPage(){
    const jobs = await getJobs();

    return(
        <div>
            <h1>Job Listings</h1>
            {jobs.length === 0 ? (
                <p>No jobs currently at the moment</p>
            ) : (
                <div>
                    {jobs.map((job) =>(
                        <div key={job.id} className=""> 
                        <h2>{job.title}</h2>
                        <p>{job.location}</p>
                        <p>{job.description} | {job.company}</p>
                        <Link
                            href={`/candidate/jobs/${job.id}`}
                            className="mt-2 inline-block text-blue-600 hover:underline"
                        >View Details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}