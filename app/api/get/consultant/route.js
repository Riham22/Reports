import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const consultants = await prisma.Consultant.findMany();
        return NextResponse.json(consultants, { status: 200 });
    } catch (error) {
        console.error('Error fetching Consultant:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Consultant. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
