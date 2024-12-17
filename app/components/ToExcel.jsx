"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function ExportDataToExcel({ dataType }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (dataType === "contractor") {
          url = "/api/get/contractor"; // API URL for contractors
        } else if (dataType === "fieldOfficer") {
          url = "/api/get/fieldOfficer"; // API URL for field officers
        } else if (dataType === "consultant") {
          url = "/api/get/consultant"; // API URL for consultants
        } else if (dataType === "survey") {
          url = "/api/get/survey"; // API URL for survey data
        } else if (dataType === "serviceCenter") {
          url = "/api/get/serviceCenter"; // API URL for service center data
        } else if (dataType === "serviceProvider") {
          url = "/api/get/serviceProvider"; // API URL for service providers
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dataType]);

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${dataType} Data`);

    XLSX.writeFile(workbook, `${dataType}_data.xlsx`);
  };

  return (
    <div>
      <button
        onClick={handleExportExcel}
        className="hover:bg-gray-700 inline-block text-white py-2 rounded-md my-4"
      >
        Export Data to Excel
      </button>
    </div>
  );
}
