"use client";

import { useEffect, useState } from "react";

import ExportSurveyToPDF from "../SurveyPdf";
import ExportDataToExcel from "../ToExcel";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveyers = async () => {
      try {
        const response = await fetch("/api/get/survey");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSurveys(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSurveyers();
  }, []);

  return (
    <div className="bg-white bg-opacity-20 p-6 text-white rounded-lg m-4">
      <h2 className="text-black text-xl mb-4">تطبيق إجراءات السلامة</h2>

      {error && <div className="text-red-500">{error}</div>}

      <section>
        <ExportSurveyToPDF tableData={surveys} />
        <ExportDataToExcel dataType="survey" />
      </section>
    </div>
  );
}
