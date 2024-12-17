// import html2pdf from "html2pdf.js";
"use client";
import { useEffect, useState } from "react";

const ExportOfficersToPDF = ({ tableData }) => {
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    import("html2pdf.js").then((module) => setHtml2pdf(module.default));
  }, []);

  const handleExportPDF = () => {
    if (!html2pdf) return;
    const element = document.getElementById("field-officer-table");
    const options = {
      margin: 1,
      filename: "FieldOfficersData.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <table
        id="field-officer-table"
        border="1"
        className="table-auto w-full text-white bg-black bg-opacity-50"
      >
        <thead>
          <tr>
            <th className="border  px-1 py-4 align-middle">الاسم</th>
            <th className="border px-1 py-4 align-middle">الرتبة</th>
            <th className="border px-1 py-4 align-middle">رقم الجوال</th>
            <th className="border px-1 py-4 align-middle">رقم المنطقة</th>
            <th className="border px-1 py-4 align-middle">
              رقم مركز خدمة الدفاع المدني
            </th>
            <th className="border px-1 py-4 align-middle">رقم الشبكة</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((officer, index) => (
            <tr key={index}>
              <td className="border px-1 py-4 align-middle">{officer.name}</td>
              <td className="border px-1 py-4 align-middle">{officer.rank}</td>
              <td className="border px-1 py-4 align-middle">
                {officer.phoneNumber}
              </td>
              <td className="border px-1 py-4 align-middle">
                {officer.regionNumber}
              </td>
              <td className="border px-1 py-4 align-middle">
                {officer.centerNumber}
              </td>
              <td className="border px-1 py-4 align-middle">
                {officer.networkNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleExportPDF}
        className=" text-white py-2 px-4 mt-4 rounded"
      >
        Export to Pdf{" "}
      </button>
    </div>
  );
};

export default ExportOfficersToPDF;
