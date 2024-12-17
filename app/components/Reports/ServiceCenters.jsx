"use client"; // Keep this at the top for client-side execution

import { useEffect, useState } from "react";
import ExportServiceCentersToPDF from "../ServiceCentersPdf";

import ExportDataToExcel from "../ToExcel";

export default function ServiceCenters() {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        const response = await fetch("/api/get/serviceCenter");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCenters(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchServiceCenters();
  }, []);

  return (
    <div className="bg-white bg-opacity-20 p-6 text-white rounded-lg m-4">
      <h2 className="text-black text-xl mb-4">بيانات مراكز الخدمة</h2>
      <section>
        <ExportServiceCentersToPDF tableData={centers} />
        <ExportDataToExcel dataType="serviceCenter" />
      </section>
    </div>
  );
}
