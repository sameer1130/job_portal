"use server";

import prisma from "@/lib/prisma";

export async function applyForJob({
  name,
  email,
  resume,
  attachements,
  jobId,
}: {
  name: string;
  email: string;
  resume: string;
  attachements: string;
  jobId: string;
}) {
  try {
    // Check if the applicant already exists
    let applicant = await prisma.applicants.findFirst({
      where: { email },
    });

    // If the applicant does not exist, create a new one
    if (!applicant) {
      applicant = await prisma.applicants.create({
        data: { name, email, resume, attachements },
      });
    }

    // Check if the applicant has already applied for the job
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        jobId_applicantId: {
          jobId,
          applicantId: applicant.id,
        },
      },
    });

    if (existingApplication) {
      return { success: false, message: "You have already applied for this job." };
    }

    // Create a new job application entry
    await prisma.jobApplication.create({
      data: {
        jobId,
        applicantId: applicant.id,
      },
    });

    return { success: true, message: "Application submitted successfully." };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
