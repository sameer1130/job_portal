/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getJobsbyId, updateJob } from "@/actions/jobs";
import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define the type for `params`
export type ParamsType = Promise<{ id: string }>;

export default function EditJobPage({ params }: { params: ParamsType }) {
  const [job, setJob] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(""); 
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchJob() {
      try {
        const { id } = await params;
        const jobData = await getJobsbyId(id);
        if (!jobData) {
          notFound();
        } else {
          setJob(jobData);
          setTitle(jobData.title);
          setDescription(jobData.description);
          setLocation(jobData.location);
          setCategory(jobData.category); // Use category field from the job data
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    }

    if (isClient) {
      fetchJob();
    }
  }, [params, isClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { id } = await params;
      const success = await updateJob(id, { title, description, location, category });

      if (success) {
        alert("Job successfully updated!");
        router.push("/company/jobs");
      } else {
        alert("Failed to update the job.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job.");
    }
  };

  if (!job) {
    return <div className="text-center py-20 text-gray-600">Loading job details...</div>;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Job Posting</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-semibold">
              Job Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={6}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-semibold">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-lg font-semibold">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Job
            </button>
            <button
              type="button"
              onClick={() => router.push(`/company/jobs`)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
