"use client"; // Ensure it's a client component
import dynamic from "next/dynamic";

const ExportDashboard = dynamic(() => import("./ExportDashboard"), { ssr: false });

export default function ClientComponent() {
    return <ExportDashboard />;
}
