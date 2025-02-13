import { getJobApplications, getJobs } from "@/actions/jobs";
import Link from "next/link";

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

export default async function JobApplicationsPage({ params }: { params: ParamsType }) {
  try {
    const { id } = await params;
    const applications = await getJobApplications(id);

    if (!applications || applications.length === 0) {
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-700">No applications yet</h1>
          <Link href="/company/jobs" className="text-blue-600 hover:underline">
            Back to Jobs
          </Link>
        </div>
      );
    }

    return (
      <section className="py-24">
        <div className="container mx-auto max-w-5xl p-6">
          <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

          <div className="grid gap-6">
            {applications.map((application) => (
              <div key={application.id} className="p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold">{application.applicant.name}</h2>
                <p className="text-gray-600">{application.applicant.email}</p>
                <p className="mt-2 text-gray-700">{application.applicant.resume}</p>
                <p className="mt-2 text-gray-600">
                  <strong>Attachments:</strong> {application.applicant.attachements}
                </p>

                <div className="mt-4 flex space-x-4">
                  <Link
                    href={`/company/jobs/${id}/applications/${application.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return (
      <div className="text-center py-20 text-red-500">
        <h1 className="text-2xl font-bold">Error loading applications</h1>
      </div>
    );
  }
}
