"use client";

import { useEffect, useState } from "react";
import InputField from "./Inputs";

export default function Survey() {
  const [survey, setSurvey] = useState({
    companyName: "",
    serviceCenterNumber: "",
    nationality: "",
    count: "",
    location: "",
    serviceHeadName: "",
    generalResponsibleName: "",
    officerName: "",
    officerCenterNumber: "",
    officerNetworkNumber: "",
    north: "",
    south: "",
    west: "",
    east: "",
    northExitsCount: "",
    southExitsCount: "",
    westExitCount: "",
    eastExitCount: "",
    extinguisherCount: "",
    powderExtinguisherCount: "",
    dioxideExtinguisherCount: "",
    extinCheckComp: "",
    extinCheckCompNumber: "",
    additions: "",
  });

  const [options, setOptions] = useState({
    companyNames: [],
    serviceHeadNames: [],
    count: [],
    nationalities: [],
    fieldOfficers: [],
    fieldOfficersCenterNumber: [],
    fieldOfficersNetworkNumber: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const providersResponse = await fetch("/api/get/serviceProvider");
        const providersData = await providersResponse.json();
        const companyNames = providersData.map(
          (provider) => provider.companyName
        );

        // Fetch service centers
        const centersResponse = await fetch("/api/get/serviceCenter");
        const centersData = await centersResponse.json();

        const nationalities = [
          ...new Set(centersData.map((center) => center.nationality)),
        ];
        const count = [...new Set(centersData.map((center) => center.count))];
        const serviceHeadNames = [
          ...new Set(centersData.map((center) => center.headName)),
        ];

        const officersResponse = await fetch("/api/get/fieldOfficer");
        const officersData = await officersResponse.json();
        const fieldOfficers = officersData.map((officer) => officer.name);
        const fieldOfficersNetworkNumber = officersData.map(
          (officer) => officer.networkNumber
        );
        const fieldOfficersCenterNumber = officersData.map(
          (officer) => officer.centerNumber
        );

        setOptions({
          companyNames,
          serviceHeadNames,
          count,
          nationalities,
          fieldOfficers,
          fieldOfficersCenterNumber,
          fieldOfficersNetworkNumber,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const formFields = [
    {
      id: "companyName",
      label: "اسم الشركة",
      type: "dropdown",
      options: options.companyNames,
    },
    {
      id: "serviceCenterNumber",
      label: "رقم مركز الخدمة",
      type: "dropdown",
      options: Array.from({ length: 50 }, (_, i) => (i + 1).toString()), // Generate numbers 1 to 50
    },

    {
      id: "nationality",
      label: "جنسية الحجاج",
      type: "dropdown",
      options: options.nationalities,
    },
    {
      id: "count",
      label: "عدد الحجاج",
      type: "dropdown",
      options: options.count,
    },
    {
      id: "location",
      label: "المشعر",
      type: "dropdown",
      options: ["عرفة", "مزدلفة", "منى"],
    },
    {
      id: "serviceHeadName",
      label: "اسم رئيس مركز الخدمة",
      type: "dropdown",
      options: options.serviceHeadNames,
    },
    { id: "generalResponsibleName", label: "اسم مسؤول المشاعر", type: "text" },
    {
      id: "officerName",
      label: "ضابط المسح الميداني",
      type: "dropdown",
      options: options.fieldOfficers,
    },
    {
      id: "officerCenterNumber",
      label: "رقم المركز",
      type: "dropdown",
      options: options.fieldOfficersCenterNumber,
    },
    {
      id: "officerNetworkNumber",
      label: "رقم الشبكة",
      type: "dropdown",
      options: options.fieldOfficersNetworkNumber,
    },
    { id: "north", label: "الحد الشمالي", type: "text" },
    { id: "south", label: "الحد الجنوبي", type: "text" },
    { id: "east", label: "الحد الشرقي", type: "text" },
    { id: "west", label: "الحد الغربي", type: "text" },
    { id: "northExitsCount", label: "عدد مخارج الطوارئ شمالا", type: "text" },
    { id: "southExitsCount", label: "عدد مخارج الطوارئ جنوباً", type: "text" },
    { id: "eastExitCount", label: "عدد مخارج الطوارئ شرقا", type: "text" },
    { id: "westExitCount", label: "عدد مخارج الطوارئ غرباً", type: "text" },
    { id: "extinguisherCount", label: "اجمالي عدد الطفايات", type: "text" },
    {
      id: "powderExtinguisherCount",
      label: "اجمالي عدد الطفايات البودرة",
      type: "text",
    },
    {
      id: "dioxideExtinguisherCount",
      label: "اجمالي عدد طفايات ثاني أكسيد الكربون",
      type: "text",
    },
    { id: "extinCheckComp", label: "شركة توريد فحص الطفايات", type: "text" },
    { id: "extinCheckCompNumber", label: "رقم ترخيص الشركة", type: "text" },
    { id: "additions", label: "إضافات في الموقع", type: "textarea" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSurvey((prevSurvey) => ({ ...prevSurvey, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(survey),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }
      alert("Survey submitted successfully!");
    } catch (error) {
      alert(`Failed to submit survey: ${error.message}`);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <h2>تطبيق إجراءات السلامة</h2>
        {formFields.map(({ id, label, type, options }) => (
          <InputField
            key={id}
            id={id}
            label={label}
            type={type}
            value={survey[id]}
            onChange={handleInputChange}
            options={options}
          />
        ))}
        <button type="submit" className="px-4 py-2 rounded text-white  mt-4">
          أرسل
        </button>
      </form>
    </div>
  );
}
