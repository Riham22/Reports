import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();


    if (!body.businessName || !body.commercialNumber || !body.contractorName || !body.mobile || !body.companyAddress || !body.electricianName || !body.electricianId || !body.electricianMobile) {
        return NextResponse.json(
            { error: "Business name, commercial number, responsible name, mobile, and company address are required" },
            { status: 400 }
        );
    }

    try {
        const contractor = await prisma.Contractor.create({
            data: {
                businessName: body.businessName,
                commercialNumber: body.commercialNumber,
                contractorName: body.contractorName,
                nationalId: body.nationalId || "",
                mobile: body.mobile,
                companyAddress: body.companyAddress,
                electricianName: body.electricianName || "",
                electricianId: body.electricianId || "",
                electricianMobile: body.electricianMobile || "",
            },
        });

        return NextResponse.json(contractor, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create the contractor" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
