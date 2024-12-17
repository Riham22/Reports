import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const centers = await prisma.ServiceCenter.findMany();
        return NextResponse.json(centers, { status: 200 });
    } catch (error) {
        console.error('Error fetching Service center:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Field Service Centers. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
