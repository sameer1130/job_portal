"use client";

import { useState, useEffect } from "react";
import { getJobs } from "@/actions/jobs";
import Link from "next/link";

interface Job {
    location: string;
    category: string;
    company: string;
    title: string;
    id: string;
    description: string;
    createdAt: Date;
  }
export default function CandidateJobPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    company: "",
    title: "",
  });

  useEffect(() => {
    async function fetchJobs() {
      const jobList = await getJobs();
      setJobs(jobList);
      setFilteredJobs(jobList);
    }
    fetchJobs();
    
    
  }, []);

  // Filtering logic
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      return (
        (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.category === "" || job.category.toLowerCase().includes(filters.category.toLowerCase())) &&
        (filters.company === "" || job.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.title === "" || job.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (search === "" || job.title.toLowerCase().includes(search.toLowerCase()))
      );
    });

    setFilteredJobs(filtered);
  }, [filters, search, jobs]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>

      {/* 🔍 Filter & Search Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="p-2 border rounded w-full"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="p-2 border rounded w-full"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          className="p-2 border rounded w-full"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        />
      </div>

      {/* 📌 Job Listings */}
      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-500">{job.company} | {job.location}</p>
              <p className="text-gray-700 mt-2 text-sm">{job.description.slice(0, 100)}...</p>
              <Link
                href={`/candidate/jobs/${job.id}`}
                className="mt-3 inline-block text-blue-600 font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
