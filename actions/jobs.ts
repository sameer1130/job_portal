"use server";

import prisma from "@/lib/prisma";

export async function getJobs(){
    try{
        const jobs = await prisma.jobs.findMany({
            orderBy: {createdAt: "desc"},
        });
        return jobs;
    }catch(error){
        console.error("Error fetching jobs: ", error);
        return[];
    }
}

import { Jobs } from "@prisma/client"; 

export async function getJobsbyId(id: string): Promise<Jobs | null> {
  try {
    const jobId = await prisma.jobs.findUnique({
      where: { id },
    });
    return jobId;
  } catch (error) {
    console.error("Error fetching jobs with id: ", error);
    return null;
  }
}

export async function getCompanyJobs(company?:string){
    try{
        // if(!company){
        //     throw new Error("Company name is required")
        // }
        const jobs = await prisma.jobs.findMany({
            where:{company},
            orderBy:{createdAt:"desc"}
        })
        return jobs;
    }
    catch(error){
        console.error("Error Fetching Company Details", error)
    }
}

export async function addJob({
    title,
    company,
    description,
    location,
    category,
   

}:{title: string;
    company: string;
    description:string;
    location: string;
    category:string;
   
}){
    try{
        await prisma.jobs.create({
            data:{title,category,company,description,location},
        })
        return { success: true };
    }
 catch (error) {
  console.error("Error submitting application:", error);
  return { success: false };
}
}

export async function getJobApplications(jobId: string) {
    try {
      // Fetch all applicants for a specific job
      const applications = await prisma.jobApplication.findMany({
        where: { jobId },
        include: {
          applicant: true, // Fetch applicant details (name, email, resume, etc.)
        },
      });
  
      return applications;
    } catch (error) {
      console.error("Error fetching job applications:", error);
      throw new Error("Failed to fetch job applications");
    }
  }

  export async function updateJob(
    jobId: string,
    { title, description, location, category }: { title: string; description: string; location: string; category: string }
  ) {
    try {
      const updatedJob = await prisma.jobs.update({
        where: { id: jobId },
        data: {
          title,
          description,
          location,
          category,
        },
      });
      return updatedJob ? true : false;
    } catch (error) {
      console.error("Error updating job:", error);
      throw new Error("Failed to update job");
    }
  }