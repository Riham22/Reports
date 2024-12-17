"use client";
import { useState } from "react";
import InputField from "./Inputs";
import * as XLSX from "xlsx"; // Import the xlsx library

export default function ConsultantForm() {
  const [consultants, setConsultants] = useState({
    companyName: "",
    licenseNumber: "",
    responsibleName: "",
    responsibleNationalId: "",
    responsibleMobile: "",
    responsibleCenterAddress: "",
    mResponsibleName: "",
    mResponsibleNationalId: "",
    mResponsibleMobile: "",
    mResponsibleCenterAddress: "",
    aResponsibleName: "",
    aResponsibleNationalId: "",
    aResponsibleMobile: "",
    aResponsibleCenterAddress: "",
  });

  const consultantFields = [
    { label: "اسم الشركة الاستشارية", key: "companyName" },
    { label: "رقم الترخيص", key: "licenseNumber" },
    { label: "اسم مسئول الاستشاري", key: "responsibleName" },
    { label: "رقم الهوية الوطنية", key: "responsibleNationalId" },
    { label: "رقم الجوال", key: "responsibleMobile" },
    { label: "مقر الشركة", key: "responsibleCenterAddress" },
    { label: "اسم مسئول مشعر عرفات", key: "aResponsibleName" },
    { label: "رقم الهوية", key: "aResponsibleNationalId" },
    { label: "رقم الجوال", key: "aResponsibleMobile" },
    { label: "مقر المركز", key: "aResponsibleCenterAddress" },
    { label: "اسم مسئول مشعر منى", key: "mResponsibleName" },
    { label: "رقم الهوية", key: "mResponsibleNationalId" },
    { label: "رقم الجوال", key: "mResponsibleMobile" },
    { label: "مقر المركز", key: "mResponsibleCenterAddress" },
  ];

  const handleChange = (key, value) => {
    setConsultants((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length > 0) {
          const firstRow = jsonData[0];
          setConsultants({
            companyName: firstRow["companyName"] || "",
            licenseNumber: firstRow["licenseNumber"] || "",
            responsibleName: firstRow["responsibleName"] || "",
            responsibleNationalId: firstRow["responsibleNationalId"] || "",
            responsibleMobile: firstRow["responsibleMobile"] || "",
            responsibleCenterAddress:
              firstRow["responsibleCenterAddress"] || "",
            aResponsibleName: firstRow["aResponsibleName"] || "",
            aResponsibleNationalId: firstRow["aResponsibleNationalId"] || "",
            aResponsibleMobile: firstRow["aResponsibleMobile"] || "",
            aResponsibleCenterAddress:
              firstRow["aResponsibleCenterAddress"] || "",
            mResponsibleName: firstRow["mResponsibleName"] || "",
            mResponsibleNationalId: firstRow["mResponsibleNationalId"] || "",
            mResponsibleMobile: firstRow["mResponsibleMobile"] || "",
            mResponsibleCenterAddress:
              firstRow["mResponsibleCenterAddress"] || "",
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consultants),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "An error occurred");

      console.log("API Response:", result);
      alert("Created successfully");

      setConsultants({
        companyName: "",
        licenseNumber: "",
        responsibleName: "",
        responsibleNationalId: "",
        responsibleMobile: "",
        responsibleCenterAddress: "",
        aResponsibleName: "",
        aResponsibleNationalId: "",
        aResponsibleMobile: "",
        aResponsibleCenterAddress: "",
        mResponsibleName: "",
        mResponsibleNationalId: "",
        mResponsibleMobile: "",
        mResponsibleCenterAddress: "",
      });
    } catch (error) {
      alert(`Failed to create Consultant: ${error.message}`);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white my-10 font-normal mb-4">
          تسجيل بيانات الاستشاريين
        </h2>

        {consultantFields.map(({ label, key }) => (
          <InputField
            key={key}
            label={label}
            id={key}
            value={consultants[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ))}

        <div className="my-4">
          <label htmlFor="excelFile" className="text-white block mb-2">
            Upload from Excel{" "}
          </label>
          <input
            type="file"
            id="excelFile"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full text-white p-2  rounded-lg"
          />
        </div>

        <button type="submit" className="mt-4 text-white py-2 px-4 rounded-lg">
          أرسل
        </button>
      </form>
    </div>
  );
}
