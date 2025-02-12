/* eslint-disable @typescript-eslint/no-explicit-any */
import { getJobsbyId } from "@/actions/jobs";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function jobDetails({ params }: { params: { id?: string } }) {
    try {
        const jobId = params.id;

        if (!jobId) {
            return notFound();
        }

        const job = await getJobsbyId(jobId);

        if (!job) {
            return (
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold text-red-500">Job not found</h1>
                    <Link href="/candidate/jobs" className="text-blue-600 hover:underline">
                        Back to Job Listings
                    </Link>
                </div>
            );
        }

        return (
            <div className="max-w-3xl mx-auto p-6">
                
                <h1 className="text-3xl font-bold">{(job as any).title}</h1>
                <p className=" mt-2">{(job as any).company}</p>
                <p className=" mt-4">{(job as any).description}</p>
                <p className="mt-2">Location: {(job as any).location}</p>
                <p className="mt-2">Category: {(job as any).category}</p>

                <Link
                    href={`/candidate/apply/${(job as any).id}`}
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Apply Now
                </Link>
            </div>
        );
    } catch (error) {
        console.error("Error fetching job details:", error);
        return notFound();
    }
}