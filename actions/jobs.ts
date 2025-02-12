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

export async function getJobsbyId(id:string){
    try{
        const jobId = await prisma.jobs.findUnique({
            where:{id}
        });
        return jobId;
    }catch(error){
        console.error("Error fetching jobs with id: ", error);
        return[];
    }
}

