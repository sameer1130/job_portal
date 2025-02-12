import { getJobApplications } from "@/actions/jobs"; // Make sure to create this action
// import { notFound } from "next/navigation";
import Link from "next/link";

export default async function JobApplicationsPage({ params }: { params: { id: string } }) {
  try {
    // Fetch all applications for the specific job
    const applications = await getJobApplications(params.id);

    if (!applications || applications.length === 0) {
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-700">No applications yet</h1>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

        <div className="grid gap-6">
          {applications.map((application) => (
            <div key={application.id} className="p-6 bg-white shadow-md rounded-md">
              <h2 className="text-2xl font-semibold">{application.applicant.name}</h2>
              <p className="text-gray-600">{application.applicant.email}</p>
              <p className="mt-2 text-gray-700">{application.applicant.resume.slice(0, 100)}...</p>
              <p className="mt-2 text-gray-600">
                <strong>Attachments:</strong> {application.applicant.attachements}
              </p>

              <div className="mt-4 flex space-x-4">
                <Link
                  href={`/jobs/${params.id}/applications/${application.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
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
