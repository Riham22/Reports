import { parse } from "json2csv";

export const exportDataToCSV = (formattedData) => {
    try {
        const csv = parse(formattedData); // Converts the formatted JSON data to CSV
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "dashboard.csv"; // CSV filename
        link.click();
    } catch (error) {
        console.error("Error exporting data to CSV:", error);
    }
};
