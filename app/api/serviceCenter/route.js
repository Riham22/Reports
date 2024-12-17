import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();


    if (
        !body.companyName ||
        !body.serviceCenterNumber ||
        !body.nationality ||
        !body.count ||  // Only check responsiblePersonName
        !body.headName ||
        !body.headId ||
        !body.headMobile ||
        !body.headTradeNumber ||
        !body.viceName ||
        !body.viceNationalId ||
        !body.viceMobile ||
        !body.viceLocation ||
        !body.arHeadName ||
        !body.arHeadId ||
        !body.arHeadMobile ||
        !body.arHeadLocation ||
        !body.minaHeadName ||
        !body.minaHeadId ||
        !body.minaHeadMobile ||
        !body.minaHeadLocation
    ) {
        return NextResponse.json(
            { error: "All Fields are required" },
            { status: 400 } // Bad request
        );
    }

    try {

        console.log('Received data:', body);


        const serviceCenter = await prisma.ServiceCenter.create({
            data: {
                companyName: body.companyName,
                serviceCenterNumber: body.serviceCenterNumber,
                nationality: body.nationality,
                count: body.count,
                headName: body.headName,
                headId: body.headId,
                headMobile: body.headMobile,
                headTradeNumber: body.headTradeNumber,
                viceName: body.viceName,
                viceNationalId: body.viceNationalId,
                viceMobile: body.viceMobile,
                viceLocation: body.viceLocation,
                arHeadName: body.arHeadName,
                arHeadId: body.arHeadId,
                arHeadMobile: body.arHeadMobile,
                arHeadLocation: body.arHeadLocation,
                minaHeadName: body.minaHeadName,
                minaHeadId: body.minaHeadId,
                minaHeadMobile: body.minaHeadMobile,
                minaHeadLocation: body.minaHeadLocation,
            },
        });


        console.log('Created service center:', serviceCenter);

        return NextResponse.json(serviceCenter, { status: 201 });
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
