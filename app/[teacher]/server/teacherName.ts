"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function teacherName(teacherId : String){
    const result = await prisma.teacher.findMany(
        {
            where : {
                id : teacherId.toString(),
            },
            select :{
                firstName : true,
                lastName : true,
            }
        }
    )
    console.log(result);
    
    return result;
}