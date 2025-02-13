// /* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { getJobsbyId,getJobs } from "@/actions/jobs";

// Define static params for pre-rendering
export const generateStaticParams = async () => {
  // You may fetch job IDs from a database or an API
  const jobs = await getJobs(); // Assuming getJobs() fetches all jobs
  return jobs.map(({ id }: { id: string }) => ({
    id: String(id),
  }));
};

// Define the type for `params`
export type ParamsType = Promise<{ id: string }>;

export default async function JobDetails({ params }: { params: ParamsType }) {
  const { id } = await params;
  const job = await getJobsbyId(id);

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
    <section className="py-24">
      <div className="container mx-auto">
        <div>
          <Link href="/candidate/jobs" className="font-semibold italic text-sky-600 underline">
            ← Back to Job Listings
          </Link>
        </div>
        <div className="mt-10 max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-xl font-semibold">Job Title</h1>
          <h2 className="text-3xl font-bold text-gray-900">{job.title}</h2>
          <h2 className="text-xl font-semibold">Company</h2>
          <p className="text-lg text-gray-600 mt-2">{job.company}</p>
          <h2 className="text-xl font-semibold">Location & Category</h2>
          <p className="mt-1 text-gray-500">{job.location} | {job.category}</p>

          {/* Job Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            <Link
              href={`/candidate/apply/${job.id}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
