"use client";
import { useEffect, useState } from "react";
import ExportConsultantsToPDF from "../ConsultantsPdf";
import ExportDataToExcel from "../ToExcel";

export default function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await fetch("/api/get/consultant");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setConsultants(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchConsultants();
  }, []);

  return (
    <div className="bg-white bg-opacity-20 p-6 text-white rounded-lg m-4">
      <h2 className="text-black text-xl mb-4">بيانات الاستشاريين</h2>

      {error && <div className="text-red-500">{error}</div>}

      <section>
        <ExportConsultantsToPDF tableData={consultants} />

        <ExportDataToExcel dataType="consultant" />
      </section>
    </div>
  );
}
