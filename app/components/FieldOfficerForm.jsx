"use client";

import { useState } from "react";
import InputField from "./Inputs";
import * as XLSX from "xlsx";

export default function FieldOfficerForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    rank: "",
    phoneNumber: "",
    regionNumber: "",
    centerNumber: "",
    networkNumber: "",
  });

  const formFields = [
    { id: "name", label: "الاسم", type: "text" },
    { id: "rank", label: "الرتبة", type: "text" },
    { id: "phoneNumber", label: "رقم الجوال", type: "tel" },
    { id: "regionNumber", label: "رقم المنطقة", type: "text" },
    { id: "centerNumber", label: "رقم مركز الدفاع المدني", type: "text" },
    { id: "networkNumber", label: "رقم الشبكة", type: "text" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Read the first sheet
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Assuming the first row of Excel data maps to the form fields
        if (jsonData.length > 0) {
          const firstRow = jsonData[0];
          setFormValues({
            name: firstRow["name"] || "",
            rank: firstRow["rank"] || "",
            phoneNumber: firstRow["phoneNumber"] || "",
            regionNumber: firstRow["regionNumber"] || "",
            centerNumber: firstRow["centerNumber"] || "",
            networkNumber: firstRow["networkNumber"] || "",
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/fieldOfficer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "An error occurred");
      }

      console.log("API Response:", result);

      alert("Created successfully");

      setFormValues({
        name: "",
        rank: "",
        phoneNumber: "",
        regionNumber: "",
        centerNumber: "",
        networkNumber: "",
      });
    } catch (error) {
      alert(`Failed to create Field Officer: ${error.message}`);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="font-normal text-white my-10">
          تسجيل بيانات ضباط المسح الميداني
        </h2>

        {formFields.map(({ id, label, type }) => (
          <InputField
            key={id}
            label={label}
            type={type}
            id={id}
            value={formValues[id]}
            onChange={handleInputChange}
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
            className="block w-full text-white p-2 rounded-lg"
          />
        </div>

        <button type="submit" className="mt-4  text-white py-2 px-4 rounded-lg">
          أرسل
        </button>
      </form>
    </div>
  );
}
