// import html2pdf from "html2pdf.js";
"use client";
const ExportContractorsToPDF = ({ tableData }) => {
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    import("html2pdf.js").then((module) => setHtml2pdf(module.default));
  }, []);

  const handleExportPDF = () => {
    if (!html2pdf) return;
    const element = document.getElementById("contractor-table");
    const options = {
      margin: [5, 5],
      filename: "ContractorsData.pdf",
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <table
        id="contractor-table"
        border="1"
        className="table-auto w-full text-white bg-black bg-opacity-50"
      >
        <thead>
          <tr>
            <th className="border px-1 py-4 align-middle">
              الاسم التجاري للمقاول
            </th>
            <th className="border px-1 py-4 align-middle">رقم السجل التجاري</th>
            <th className="border px-1 py-4 align-middle">اسم المقاول</th>
            <th className="border px-1 py-4 align-middle">
              رقم الهوية الوطنية
            </th>
            <th className="border px-1 py-4 align-middle">رقم الجوال</th>
            <th className="border px-1 py-4 align-middle">مقر الشركة</th>
            <th className="border px-1 py-4 align-middle">اسم الكهربائي</th>
            <th className="border px-1 py-4 align-middle">رقم الهوية</th>
            <th className="border px-1 py-4 align-middle">رقم الجوال</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((contractor, index) => (
            <tr key={index}>
              <td className="border px-4 py-4 align-middle">
                {contractor.businessName}
              </td>
              <td className="border px-4 py-4 align-middle">
                {contractor.commercialNumber}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.contractorName}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.nationalId}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.mobile}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.companyAddress}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.electricianName}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.electricianId}
              </td>
              <td className="border px-1 py-4 align-middle">
                {contractor.electricianMobile}
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

export default ExportContractorsToPDF;
