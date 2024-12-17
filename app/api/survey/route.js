import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const surveys = await prisma.SurveyOfficerResponsibility.findMany();
        return NextResponse.json(surveys, { status: 200 });
    } catch (error) {
        console.error('Error fetching Surveys:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Surveys. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
