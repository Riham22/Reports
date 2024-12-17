import { useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const ExportToPDF = ({ tableData = [] }) => {
  const handleExportPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const documentDefinition = {
      content: [
        {
          text: "تقرير تصدير البيانات",
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 20],
        },
        {
          text: "البيانات:",
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              ["اسم الشركة", "رقم المركز", "الجنسية"],
              ...tableData.map((item) => [
                item.companyName,
                item.serviceCenterNumber,
                item.nationality,
              ]),
            ],
          },
          layout: "lightHorizontalLines",
        },
      ],
      rtl: true,
      defaultStyle: {},
    };

    pdfMake.createPdf(documentDefinition).download("serviceCenters.pdf");
  };

  return (
    <div>
      <button
        className=" hover:bg-gray-700 text-white py-2 px-10 rounded-md my-4"
        onClick={handleExportPDF}
      >
        Export to Pdf
      </button>
    </div>
  );
};

export default ExportToPDF;
