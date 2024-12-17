import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
        'companyName',
        'licenseNumber',
        'responsibleName',
        'responsibleMobile',
        'mResponsibleName',
        'mResponsibleMobile',
        'aResponsibleName',
        'aResponsibleMobile',
    ];

    for (const field of requiredFields) {
        if (!body[field]) {
            return NextResponse.json(
                { error: `${field} is required` },
                { status: 400 }
            );
        }
    }

    try {
        const newServiceProvider = await prisma.ServiceProvider.create({
            data: {
                companyName: body.companyName,
                licenseNumber: body.licenseNumber,
                responsibleName: body.responsibleName,
                responsibleMobile: body.responsibleMobile,
                mResponsibleName: body.mResponsibleName,
                mResponsibleMobile: body.mResponsibleMobile,
                aResponsibleName: body.aResponsibleName,
                aResponsibleMobile: body.aResponsibleMobile,
            },
        });

        return NextResponse.json(newServiceProvider, { status: 201 }); // Created
    } catch (error) {
        console.error('Error creating Service Provider:', error);
        return NextResponse.json(
            { error: 'Failed to create Service Provider. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
