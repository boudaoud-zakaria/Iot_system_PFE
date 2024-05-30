// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Ensure the PrismaClient is defined only once
declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}

export default prisma;
