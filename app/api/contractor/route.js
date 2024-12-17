import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
        'businessName',
        'commercialNumber',
        'contractorName',
        'nationalId',
        'mobile',
        'companyAddress',
        'electricianName',
        'electricianId',
        'electricianMobile',
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
        const newContractor = await prisma.Contractor.create({
            data: {
                businessName: body.businessName,
                commercialNumber: body.commercialNumber,
                contractorName: body.contractorName,
                nationalId: body.nationalId,
                mobile: body.mobile,
                companyAddress: body.companyAddress,
                electricianName: body.electricianName,
                electricianId: body.electricianId,
                electricianMobile: body.electricianMobile,
            },
        });

        return NextResponse.json(newContractor, { status: 201 }); // Created
    } catch (error) {
        console.error('Error creating Contractor:', error);
        return NextResponse.json(
            { error: 'Failed to create Contractor. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
