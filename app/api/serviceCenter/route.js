import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
        'companyName',
        'serviceCenterNumber',
        'nationality',
        'count',
        'headName',
        'headId',
        'headMobile',
        'headTradeNumber',
        'viceName',
        'viceNationalId',
        'viceMobile',
        'viceLocation',
        'arHeadName',
        'arHeadId',
        'arHeadMobile',
        'arHeadLocation',
        'minaHeadName',
        'minaHeadId',
        'minaHeadMobile',
        'minaHeadLocation',
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
        const newServiceCenter = await prisma.ServiceCenter.create({
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

        return NextResponse.json(newServiceCenter, { status: 201 }); // Created
    } catch (error) {
        console.error('Error creating Service Center:', error);
        return NextResponse.json(
            { error: 'Failed to create Service Center. ' + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
