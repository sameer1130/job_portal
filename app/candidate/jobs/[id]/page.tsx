// /* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { getJobsbyId, getJobs } from "@/actions/jobs";

export const generateStaticParams = async () => {
  const jobs = await getJobs();
  return jobs.map(({ id }: { id: string }) => ({
    id: String(id),
  }));
};

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
    <div className="m-5">
      <div className="group bg-slate-100 mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
          <h3 className="text-sm text-gray-600">{job.company}</h3>
          <h2 className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{job.title}</h2>
          <p className="overflow-hidden pr-7 text-sm">{job.description}</p>
          
          <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <div className="">Category:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{job.category}</span>
            </div>
            <div className="">Location:
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.location}</span>
            </div>
          </div>
          
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
    </div>
  );
}
