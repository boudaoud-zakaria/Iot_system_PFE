"use server"

import { PrismaClient , Student } from "@prisma/client"

const prisma = new PrismaClient();

export default async function listStudent(year : String , group : String) {
    const data = await prisma.student.findMany(
        {
            where :{
                yearOfStudyId : year.toString(),
                group : group.toString(),
            },
            select :{
                id : true,
                firstName : true,
                lastName : true,
                cardId : true,
                absence: { select: {id : true} },
            },
            orderBy: {
                firstName: "asc", // Order by firstName in ascending order
            },
        }
    );
    console.log(data[3]);
    
    return data;
}
