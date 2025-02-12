"use client";

import { applyForJob } from "@/actions/applications";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ApplyPageProps {
  params: { jobId: string };
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    attachements: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await applyForJob({ ...formData, jobId: params.jobId });

    if (response.success) {
      setSuccess(true);
      setFormData({ name: "", email: "", resume: "", attachements: "" });
      setTimeout(() => router.push("/candidate/jobs"), 2000);
    } else {
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
      
      {success ? (
        <p className="text-green-600">Application submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            name="resume"
            placeholder="Resume Link (Google Drive, Dropbox, etc.)"
            value={formData.resume}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="coverLetter"
            placeholder="Cover Letter"
            value={formData.attachements}
            onChange={handleChange}
            // required
            className="w-full p-2 border rounded"
          ></input>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}
