import html2pdf from "html2pdf.js";

const ExportServiceCentersToPDF = ({ tableData }) => {
  const handleExportPDF = () => {
    const element = document.getElementById("service-center-table");
    const options = {
      margin: [5, 5],
      filename: "ServiceCentersData.pdf",
      html2canvas: { scale: 3 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
        tableWidth: "auto",
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <table
        id="service-center-table"
        border="1"
        className="table-auto w-full text-white bg-black bg-opacity-50 text-xs"
      >
        <thead>
          <tr>
            <th className="border px-1 py-2">اسم الشركة</th>
            <th className="border px-1 py-2">رقم المركز</th>
            <th className="border px-1 py-2">جنسيات الحجاج</th>
            <th className="border px-1 py-2">عدد الحجاج</th>
            <th className="border px-1 py-2">اسم المدير</th>
            <th className="border px-1 py-2">الرقم القومي للمدير</th>
            <th className="border px-1 py-2">رقم الجوال للمدير</th>
            <th className="border px-1 py-2">رقم السجل التجاري</th>
            <th className="border px-1 py-2">اسم النائب</th>
            <th className="border px-1 py-2">الرقم القومي للنائب</th>
            <th className="border px-1 py-2">رقم الجوال للنائب</th>
            <th className="border px-1 py-2">موقع النائب</th>
            <th className="border px-1 py-2">اسم مسئول مشعر عرفات</th>
            <th className="border px-1 py-2">الرقم القومي</th>
            <th className="border px-1 py-2">الجوال</th>
            <th className="border px-1 py-2">الموقع</th>
            <th className="border px-1 py-2">اسم مدير مشعر منى</th>
            <th className="border px-1 py-2">الرقم القومي</th>
            <th className="border px-1 py-2">الجوال</th>
            <th className="border px-1 py-2">الموقع</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td className="border px-1 py-2 align-middle">
                {item.companyName}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.serviceCenterNumber}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.nationality}
              </td>
              <td className="border px-1 py-2 align-middle">{item.count}</td>
              <td className="border px-1 py-2 align-middle">{item.headName}</td>
              <td className="border px-1 py-2 align-middle">{item.headId}</td>
              <td className="border px-1 py-2 align-middle">
                {item.headMobile}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.headTradeNumber}
              </td>
              <td className="border px-1 py-2 align-middle">{item.viceName}</td>
              <td className="border px-1 py-2 align-middle">
                {item.viceNationalId}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.viceMobile}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.viceLocation}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.arHeadName}
              </td>
              <td className="border px-1 py-2 align-middle">{item.arHeadId}</td>
              <td className="border px-1 py-2 align-middle">
                {item.arHeadMobile}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.arHeadLocation}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.minaHeadName}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.minaHeadId}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.minaHeadMobile}
              </td>
              <td className="border px-1 py-2 align-middle">
                {item.minaHeadLocation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleExportPDF}
        className=" text-white py-2 px-4 mt-4 rounded"
      >
        Export to Pdf
      </button>
    </div>
  );
};

export default ExportServiceCentersToPDF;
