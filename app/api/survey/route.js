import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();


    if (
        !body.companyName ||
        !body.serviceCenterNumber ||
        !body.nationality ||
        !body.count ||
        !body.location ||
        !body.serviceHeadName ||
        !body.generalResponsibleName ||
        !body.officerName ||
        !body.officerCenterNumber ||
        !body.officerNetworkNumber ||
        !body.north ||
        !body.south ||
        !body.west ||
        !body.east ||
        !body.northExitsCount ||
        !body.southExitsCount ||
        !body.westExitCount ||
        !body.eastExitCount ||
        !body.extinguisherCount ||
        !body.powderExtinguisherCount ||
        !body.dioxideExtinguisherCount ||
        !body.extinCheckComp ||
        !body.extinCheckCompNumber ||
        !body.additions
    ) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    try {

        console.log('Received data:', body);
        const survey = await prisma.SurveyOfficerResponsibility.create({
            data: {
                companyName: body.companyName,
                serviceCenterNumber: body.serviceCenterNumber,
                nationality: body.nationality,
                count: body.count,
                location: body.location,
                serviceHeadName: body.serviceHeadName,
                generalResponsibleName: body.generalResponsibleName,
                officerName: body.officerName,
                officerCenterNumber: body.officerCenterNumber,
                officerNetworkNumber: body.officerNetworkNumber,
                north: body.north,
                south: body.south,
                west: body.west,
                east: body.east,
                northExitsCount: body.northExitsCount,
                southExitsCount: body.southExitsCount,
                westExitCount: body.westExitCount,
                eastExitCount: body.eastExitCount,
                extinguisherCount: body.extinguisherCount,
                powderExtinguisherCount: body.powderExtinguisherCount,
                dioxideExtinguisherCount: body.dioxideExtinguisherCount,
                extinCheckComp: body.extinCheckComp,
                extinCheckCompNumber: body.extinCheckCompNumber,
                additions: body.additions,
            },
        });


        console.log('Created SurveyOfficerResponsibility:', survey);

        return NextResponse.json(survey, { status: 201 });
    } catch (error) {

        console.error("Error creating SurveyOfficerResponsibility:", error);


        return NextResponse.json(
            { error: `Failed to create the SurveyOfficerResponsibility: ${error.message}` },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
