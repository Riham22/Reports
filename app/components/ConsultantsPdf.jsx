import html2pdf from "html2pdf.js";

const ExportConsultantsToPDF = ({ tableData }) => {
  const handleExportPDF = () => {
    const element = document.getElementById("consultants-table");
    const options = {
      margin: 5,
      filename: "ConsultantsData.pdf",
      html2canvas: {
        scale: 3,
        logging: false,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        autoPaging: true,
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <table
        id="consultants-table"
        border="1"
        className="table-auto w-full text-white bg-black bg-opacity-50"
      >
        <thead>
          <tr>
            <th className="border  px-4 py-2 align-middle">
              اسم الشركة الاستشارية
            </th>
            <th className="border px-4 py-2 align-middle">رقم الترخيص</th>
            <th className="border px-4 py-2 align-middle">اسم المسئول</th>
            <th className="border px-4 py-2 align-middle">
              رقم الهوية الوطنية
            </th>
            <th className="border px-4 py-2 align-middle">رقم الجوال</th>
            <th className="border px-4 py-2 align-middle">مقر الشركة</th>
            <th className="border px-4 py-2 align-middle">
              اسم مسئول مشعر عرفات
            </th>
            <th className="border px-4 py-2 align-middle">رقم الهوية</th>
            <th className="border px-4 py-2 align-middle">رقم الجوال</th>
            <th className="border px-4 py-2 align-middle">مقر المركز</th>
            <th className="border px-4 py-2 align-middle">
              اسم مسئول مشعر منى
            </th>
            <th className="border px-4 py-2 align-middle">رقم الهوية</th>
            <th className="border px-4 py-2 align-middle">رقم الجوال</th>
            <th className="border px-4 py-2 align-middle">مقر المركز</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((consultant, index) => (
            <tr key={index}>
              <td className="border px-4 py-4 align-middle">
                {consultant.companyName}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.licenseNumber}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.responsibleName}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.responsibleNationalId}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.responsibleMobile}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.responsibleCenterAddress}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.mResponsibleName}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.mResponsibleNationalId}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.mResponsibleMobile}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.mResponsibleCenterAddress}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.aResponsibleName}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.aResponsibleNationalId}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.aResponsibleMobile}
              </td>
              <td className="border px-4 py-4 align-middle">
                {consultant.aResponsibleCenterAddress}
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

export default ExportConsultantsToPDF;
