// components/Navbar.js
"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 p-4 z-50">
      <ul className="flex justify-center space-x-6">
        <li>
          <a
            href="#fieldOfficerForm"
            className={`text-white ${
              activeSection === "fieldOfficerForm" ? "font-bold" : ""
            }`}
          >
            ضباط المسح الميداني
          </a>
        </li>
        <li>
          <a
            href="#serviceProviderForm"
            className={`text-white ${
              activeSection === "serviceProviderForm" ? "font-bold" : ""
            }`}
          >
            شركات تقديم الخدمة
          </a>
        </li>
        <li>
          <a
            href="#consultantForm"
            className={`text-white ${
              activeSection === "consultantForm" ? "font-bold" : ""
            }`}
          >
            الاستشاريين
          </a>
        </li>
        <li>
          <a
            href="#contractorForm"
            className={`text-white ${
              activeSection === "contractorForm" ? "font-bold" : ""
            }`}
          >
            المقاولين
          </a>
        </li>
        <li>
          <a
            href="#serviceCenterForm"
            className={`text-white ${
              activeSection === "serviceCenterForm" ? "font-bold" : ""
            }`}
          >
            مراكز الخدمة
          </a>
        </li>
        <li>
          <a
            href="#surveyForm"
            className={`text-white ${
              activeSection === "surveyForm" ? "font-bold" : ""
            }`}
          >
            اجراءات السلامة
          </a>
        </li>
        <li>
          <a
            href="#reports"
            className={`text-white ${
              activeSection === "reports" ? "font-bold" : ""
            }`}
          >
            التقارير
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
