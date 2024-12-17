"use client";

import html2pdf from "html2pdf.js";

const ExportSurveyToPDF = ({ tableData }) => {
  const handleExportPDF = () => {
    const element = document.getElementById("survey-form-table");
    const options = {
      margin: [5, 5],
      filename: "SurveyData.pdf",
      html2canvas: {
        scale: 3,
        logging: false,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
        fontSize: 1,
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <table
        id="survey-form-table"
        border="1"
        className="table-auto w-full text-white text-xs bg-black bg-opacity-50 text-center align-middle mx-auto"
      >
        <thead>
          <tr>
            <th className="border px-1 py-2 align-middle">اسم الشركة</th>
            <th className="border px-1 py-2 align-middle">رقم مركز الخدمة</th>
            <th className="border px-1 py-2 align-middle">جنسية الحجاج</th>
            <th className="border px-1 py-2 align-middle">عدد الحجاج</th>
            <th className="border px-1 py-2 align-middle">المشعر</th>
            <th className="border px-1 py-2 align-middle">
              اسم رئيس مركز الخدمة
            </th>
            <th className="border px-1 py-2 align-middle">اسم مسؤول المشاعر</th>
            <th className="border px-1 py-2 align-middle">
              ضابط المسح الميداني
            </th>
            <th className="border px-1 py-2 align-middle">رقم المركز</th>
            <th className="border px-1 py-2 align-middle">رقم الشبكة</th>
            <th className="border px-1 py-2 align-middle">الحد الشمالي</th>
            <th className="border px-1 py-2 align-middle">الحد الجنوبي</th>
            <th className="border px-1 py-2 align-middle">الحد الشرقي</th>
            <th className="border px-1 py-2 align-middle">الحد الغربي</th>
            <th className="border px-1 py-2 align-middle">
              عدد مخارج الطوارئ شمالا
            </th>
            <th className="border px-1 py-2 align-middle">
              عدد مخارج الطوارئ جنوباً
            </th>
            <th className="border px-1 py-2 align-middle">
              عدد مخارج الطوارئ شرقا
            </th>
            <th className="border px-1 py-2 align-middle">
              عدد مخارج الطوارئ غرباً
            </th>
            <th className="border px-1 py-2 align-middle">
              اجمالي عدد الطفايات
            </th>
            <th className="border px-1 py-2 align-middle">
              اجمالي عدد الطفايات البودرة
            </th>
            <th className="border px-1 py-2 align-middle">
              اجمالي عدد طفايات ثاني أكسيد الكربون
            </th>
            <th className="border px-1 py-2 align-middle">
              شركة توريد فحص الطفايات
            </th>
            <th className="border px-1 py-2 align-middle">رقم ترخيص الشركة</th>
            <th className="border px-1 py-2 align-middle">إضافات في الموقع</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((survey, index) => (
            <tr key={index}>
              <td className="border px-1 py-2 align-middle ">
                {survey.companyName}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.serviceCenterNumber}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.nationality}
              </td>
              <td className="border px-1 py-2 align-middle">{survey.count}</td>
              <td className="border px-1 py-2 align-middle">
                {survey.location}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.serviceHeadName}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.generalResponsibleName}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.officerName}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.officerCenterNumber}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.officerNetworkNumber}
              </td>
              <td className="border px-1 py-2 align-middle">{survey.north}</td>
              <td className="border px-1 py-2 align-middle">{survey.south}</td>
              <td className="border px-1 py-2 align-middle">{survey.east}</td>
              <td className="border px-1 py-2 align-middle">{survey.west}</td>
              <td className="border px-1 py-2 align-middle">
                {survey.northExitsCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.southExitsCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.eastExitCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.westExitCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.extinguisherCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.powderExtinguisherCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.dioxideExtinguisherCount}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.extinCheckComp}
              </td>
              <td className="border px-1 py-2 align-middle">
                {survey.extinCheckCompNumber}
              </td>
              <td className="border px-4 py-2 align-middle">
                {survey.additions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleExportPDF}
        className="text-white py-2 px-4 mt-4 rounded"
      >
        Export to Pdf
      </button>
    </div>
  );
};

export default ExportSurveyToPDF;
