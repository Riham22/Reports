"use client";

import React from "react";
import dynamic from "next/dynamic";
const FieldOfficers = dynamic(() => import("./FieldOfficers"), { ssr: false });
const ServiceProviders = dynamic(() => import("./ServiceProviders"), {
  ssr: false,
});
const DataChart = dynamic(() => import("../Charts/CountBar"), { ssr: false });

const ServiceCenters = dynamic(() => import("./ServiceCenters"), {
  ssr: false,
});
const Consultants = dynamic(() => import("./Consultants"), { ssr: false });
const Surveys = dynamic(() => import("./Survey"), { ssr: false });
const Contractors = dynamic(() => import("./Contractor"), { ssr: false });

const Reports = () => {
  return (
    <div className="mx-auto my-10">
      <FieldOfficers />
      <ServiceProviders />
      <Consultants />
      <Contractors />
      <ServiceCenters />
      <Surveys />
      <div>
        <DataChart />
      </div>
    </div>
  );
};

export default Reports;
