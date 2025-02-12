import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Mini Job Board</h1>
      <p className="text-lg text-gray-600 mb-8">
        Browse jobs as a candidate or manage job listings as a company.
      </p>
      
      <div className="flex space-x-6">
        {/* Candidate Flow */}
        <Link
          href="/candidate/jobs"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Browse Jobs
        </Link>

        {/* Company Flow */}
        <Link
          href="/company/jobs"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Manage Jobs
        </Link>
      </div>
    </main>
  );
}
