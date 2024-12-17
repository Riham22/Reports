import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const providers = await prisma.ServiceProvider.findMany();
        return NextResponse.json(providers, { status: 200 });
    } catch (error) {
        console.error('Error fetching Providers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Providers. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
