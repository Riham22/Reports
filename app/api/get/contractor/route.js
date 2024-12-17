import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const contractors = await prisma.Contractor.findMany();
        return NextResponse.json(contractors, { status: 200 });
    } catch (error) {
        console.error('Error fetching Contractors:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Field Contractors. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
