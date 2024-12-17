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
        'responsibleNationalId',
        'responsibleMobile',
        'responsibleCenterAddress',
        'mResponsibleName',
        'mResponsibleNationalId',
        'mResponsibleMobile',
        'mResponsibleCenterAddress',
        'aResponsibleName',
        'aResponsibleNationalId',
        'aResponsibleMobile',
        'aResponsibleCenterAddress',
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
        const newConsultant = await prisma.Consultant.create({
            data: {
                companyName: body.companyName,
                licenseNumber: body.licenseNumber,
                responsibleName: body.responsibleName,
                responsibleNationalId: body.responsibleNationalId,
                responsibleMobile: body.responsibleMobile,
                responsibleCenterAddress: body.responsibleCenterAddress,
                mResponsibleName: body.mResponsibleName,
                mResponsibleNationalId: body.mResponsibleNationalId,
                mResponsibleMobile: body.mResponsibleMobile,
                mResponsibleCenterAddress: body.mResponsibleCenterAddress,
                aResponsibleName: body.aResponsibleName,
                aResponsibleNationalId: body.aResponsibleNationalId,
                aResponsibleMobile: body.aResponsibleMobile,
                aResponsibleCenterAddress: body.aResponsibleCenterAddress,
            },
        });

        return NextResponse.json(newConsultant, { status: 201 }); // Created
    } catch (error) {
        console.error('Error creating Consultant:', error);
        return NextResponse.json(
            { error: 'Failed to create Consultant. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
