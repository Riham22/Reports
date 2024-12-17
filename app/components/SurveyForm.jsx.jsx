"use client";
import { useEffect, useState } from "react";
import InputField from "./Inputs";
import CommitmentsTable from "./Upload";

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

  const [commitments, setCommitments] = useState([]); // State for commitments table
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
      options: Array.from({ length: 50 }, (_, i) => (i + 1).toString()),
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
    { id: "extinguisherCount", label: "اجمالي عدد الطفايات", type: "text" },
    { id: "additions", label: "إضافات في الموقع", type: "textarea" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSurvey((prevSurvey) => ({ ...prevSurvey, [id]: value }));
  };

  const handleCommitmentsChange = (updatedCommitments) => {
    setCommitments(updatedCommitments);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invalidCommitments = commitments.filter(
      (commitment) => commitment.isChecked && !commitment.file
    );

    if (invalidCommitments.length > 0) {
      alert("Please upload files for all checked commitments.");
      return; // Stop form submission
    }

    const combinedData = {
      ...survey,
      commitments,
    };

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) throw new Error("Submission failed");
      alert("Survey and Commitments submitted successfully!");
    } catch (error) {
      alert(`Failed to submit: ${error.message}`);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-lg w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mb-4">تطبيق إجراءات السلامة</h2>
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

        <h3 className="text-white my-4">التعهدات</h3>
        <CommitmentsTable onCommitmentsChange={handleCommitmentsChange} />

        <button
          type="submit"
          className="px-4 py-2 rounded  text-white hover:bg-gray-800 mt-4"
        >
          أرسل
        </button>
      </form>
    </div>
  );
}
