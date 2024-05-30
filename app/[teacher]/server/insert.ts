"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

type dataListType = {
    id : string;
    firstName: string;
    lastName: string;
    cardId : string | null; 
}

export default async function insert(data : dataListType[]){
    console.log(data);
    
    return 1;
}