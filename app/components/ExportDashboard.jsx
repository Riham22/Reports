"use client";

import FieldOfficerForm from "./FieldOfficerForm";
import ServiceCenterForm from "./ServiceCenterForm";
import ContractorForm from "./ContractorForm";
import ConsultantForm from "./ConsultantForm";
import ServiceProviderForm from "./ServiceProviderForm";
import Survey from "./SurveyForm";
import Reports from "./Reports/Reports";
import Navbar from "./NavBar";

export default function ExportDashboard() {
  return (
    <div className="flex flex-col items-center justify-center px-4 mt-16">
      <Navbar />
      <div className="p-5 mx-auto w-[80%] flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div id="fieldOfficerForm">
            <FieldOfficerForm />
          </div>
          <div id="serviceProviderForm">
            <ServiceProviderForm />
          </div>
          <div id="consultantForm">
            <ConsultantForm />
          </div>
          <div id="contractorForm">
            <ContractorForm />
          </div>
          <div id="serviceCenterForm">
            <ServiceCenterForm />
          </div>
          <div id="surveyForm">
            <Survey />
          </div>
          <div id="reports">
            <Reports />
          </div>
        </div>
      </div>
    </div>
  );
}
