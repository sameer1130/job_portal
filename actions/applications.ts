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
    await prisma.applicants.create({
      data: { name, email, resume, attachements, jobId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false };
  }
}
