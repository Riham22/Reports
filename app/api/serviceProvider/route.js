import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();


    if (!body.companyName ||
        !body.licenseNumber ||
        !body.responsibleName ||
        !body.responsibleMobile ||
        !body.mResponsibleName ||
        !body.mResponsibleMobile ||
        !body.aResponsibleName ||
        !body.aResponsibleMobile
    ) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    try {
        const serviceProvider = await prisma.ServiceProvider.create({
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

        return NextResponse.json(serviceProvider, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create the service provider" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
