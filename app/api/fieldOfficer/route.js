import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();

    if (!body.name || !body.rank || !body.phoneNumber || !body.regionNumber || !body.centerNumber || !body.networkNumber) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    try {
        const newFieldOfficer = await prisma.FieldOfficer.create({
            data: {
                name: body.name,
                rank: body.rank,
                phoneNumber: body.phoneNumber,
                regionNumber: body.regionNumber,
                centerNumber: body.centerNumber,
                networkNumber: body.networkNumber,
            },
        });

        return NextResponse.json(newFieldOfficer, { status: 201 }); // Created
    } catch (error) {
        console.error('Error creating Field Officer:', error);

        return NextResponse.json(
            { error: 'Failed to create Field Officer. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
