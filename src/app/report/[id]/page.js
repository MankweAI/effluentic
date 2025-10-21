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
import { generatePdf } from "@/lib/pdfGenerator"; // Assuming pdfGenerator will also be updated

// Helper to format currency
const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) return "N/A";
  return `R ${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// Helper to format numbers generally
const formatNumber = (value, decimals = 2) => {
  if (typeof value !== "number" || isNaN(value)) return "N/A";
  return value.toLocaleString("en-ZA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Supplier Data (Remains the same)
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

// Component to render specific calculated data sections
const CalculatedDataSection = ({ title, data }) => {
  if (!data) return null;
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold text-brand-navy-dark border-b pb-2 mb-4">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-brand-steel-dark">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            <span>
              {/* Basic formatting, can be enhanced */}
              {typeof value === "number" ? formatNumber(value) : String(value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for Compliance Check data
const ComplianceDataSection = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold text-brand-navy-dark border-b pb-2 mb-4">
        {title}
      </h3>
      <ul className="space-y-3 text-sm text-brand-steel-dark">
        {Object.entries(data).map(([key, status]) => (
          <li key={key} className="flex justify-between items-center">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            <div className="text-right">
              <span>{status.value ?? "N/A"}</span>
              <span className="text-xs text-gray-500">
                {" "}
                (Limit:{" "}
                {status.limit ?? `${status.limit_min}-${status.limit_max}`})
              </span>
            </div>
            <span
              className={`ml-3 px-2 py-0.5 rounded text-xs font-medium ${
                status.compliant
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status.compliant ? "Compliant" : "Non-Compliant"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for Troubleshooting Tips
const TroubleshootingSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold text-brand-navy-dark border-b pb-2 mb-4">
        {title}
      </h3>
      <ul className="space-y-2 text-sm list-disc list-inside text-brand-steel-dark">
        {data.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default function ReportPage() {
  const params = useParams();
  const { id } = params;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'review' or 'pdf'
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [activeTab, setActiveTab] = useState("recommended"); // Keep for DAF/Clarifier display

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

        if (error) throw new Error(`Supabase fetch error: ${error.message}`);
        if (!data) throw new Error("Report not found.");

        console.log("Fetched Report Data:", data); // Log fetched data
        setReport(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Handlers remain the same
  const handleOpenModal = (type) => {
    // Pass concept_focus to modal if needed
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleFormSuccess = () => {
    setFormSubmitted(true);
    if (modalType === "pdf" && report) {
      // Pass concept_focus to PDF generator
      generatePdf(report, report.concept_focus);
    }
    // Keep modal open briefly or show success inline? For now, close immediately.
    // setTimeout(handleCloseModal, 3000); // Optional delay
    handleCloseModal();
  };

  if (loading) return <ReportSkeleton />;
  if (error)
    return (
      <div className="text-red-500 text-center p-8">
        Error loading report: {error}
      </div>
    );
  if (!report)
    return <div className="text-center p-8">Report data not available.</div>;

  // --- Determine DAF/Clarifier recommendation (still useful as a baseline) ---
  // Default recommendation logic based on contaminant type or industry if type is missing
  let recommendedTech = "DAF"; // Default
  if (
    report.contaminant_type === "High-Density" ||
    report.industry === "mining_beneficiation"
  ) {
    recommendedTech = "Clarifier";
  } else if (
    report.contaminant_type === "Low-Density" ||
    ["food_beverage", "meat_processing", "dairy_processing"].includes(
      report.industry
    )
  ) {
    recommendedTech = "DAF";
  }
  const alternativeTech = recommendedTech === "DAF" ? "Clarifier" : "DAF";

  const getSpecs = (tech) => {
    return {
      surfaceArea:
        tech === "DAF"
          ? report.daf_surface_area_m2
          : report.clarifier_surface_area_m2,
      capexMin:
        tech === "DAF"
          ? report.daf_capex_min_zar
          : report.clarifier_capex_min_zar,
      capexMax:
        tech === "DAF"
          ? report.daf_capex_max_zar
          : report.clarifier_capex_max_zar,
      opexAnnual:
        tech === "DAF"
          ? report.daf_opex_annual_zar
          : report.clarifier_opex_annual_zar,
    };
  };

  const recommendedSpecs = getSpecs(recommendedTech);
  const alternativeSpecs = getSpecs(alternativeTech);

  const activeSpecs =
    activeTab === "recommended" ? recommendedSpecs : alternativeSpecs;
  const activeTech =
    activeTab === "recommended" ? recommendedTech : alternativeTech;

  const relevantSuppliers = suppliers.filter((s) =>
    s.technologies.includes(recommendedTech)
  );

  const paybackPeriod =
    recommendedSpecs?.opexAnnual > 0
      ? (recommendedSpecs.capexMax / recommendedSpecs.opexAnnual).toFixed(1) // Simple payback for consistency
      : "N/A";

  // --- Access Concept-Specific Data ---
  const conceptData = report.calculated_data || {};
  const inputParams = report.input_params || {};

  return (
    <>
      {isModalOpen && (
        <LeadCaptureModal
          reportId={id}
          ctaType={modalType}
          conceptFocus={report.concept_focus} // Pass concept focus
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
              Focus:{" "}
              <span className="font-semibold capitalize">
                {report.concept_focus?.replace(/_/g, " ") || "General"}
              </span>{" "}
              | Report ID: {report.id?.substring(0, 8)}...
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Input & Primary Results */}
            <div className="lg:col-span-1 space-y-8">
              {/* Input Parameters Card */}
              <div className="bg-brand-off-white p-6 rounded-lg shadow card-hover card-border-info">
                <h2 className="text-xl font-bold text-brand-navy-dark border-b-2 border-brand-light-gray pb-2 mb-4">
                  Input Parameters
                </h2>
                {/* Display inputs stored in input_params */}
                <ul className="space-y-4 text-brand-steel-dark">
                  <li className="flex items-center p-3 rounded-lg hover:bg-brand-off-white transition">
                    <span className="bg-brand-info/10 p-2 rounded-full mr-3">
                      <FactoryIcon className="h-6 w-6 text-brand-info" />
                    </span>
                    <div className="flex justify-between items-center w-full">
                      <strong>Industry:</strong>{" "}
                      <span className="font-mono bg-brand-off-white text-brand-navy-dark px-3 py-1 rounded-md shadow-sm">
                        {report.industry || "N/A"}
                      </span>
                    </div>
                  </li>
                  {/* Dynamically display other relevant inputs */}
                  {Object.entries(inputParams).map(([key, value]) => {
                    if (key === "industry") return null; // Already shown
                    let Icon = BeakerIcon; // Default
                    if (key.includes("flow_rate")) Icon = WaterDropIcon;

                    return (
                      <li
                        key={key}
                        className="flex items-center p-3 rounded-lg hover:bg-brand-off-white transition"
                      >
                        <span className="bg-brand-info/10 p-2 rounded-full mr-3">
                          <Icon className="h-6 w-6 text-brand-info" />
                        </span>
                        <div className="flex justify-between items-center w-full">
                          <strong className="capitalize">
                            {key.replace(/_/g, " ")}:
                          </strong>
                          <span className="font-mono bg-brand-off-white text-brand-navy-dark px-3 py-1 rounded-md shadow-sm">
                            {value ?? "N/A"}{" "}
                            {key.includes("m3_hr")
                              ? "m³/hr"
                              : key.includes("mg_l")
                              ? "mg/L"
                              : ""}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Display Concept-Specific Results FIRST */}
              {report.concept_focus === "chemical_dosing" &&
                conceptData.chemicalDosage && (
                  <CalculatedDataSection
                    title="Estimated Chemical Dosage"
                    data={conceptData.chemicalDosage}
                  />
                )}
              {report.concept_focus === "regulatory_check" &&
                conceptData.complianceStatus && (
                  <ComplianceDataSection
                    title="Regulatory Compliance Check"
                    data={conceptData.complianceStatus}
                  />
                )}
              {report.concept_focus === "biological_load_estimation" &&
                conceptData.biologicalLoad && (
                  <CalculatedDataSection
                    title="Estimated Biological Load"
                    data={conceptData.biologicalLoad}
                  />
                )}
              {report.concept_focus === "troubleshooting" &&
                conceptData.troubleshootingTips && (
                  <TroubleshootingSection
                    title="Troubleshooting Suggestions"
                    data={conceptData.troubleshootingTips}
                  />
                )}

              {/* Cost Breakdown Doughnut - Show for concepts involving costing */}
              {(conceptData.dafSpecs || conceptData.clarifierSpecs) &&
                activeSpecs?.capexMax > 0 && (
                  <div className="bg-brand-off-white p-6 rounded-lg shadow card-hover card-border-success">
                    <h2 className="text-xl font-bold text-brand-navy-dark border-b-2 border-brand-light-gray pb-2 mb-4">
                      Cost Breakdown ({activeTech})
                    </h2>
                    <div className="flex justify-center">
                      {/* Pass only the relevant specs for the active tech */}
                      <DoughnutChart
                        data={{
                          capexMax: activeSpecs.capexMax,
                          opexAnnual: activeSpecs.opexAnnual,
                        }}
                      />
                    </div>
                  </div>
                )}
            </div>

            {/* Right Column: DAF/Clarifier Comparison (If applicable) */}
            {(conceptData.dafSpecs?.surface_area_m2 > 0 ||
              conceptData.clarifierSpecs?.surface_area_m2 > 0) && (
              <div className="lg:col-span-2 bg-brand-off-white p-6 rounded-lg shadow card-hover">
                {/* Tabs for DAF/Clarifier */}
                <div className="flex border-b-2 border-brand-light-gray mb-6">
                  {conceptData.dafSpecs?.surface_area_m2 > 0 && (
                    <button
                      onClick={() => setActiveTab("recommended")}
                      className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
                        activeTab === "recommended"
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-brand-steel"
                      }`}
                    >
                      {recommendedTech} (Recommended)
                    </button>
                  )}
                  {conceptData.clarifierSpecs?.surface_area_m2 > 0 &&
                    conceptData.dafSpecs?.surface_area_m2 > 0 && ( // Only show alternative if both exist
                      <button
                        onClick={() => setActiveTab("alternative")}
                        className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
                          activeTab === "alternative"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-brand-steel"
                        }`}
                      >
                        {alternativeTech} (Alternative)
                      </button>
                    )}
                  {/* Handle case where only Clarifier exists */}
                  {conceptData.clarifierSpecs?.surface_area_m2 > 0 &&
                    !(conceptData.dafSpecs?.surface_area_m2 > 0) && (
                      <button
                        onClick={() => setActiveTab("recommended")} // Treat Clarifier as recommended here
                        className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 border-b-2 border-blue-600 text-blue-600`}
                      >
                        {recommendedTech} (Recommended)
                      </button>
                    )}
                </div>

                <h2 className="text-3xl font-bold text-brand-navy-dark mb-6">
                  {activeTech} System Details
                </h2>
                {activeSpecs?.surfaceArea > 0 ? (
                  <div className="space-y-8">
                    {/* Bar Chart for CAPEX vs OPEX */}
                    {activeSpecs.capexMax > 0 && (
                      <BarChart
                        data={{
                          capexMax: activeSpecs.capexMax,
                          opexAnnual: activeSpecs.opexAnnual,
                        }}
                      />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* Surface Area */}
                      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <p className="text-sm font-medium text-brand-steel-dark">
                          Required Surface Area
                        </p>
                        <p className="mt-3 text-3xl font-bold text-brand-navy">
                          {formatNumber(activeSpecs.surfaceArea)}{" "}
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
                          <span className="text-lg text-brand-steel-dark">
                            –
                          </span>{" "}
                          {formatCurrency(activeSpecs.capexMax)}
                        </p>
                        <p className="text-xs mt-2 text-brand-steel-dark">
                          (Class 4 Estimate: +/- 30-50%)
                        </p>
                      </div>
                    </div>
                    {/* Add Payback Period if relevant */}
                    {paybackPeriod !== "N/A" && (
                      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <p className="text-sm font-medium text-brand-steel-dark">
                          Simple Payback Period (vs. Est. OPEX)
                        </p>
                        <p className="mt-3 text-3xl font-bold text-brand-navy">
                          ~{paybackPeriod}{" "}
                          <span className="text-base text-brand-steel-dark">
                            Years
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-brand-steel italic">
                    {activeTech} is generally not applicable for this
                    industry/contaminant type based on typical parameters.
                  </p>
                )}
              </div>
            )}
            {/* Display other concept results if they weren't primary */}
            {report.concept_focus !== "chemical_dosing" &&
              conceptData.chemicalDosage && (
                <div className="lg:col-span-3 mt-8">
                  {" "}
                  {/* Place below main grid */}
                  <CalculatedDataSection
                    title="Estimated Chemical Dosage"
                    data={conceptData.chemicalDosage}
                  />
                </div>
              )}
            {/* Add similar checks for other secondary concept results */}
          </div>{" "}
          {/* End Main Grid */}
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
                  will be in touch shortly.{" "}
                  {modalType === "pdf" ? "Your PDF download should begin." : ""}
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => handleOpenModal("review")}
                  className="bg-brand-action-green text-brand-navy-dark font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  Request Engineer Review
                </button>
                <button
                  onClick={() => handleOpenModal("pdf")}
                  className="bg-gray-200 text-brand-navy-dark font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Email PDF Report
                </button>
              </div>
            )}
          </div>
          {/* Supplier Directory (Show based on Recommended Tech) */}
          {relevantSuppliers.length > 0 && (
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
                The following is a list of potential equipment suppliers.
                Effluentic is independent and does not endorse any specific
                supplier.
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
          )}
        </main>
      </div>
    </>
  );
}
