"use client";
import React, { useEffect, useState } from "react";
import ExportServiceProvidersToPDF from "../ServiceProvidersPdf";

import ExportDataToExcel from "../ToExcel";

const ServiceProviders = () => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await fetch("/api/get/serviceProvider");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServiceProviders();
  }, []);

  return (
    <div className="bg-white bg-opacity-20 p-6 text-white rounded-lg m-4">
      <h2 className="text-black text-xl mb-4">بيانات شركات تقديم الخدمة</h2>

      {error && <div className="text-red-500">{error}</div>}

      <section>
        <ExportServiceProvidersToPDF providersData={providers} />
        <ExportDataToExcel dataType="serviceProvider" />
      </section>
    </div>
  );
};

export default ServiceProviders;
