import React from "react";
import FieldOfficers from "./FieldOfficers";
import ServiceProviders from "./ServiceProviders";
import ServiceCenters from "./ServiceCenters";
import Consultants from "./Consultants";
import Surveys from "./Survey";
import Contractors from "./Contractor";
import DataChart from "../Charts/CountBar";

const Reports = () => {
  return (
    <div className=" mx-auto my-10">
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
