import { jsPDF } from "jspdf";

export const exportPageToPDF = (contentRef) => {
    const element = contentRef.current;
    const doc = new jsPDF();
    doc.html(element, {
        callback: function (doc) {
            doc.save("table_data.pdf");
        },
    });
};
