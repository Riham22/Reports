import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        // جلب عدد الشركات (ServiceProviders)
        const serviceProvidersCount = await prisma.ServiceProvider.count();

        // جلب عدد الضباط (FieldOfficers)
        const fieldOfficersCount = await prisma.FieldOfficer.count();

        // جلب عدد مراكز الخدمة (ServiceCenters)
        const serviceCentersCount = await prisma.ServiceCenter.count();

        // جلب عدد المستشارين (Consultants)
        const consultantsCount = await prisma.Consultant.count();

        // جلب عدد المقاولين (Contractors)
        const contractorsCount = await prisma.Contractor.count();

        // إرسال البيانات
        return NextResponse.json({
            serviceProvidersCount,
            fieldOfficersCount,
            serviceCentersCount,
            consultantsCount,
            contractorsCount,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
