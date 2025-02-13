"use client";

import { useState, useEffect } from "react";
import { getCompanyJobs } from "@/actions/jobs";
import Link from "next/link";
type Job = {
    id: string;
    title: string;
    description: string;
    company: string;
    location:string;
}
export default function CompanyJobsPage() {
  const [companyId, setCompanyId] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const allJobs = await getCompanyJobs(); 
        setJobs(allJobs ?? []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

 
  const fetchJobsByCompany = async () => {
    if (!companyId.trim()) {
      setError("Please enter a valid company ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const filteredJobs = await getCompanyJobs(companyId);
      setJobs(filteredJobs ?? []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Company Job Listings</h1>

      
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Company Name..."
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <button
          onClick={fetchJobsByCompany}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      
      {loading && <p className="text-center text-gray-600">Loading jobs...</p>}

      
      {error && <p className="text-center text-red-500">{error}</p>}

      
      {!loading && jobs.length === 0 && !error && (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-700">No jobs found</h1>
          <Link href="/company/jobs/create" className="text-blue-600 hover:underline">
            Post a Job
          </Link>
        </div>
      )}

      {/* Jobs List */}
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-700 mt-2">{job.description.slice(0, 100)}...</p>
            <p className="mt-2 text-gray-600">
              <strong>Location:</strong> {job.location}
            </p>
            {/* <p className="mt-2 text-gray-600">
              <strong>Salary:</strong> ${job.salary}
            </p> */}

            <div className="mt-4 flex space-x-4">
              <Link
                href={`/company/jobs/${job.id}/applications`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View Applicants
              </Link>
              <Link
                href={`/company/jobs/${job.id}/edit`}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
