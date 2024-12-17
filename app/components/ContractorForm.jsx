"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import InputField from "./Inputs";

export default function ContractorForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    commercialNumber: "",
    contractorName: "",
    nationalId: "",
    mobile: "",
    companyAddress: "",
    electricianName: "",
    electricianId: "",
    electricianMobile: "",
  });

  const formFields = [
    { label: "الاسم التجاري للمقاول", key: "businessName" },
    { label: "رقم السجل التجاري", key: "commercialNumber" },
    { label: "اسم مسؤول المقاول", key: "contractorName" },
    { label: "رقم الهوية الوطنية", key: "nationalId" },
    { label: "رقم الجوال", key: "mobile" },
    { label: "مقر الشركة", key: "companyAddress" },
    { label: "اسم الكهربائي", key: "electricianName" },
    { label: "رقم الهوية", key: "electricianId" },
    { label: "رقم الجوال", key: "electricianMobile" },
  ];

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming first sheet
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);

      if (parsedData.length > 0) {
        const excelRow = parsedData[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...excelRow,
        }));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contractor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "An error occurred");
      }

      alert("Created successfully!");
      console.log("API Response:", result);

      setFormData({
        businessName: "",
        commercialNumber: "",
        contractorName: "",
        nationalId: "",
        mobile: "",
        companyAddress: "",
        electricianName: "",
        electricianId: "",
        electricianMobile: "",
      });
    } catch (error) {
      alert("Failed to add Contractor. " + error.message);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white my-10 font-normal mb-4">
          تسجيل بيانات المقاولين
        </h2>
        {formFields.map(({ label, key }) => (
          <InputField
            key={key}
            label={label}
            id={key}
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ))}
        <div className="my-4">
          <label className="text-white block mb-2">Upload from Excel </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="text-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded text-white mt-4  hover:bg-gray-800"
        >
          أرسل
        </button>
      </form>
    </div>
  );
}
