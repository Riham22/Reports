"use client";
import { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import html2pdf from "html2pdf.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null); // Reference to the chart component

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard"); // API for aggregated data
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: ["الشركات", "الضباط", "مراكز الخدمة", "المستشارين", "المقاولين"], // X-axis: categories
    datasets: [
      {
        label: "الأعداد",
        data: [
          data.serviceProvidersCount, // Number of companies
          data.fieldOfficersCount, // Number of officers
          data.serviceCentersCount, // Number of service centers
          data.consultantsCount, // Number of consultants
          data.contractorsCount, // Number of contractors
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 16,
            family: "Arial, sans-serif",
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 16,
            family: "Arial, sans-serif",
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Function to export chart to PNG
  const exportToPNG = () => {
    const chart = chartRef.current;
    const image = chart.toBase64Image(); // Get chart as a base64 image
    const link = document.createElement("a");
    link.href = image;
    link.download = "chart.png"; // Set file name
    link.click();
  };

  // Function to export chart to PDF
  const exportToPDF = () => {
    const chart = chartRef.current;
    const canvas = chart.canvas;

    // Create a temporary HTML element to generate the PDF from
    const pdfElement = document.createElement("div");
    pdfElement.appendChild(canvas);

    // Use html2pdf.js to generate PDF
    html2pdf().from(pdfElement).save("chart.pdf");
  };

  return (
    <div className="bg-black bg-opacity-70 p-10 rounded-lg">
      <h2 className="text-white text-xl mb-4">Bar Chart</h2>
      <div>
        <button
          onClick={exportToPNG}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg mr-4"
        >
          Export as PNG
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg"
        >
          Export as PDF
        </button>
      </div>

      <div
        className="chart-container mt-4"
        style={{ height: "60vh", width: "60%" }}
      >
        <Bar ref={chartRef} data={chartData} options={options} id="dataChart" />
      </div>
    </div>
  );
};

export default DataChart;
