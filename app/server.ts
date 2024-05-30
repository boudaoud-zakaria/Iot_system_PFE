"use server"
import { PrismaClient, Teacher } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Server(TeacherId : string | undefined) {
    if(TeacherId){
        const result = await prisma.teacher.findMany(
            {
                where : {cardIs : TeacherId},
            }
        );
        console.log(result.length);
        
        if(result.length == 1)
        return result[0].id?.toString();
        return "false";
    }
    return "false";
}
