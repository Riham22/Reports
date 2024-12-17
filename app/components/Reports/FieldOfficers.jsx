"use client";
import { useEffect, useState } from "react";
import ExportOfficersToPDF from "../FieldOfficersPdf";
import ExportDataToExcel from "../ToExcel";

export default function FieldOfficers() {
  const [fieldOfficers, setFieldOfficers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFieldOfficers = async () => {
      try {
        const response = await fetch("/api/get/fieldOfficer");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFieldOfficers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFieldOfficers();
  }, []);

  return (
    <div className="bg-white bg-opacity-20 p-6 text-white rounded-lg m-4">
      <h2 className="text-black text-xl mb-4">بيانات ضباط المسح الميداني</h2>

      {error && <div className="text-red-500">{error}</div>}

      <section>
        <ExportOfficersToPDF tableData={fieldOfficers} />
        <ExportDataToExcel dataType="fieldOfficer" />
      </section>
    </div>
  );
}
