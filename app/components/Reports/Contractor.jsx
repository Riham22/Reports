"use client";
import { useEffect, useState } from "react";
import ExportContractorsToPDF from "../ContractorsPdf";
import ExportDataToExcel from "../ToExcel";

export default function Contractors() {
  const [contractors, setContractors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch("/api/get/contractor");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setContractors(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContractors();
  }, []);

  return (
    <div className="bg-white bg-opacity-20 p-6 text-white rounded-lg m-4">
      <h2 className="text-black text-xl mb-4">بيانات المقاولين</h2>

      {error && <div className="text-red-500">{error}</div>}

      <section>
        <ExportContractorsToPDF tableData={contractors} />
        <ExportDataToExcel dataType="contractor" />
      </section>
    </div>
  );
}
