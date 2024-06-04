"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

type dataListType = {
    id : string;
    firstName: string;
    lastName: string;
    cardId : string | null; 
}

export default async function insert(data : dataListType[] , id : string){

    for (let i = 0; i < data.length; i++) {
        if(data[i].cardId !== 'true'){
            const absence = await prisma.absence.create({
                data: {
                    studentId: data[i].id,
                    scheduleId : id,
                },
            });
        }
    }
    return 1;
}