"use server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function time(TeacherId:String , Day : String ) {

    const result = await prisma.schedule.findMany({
        where: {
            teacherId: TeacherId.toString(),
            day: Day.toString(),
        },
        select: {
            id: true,
            day:true,
            classroom: true,
            group: true,
            start: true,
            end: true,
            year: {
            select: {
                id:true,
                name: true,
            },
        },
        module: {
            select: {
                abbreviation: true,
            },
            },
            
        },
        orderBy: {
            start: "asc", // Order by firstName in ascending order
        }
    });
    // console.log(result);
    // const data = await prisma.student.findMany();
    // console.log(data);
    
    return result;
}
