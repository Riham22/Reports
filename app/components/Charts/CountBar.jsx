"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Dynamically import the chart component to avoid SSR issues
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dynamically import the Bar chart from react-chartjs-2
const BarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false }
);

const DataChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Initialize html2pdf only on the client-side
  const exportToPNG = () => {
    if (typeof window !== "undefined" && chartRef.current) {
      const chart = chartRef.current;
      const image = chart.toBase64Image();
      const link = document.createElement("a");
      link.href = image;
      link.download = "chart.png";
      link.click();
    }
  };

  const exportToPDF = () => {
    if (typeof window !== "undefined" && chartRef.current) {
      const canvas = chartRef.current.canvas;
      const pdfElement = document.createElement("div");
      pdfElement.appendChild(canvas);

      // Only use html2pdf if it is loaded in the client
      import("html2pdf.js").then((html2pdf) => {
        html2pdf().from(pdfElement).save("chart.pdf");
      });
    }
  };

  const chartData = {
    labels: ["الشركات", "الضباط", "مراكز الخدمة", "المستشارين", "المقاولين"],
    datasets: [
      {
        label: "الأعداد",
        data: [
          data.serviceProvidersCount,
          data.fieldOfficersCount,
          data.serviceCentersCount,
          data.consultantsCount,
          data.contractorsCount,
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
          font: { size: 16, family: "Arial, sans-serif", weight: "bold" },
        },
        grid: { color: "rgba(255, 255, 255, 0.3)" },
      },
      y: {
        ticks: {
          color: "white",
          font: { size: 16, family: "Arial, sans-serif", weight: "bold" },
        },
        grid: { color: "rgba(255, 255, 255, 0.3)" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (typeof window === "undefined") {
    return null; // Don't render on the server
  }

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
        <BarChart
          ref={chartRef}
          data={chartData}
          options={options}
          id="dataChart"
        />
      </div>
    </div>
  );
};

export default DataChart;
