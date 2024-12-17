import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const fieldOfficers = await prisma.FieldOfficer.findMany();
        return NextResponse.json(fieldOfficers, { status: 200 });
    } catch (error) {
        console.error('Error fetching Field Officers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Field Officers. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
