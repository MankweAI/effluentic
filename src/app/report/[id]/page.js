"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import ReportSkeleton from "@/components/ReportSkeleton";
import BarChart from "@/components/BarChart";
import DoughnutChart from "@/components/DoughnutChart";
import FactoryIcon from "@/components/icons/FactoryIcon";
import WaterDropIcon from "@/components/icons/WaterDropIcon";
import BeakerIcon from "@/components/icons/BeakerIcon";
import { generatePdf } from "@/lib/pdfGenerator";

// Helper to format currency
const formatCurrency = (value) => {
  if (typeof value !== "number") return "N/A";
  return `R ${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// Supplier Data
const suppliers = [
  {
    name: "Veolia Water Technologies",
    technologies: ["DAF", "Clarifier"],
    url: "https://www.veolia.co.za/",
  },
  {
    name: "A2V",
    technologies: ["DAF", "Clarifier"],
    url: "https://www.a2v.co.za/",
  },
  {
    name: "PCI Africa",
    technologies: ["DAF", "Clarifier"],
    url: "https://pciafrica.com/",
  },
  {
    name: "Xylem",
    technologies: ["DAF", "Clarifier"],
    url: "https://www.xylem.com/en-za/",
  },
  {
    name: "Cube Consolidating",
    technologies: ["Clarifier"],
    url: "https://cubeconsolidating.com/",
  },
  {
    name: "FLSmidth (EIMCO/Dorr-Oliver)",
    technologies: ["Clarifier"],
    url: "https://www.flsmidth.com/",
  },
  { name: "SIGMADAF", technologies: ["DAF"], url: "https://www.sigmadaf.com/" },
];

export default function ReportPage() {
  const params = useParams();
  const { id } = params;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'review' or 'pdf'
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [activeTab, setActiveTab] = useState("recommended");

  useEffect(() => {
    if (!id) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw new Error(error.message);
        if (!data) throw new Error("Report not found.");

        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    if (modalType === "pdf") {
      generatePdf(report);
    }
    handleCloseModal();
  };

  if (loading) {
    return <ReportSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const recommendedTech =
    report.contaminant_type === "Low-Density" ? "DAF" : "Clarifier";
  const alternativeTech =
    report.contaminant_type === "Low-Density" ? "Clarifier" : "DAF";

  const relevantSuppliers = suppliers.filter((s) =>
    s.technologies.includes(recommendedTech)
  );

  const recommendedSpecs = {
    surfaceArea:
      recommendedTech === "DAF"
        ? report.daf_surface_area_m2
        : report.clarifier_surface_area_m2,
    capexMin:
      recommendedTech === "DAF"
        ? report.daf_capex_min_zar
        : report.clarifier_capex_min_zar,
    capexMax:
      recommendedTech === "DAF"
        ? report.daf_capex_max_zar
        : report.clarifier_capex_max_zar,
    opexAnnual:
      recommendedTech === "DAF"
        ? report.daf_opex_annual_zar
        : report.clarifier_opex_annual_zar,
  };

  const alternativeSpecs = {
    surfaceArea:
      alternativeTech === "DAF"
        ? report.daf_surface_area_m2
        : report.clarifier_surface_area_m2,
    capexMin:
      alternativeTech === "DAF"
        ? report.daf_capex_min_zar
        : report.clarifier_capex_min_zar,
    capexMax:
      alternativeTech === "DAF"
        ? report.daf_capex_max_zar
        : report.clarifier_capex_max_zar,
    opexAnnual:
      alternativeTech === "DAF"
        ? report.daf_opex_annual_zar
        : report.clarifier_opex_annual_zar,
  };

  const activeSpecs =
    activeTab === "recommended" ? recommendedSpecs : alternativeSpecs;
  const activeTech =
    activeTab === "recommended" ? recommendedTech : alternativeTech;

  const paybackPeriod =
    recommendedSpecs.opexAnnual > 0
      ? (recommendedSpecs.capexMax / recommendedSpecs.opexAnnual).toFixed(1)
      : "N/A";

  return (
    <>
      {isModalOpen && (
        <LeadCaptureModal
          reportId={id}
          ctaType={modalType}
          onClose={handleCloseModal}
          onFormSubmit={handleFormSuccess}
        />
      )}
      <div className="bg-brand-light-gray min-h-screen fade-in">
        <header className="bg-brand-off-white shadow-sm border-b border-brand-light-gray">
          <div className="container mx-auto px-4 py-6 text-center">
            <h1 className="text-3xl font-bold text-brand-navy-dark">
              Pre-Feasibility Report
            </h1>
            <p className="text-sm text-brand-steel mt-1">
              Report ID: {report.id}
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Summary */}
            <div className="lg:col-span-1 space-y-8">
              {/* Input Parameters Card */}
              <div className="bg-brand-off-white p-6 rounded-lg shadow card-hover card-border-info">
                <h2 className="text-xl font-bold text-brand-navy-dark border-b-2 border-brand-light-gray pb-2 mb-4">
                  Input Parameters
                </h2>
                <ul className="space-y-4 text-brand-steel-dark">
                  <ul className="divide-y divide-gray-200">
                    <li className="flex items-center p-3 rounded-lg hover:bg-brand-off-white transition">
                      <span className="bg-brand-info/10 p-2 rounded-full mr-3">
                        <FactoryIcon className="h-6 w-6 text-brand-info" />
                      </span>
                      <div className="flex justify-between items-center w-full">
                        <strong>Industry:</strong>
                        <span className="font-mono bg-brand-off-white text-brand-navy-dark px-3 py-1 rounded-md shadow-sm">
                          {report.industry}
                        </span>
                      </div>
                    </li>

                    <li className="flex items-center p-3 rounded-lg hover:bg-brand-off-white transition">
                      <span className="bg-brand-info/10 p-2 rounded-full mr-3">
                        <WaterDropIcon className="h-6 w-6 text-brand-info" />
                      </span>
                      <div className="flex justify-between items-center w-full">
                        <strong>Flow Rate:</strong>
                        <span className="font-mono bg-brand-off-white text-brand-navy-dark px-3 py-1 rounded-md shadow-sm">
                          {report.flow_rate_m3_hr} m³/hr
                        </span>
                      </div>
                    </li>

                    <li className="flex items-center p-3 rounded-lg hover:bg-brand-off-white transition">
                      <span className="bg-brand-info/10 p-2 rounded-full mr-3">
                        <BeakerIcon className="h-6 w-6 text-brand-info" />
                      </span>
                      <div className="flex justify-between items-center w-full">
                        <strong>TSS:</strong>
                        <span className="font-mono bg-brand-off-white text-brand-navy-dark px-3 py-1 rounded-md shadow-sm">
                          {report.tss_mg_l} mg/L
                        </span>
                      </div>
                    </li>
                  </ul>
                </ul>
              </div>
              {/* Cost Breakdown Card */}
              <div className="bg-brand-off-white p-6 rounded-lg shadow card-hover card-border-success">
                <h2 className="text-xl font-bold text-brand-navy-dark border-b-2 border-brand-light-gray pb-2 mb-4">
                  Cost Breakdown
                </h2>
                <div className="flex justify-center">
                  <DoughnutChart data={activeSpecs} />
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2 bg-brand-off-white p-6 rounded-lg shadow card-hover">
              <div className="flex border-b-2 border-brand-light-gray mb-6">
                <button
                  onClick={() => setActiveTab("recommended")}
                  className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
                    activeTab === "recommended"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-brand-steel"
                  }`}
                >
                  Recommended
                </button>
                <button
                  onClick={() => setActiveTab("alternative")}
                  className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
                    activeTab === "alternative"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-brand-steel"
                  }`}
                >
                  Alternative
                </button>
              </div>

              <h2 className="text-3xl font-bold text-brand-navy-dark mb-6">
                {activeTech} System
              </h2>
              <div className="space-y-8">
                <BarChart data={activeSpecs} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Surface Area */}
                  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-sm font-medium text-brand-steel-dark">
                      Required Surface Area
                    </p>
                    <p className="mt-3 text-3xl font-bold text-brand-navy">
                      {activeSpecs.surfaceArea}{" "}
                      <span className="text-base text-brand-steel-dark">
                        m²
                      </span>
                    </p>
                  </div>

                  {/* Annual OPEX */}
                  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-sm font-medium text-brand-steel-dark">
                      Estimated Annual OPEX
                    </p>
                    <p className="mt-3 text-3xl font-bold text-brand-navy">
                      {formatCurrency(activeSpecs.opexAnnual)}
                    </p>
                  </div>

                  {/* CAPEX Range */}
                  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2">
                    <p className="text-sm font-medium text-brand-steel-dark">
                      Budget CAPEX Range
                    </p>
                    <p className="mt-3 text-3xl font-bold text-brand-navy">
                      {formatCurrency(activeSpecs.capexMin)}{" "}
                      <span className="text-lg text-brand-steel-dark">–</span>{" "}
                      {formatCurrency(activeSpecs.capexMax)}
                    </p>
                    <p className="text-xs mt-2 text-brand-steel-dark">
                      (Includes installation, materials, and contingencies)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-10 bg-brand-navy-dark p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready for the Next Step?
            </h2>
            <p className="text-brand-steel-light mb-6 max-w-2xl mx-auto">
              Get a detailed, engineer-reviewed version of this report sent
              directly to your inbox. This is a free, no-obligation service to
              help you validate your project parameters.
            </p>
            {formSubmitted ? (
              <div
                className="bg-green-100 border-l-4 border-brand-action-green text-green-800 p-4 rounded-lg shadow-md max-w-2xl mx-auto text-left"
                role="alert"
              >
                <p className="font-bold">Thank You!</p>
                <p>
                  Your submission has been received. Our engineering partner
                  will be in touch shortly. Your PDF download will begin if
                  requested.
                </p>
              </div>
            ) : (
              <button
                onClick={() => handleOpenModal("review")}
                className="bg-brand-action-green text-brand-navy-dark font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Review & Send To Me As PDF
              </button>
            )}
          </div>

          {/* Supplier Directory */}
          <div className="mt-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-brand-navy-dark flex items-center gap-2 border-b border-gray-200 pb-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {recommendedTech} Equipment Suppliers (South Africa)
            </h2>
            <p className="text-sm text-brand-steel mb-6">
              The following is a list of potential equipment suppliers for the
              recommended technology. Effluentic is an independent platform and
              does not endorse any specific supplier.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relevantSuppliers.map((supplier) => (
                <a
                  href={supplier.url}
                  key={supplier.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-blue-500 transition-all duration-200"
                >
                  <span className="font-semibold text-brand-navy">
                    {supplier.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
