"use client";

// import html2pdf from "html2pdf.js";
import React from "react";
import { useEffect, useState } from "react";
const ExportServiceProvidersToPDF = ({ providersData }) => {
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    import("html2pdf.js").then((module) => setHtml2pdf(module.default));
  }, []);
  const handleExportPDF = () => {
    if (!html2pdf) return;
    const handleExportPDF = () => {
      const element = document.getElementById("service-provider-table");
      const options = {
        margin: [5, 5],
        filename: "ServiceProvidersData.pdf",
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(options).from(element).save();
    };

    return (
      <div>
        <table
          id="service-provider-table"
          border="1"
          className="table-auto w-full text-white bg-black bg-opacity-50 text-sm"
        >
          <thead>
            <tr>
              <th className="border px-1 py-4 align-middle">اسم الشركة</th>
              <th className="border px-1 py-4 align-middle">
                رقم ترخيص الشركة
              </th>
              <th className="border px-1 py-4 align-middle">
                اسم مسئول الشركة
              </th>
              <th className="border px-1 py-4 align-middle">رقم الجوال</th>
              <th className="border px-1 py-4 align-middle">
                اسم مسئول مشعر عرفات
              </th>
              <th className="border px-1 py-4 align-middle">رقم الجوال</th>
              <th className="border px-1 py-4 align-middle">
                اسم مسئول مشعر منى
              </th>
              <th className="border px-1 py-4 align-middle">رقم الجوال</th>
            </tr>
          </thead>
          <tbody>
            {providersData.map((provider, index) => (
              <tr key={index}>
                <td className="border px-1 py-4 align-middle">
                  {provider.companyName}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.licenseNumber}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.responsibleName}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.responsibleMobile}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.aResponsibleName}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.aResponsibleMobile}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.mResponsibleName}
                </td>
                <td className="border px-1 py-4 align-middle">
                  {provider.mResponsibleMobile}
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
};

export default ExportServiceProvidersToPDF;
