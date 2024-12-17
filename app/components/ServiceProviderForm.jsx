"use client";
import { useState } from "react";
import * as XLSX from "xlsx"; // For Excel parsing
import InputField from "./Inputs";

export default function ServiceProviderForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    licenseNumber: "",
    responsibleName: "",
    responsibleMobile: "",
    aResponsibleName: "",
    aResponsibleMobile: "",
    mResponsibleName: "",
    mResponsibleMobile: "",
  });

  const formFields = [
    { label: "اسم الشركة", key: "companyName" },
    { label: "رقم ترخيص الشركة", key: "licenseNumber" },
    { label: "اسم مسؤول الشركة", key: "responsibleName" },
    { label: "رقم الجوال", key: "responsibleMobile" },
    { label: "اسم مسؤول مشعر عرفات", key: "aResponsibleName" },
    { label: "رقم الجوال", key: "aResponsibleMobile" },
    { label: "اسم مسؤول مشعر منى", key: "mResponsibleName" },
    { label: "رقم الجوال", key: "mResponsibleMobile" },
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
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);

      if (parsedData.length > 0) {
        const excelRow = parsedData[0];
        setFormData((prevData) => ({
          ...prevData,
          ...excelRow,
        }));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/serviceProvider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "An error occurred");

      alert("Created successfully");
      setFormData({
        companyName: "",
        licenseNumber: "",
        responsibleName: "",
        responsibleMobile: "",
        aResponsibleName: "",
        aResponsibleMobile: "",
        mResponsibleName: "",
        mResponsibleMobile: "",
      });
    } catch (error) {
      alert(`Failed to create Service Provider: ${error.message}`);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="my-10 font-normal text-white">
          تسجيل بيانات شركات تقديم الخدمة
        </h2>

        {formFields.map(({ label, key }) => (
          <InputField
            key={key}
            label={label}
            id={key}
            value={formData[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ))}

        <div className="mb-6">
          <label className="text-white block mb-2">
            رفع ملف إكسل (Excel) لتعبئة البيانات:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="text-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded text-white  hover:bg-gray-800 mt-4"
        >
          أرسل
        </button>
      </form>
    </div>
  );
}
