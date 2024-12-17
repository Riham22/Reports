import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const surveyer = await prisma.SurveyOfficerResponsibility.findMany();
        return NextResponse.json(surveyer, { status: 200 });
    } catch (error) {
        console.error('Error fetching surveyers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch surveyers. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
