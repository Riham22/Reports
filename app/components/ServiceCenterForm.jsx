"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Library for Excel parsing
import InputField from "./Inputs";

export default function ServiceCenterForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    serviceCenterNumber: "",
    nationality: "",
    count: "",
    headName: "",
    headId: "",
    headMobile: "",
    headTradeNumber: "",
    viceName: "",
    viceNationalId: "",
    viceMobile: "",
    viceLocation: "",
    arHeadName: "",
    arHeadId: "",
    arHeadMobile: "",
    arHeadLocation: "",
    minaHeadName: "",
    minaHeadId: "",
    minaHeadMobile: "",
    minaHeadLocation: "",
  });

  const [options, setOptions] = useState({
    companyNames: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const providersResponse = await fetch("/api/get/serviceProvider");
        const providersData = await providersResponse.json();
        const companyNames = providersData.map(
          (provider) => provider.companyName
        );

        setOptions((prevOptions) => ({
          ...prevOptions,
          companyNames,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
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
        const excelData = parsedData[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...excelData,
        }));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/serviceCenter", {
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

      alert("Created successfully");
      setFormData({
        companyName: "",
        serviceCenterNumber: "",
        nationality: "",
        count: "",
        headName: "",
        headId: "",
        headMobile: "",
        headTradeNumber: "",
        viceName: "",
        viceNationalId: "",
        viceMobile: "",
        viceLocation: "",
        arHeadName: "",
        arHeadId: "",
        arHeadMobile: "",
        arHeadLocation: "",
        minaHeadName: "",
        minaHeadId: "",
        minaHeadMobile: "",
        minaHeadLocation: "",
      });
    } catch (error) {
      alert(`Failed to create Service Center: ${error}`);
    }
  };

  const formFields = [
    {
      id: "companyName",
      label: "اسم الشركة",
      type: "dropdown",
      options: options.companyNames,
    },
    { id: "serviceCenterNumber", label: "رقم مركز الخدمة", type: "text" },
    { id: "nationality", label: "جنسية الحجاج", type: "text" },
    { id: "count", label: "عدد الحجاج", type: "text" },
    { id: "headName", label: "اسم رئيس المركز", type: "text" },
    { id: "headId", label: "رقم الهوية الوطنية لرئيس المركز", type: "text" },
    { id: "headMobile", label: "رقم الجوال لرئيس المركز", type: "tel" },
    { id: "headTradeNumber", label: "رقم السجل التجاري", type: "text" },
    { id: "viceName", label: "اسم نائب المركز", type: "text" },
    { id: "viceNationalId", label: "رقم الهوية الوطنية للنائب", type: "text" },
    { id: "viceMobile", label: "رقم الجوال للنائب", type: "tel" },
    { id: "viceLocation", label: "موقع المركز بمكة", type: "text" },
    { id: "arHeadName", label: "اسم مسئول مشعر عرفات", type: "text" },
    { id: "arHeadId", label: "رقم الهوية لمسئول مشعر عرفات", type: "text" },
    { id: "arHeadMobile", label: "رقم الجوال لمسئول مشعر عرفات", type: "tel" },
    { id: "arHeadLocation", label: "مقر المركز بعرفات", type: "text" },
    { id: "minaHeadName", label: "اسم مسئول مشعر منى", type: "text" },
    { id: "minaHeadId", label: "رقم الهوية لمسئول مشعر منى", type: "text" },
    { id: "minaHeadMobile", label: "رقم الجوال لمسئول مشعر منى", type: "tel" },
    { id: "minaHeadLocation", label: "مقر المركز بمنى", type: "text" },
  ];

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white my-10 fornt-normal mb-4">
          تسجيل بيانات مراكز الخدمة
        </h2>
        {formFields.map(({ id, label, type, options }) => (
          <InputField
            key={id}
            label={label}
            id={id}
            type={type}
            value={formData[id]}
            onChange={(e) => handleChange(id, e.target.value)}
            options={options}
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
          className="px-4 py-2 rounded text-white mt-4 hover:bg-gray-800"
        >
          أرسل
        </button>
      </form>
    </div>
  );
}
