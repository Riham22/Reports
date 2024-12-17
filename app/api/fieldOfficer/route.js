import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
        'name',
        'rank',
        'phoneNumber',
        'regionNumber',
        'centerNumber',
        'networkNumber',
    ];

    // Check if all required fields are provided
    for (const field of requiredFields) {
        if (!body[field]) {
            return NextResponse.json(
                { error: `${field} is required` },
                { status: 400 }
            );
        }
    }

    try {
        // Create new field officer in the database
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
