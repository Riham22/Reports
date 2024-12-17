import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();


    if (
        !body.companyName ||
        !body.licenseNumber ||
        !body.responsibleName ||
        !body.responsibleNationalId ||
        !body.responsibleMobile ||
        !body.responsibleCenterAddress ||
        !body.mResponsibleName ||
        !body.mResponsibleNationalId ||
        !body.mResponsibleMobile ||
        !body.mResponsibleCenterAddress ||
        !body.aResponsibleName ||
        !body.aResponsibleNationalId ||
        !body.aResponsibleMobile ||
        !body.aResponsibleCenterAddress
    ) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 } // Bad request
        );
    }

    try {

        console.log('Received data:', body);


        const consultant = await prisma.Consultant.create({
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


        console.log('Created service center:', consultant);

        return NextResponse.json(consultant, { status: 201 }); // Return the created service center as a response
    } catch (error) {

        console.error("Error creating service center:", error);


        return NextResponse.json(
            { error: `Failed to create the service center: ${error.message}` },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
