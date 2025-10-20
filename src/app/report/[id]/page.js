"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct hook for accessing params
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function ReportPage() {
  const params = useParams(); // Standard way to get route params
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
  

  // **BUG FIX**: Calculate paybackPeriod and handle division by zero
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Summary */}
            <div className="lg:col-span-1 space-y-8">
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
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-brand-steel-dark">
                        Required Surface Area
                      </p>
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </span>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-brand-navy">
                      {activeSpecs.surfaceArea}{" "}
                      <span className="text-base text-brand-steel-dark">
                        m²
                      </span>
                    </p>
                  </div>

                  {/* Annual OPEX */}
                  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-brand-steel-dark">
                        Estimated Annual OPEX
                      </p>
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                        💰
                      </span>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-brand-navy">
                      {formatCurrency(activeSpecs.opexAnnual)}
                    </p>
                  </div>

                  {/* CAPEX Range */}
                  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-brand-steel-dark">
                        Budget CAPEX Range
                      </p>
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-600 rounded-full">
                        🏗️
                      </span>
                    </div>
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
          <div className="mt-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-brand-navy-dark flex items-center gap-2 border-b border-gray-200 pb-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-brand-navy-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                />
              </svg>
              Commentary
            </h2>

            <div className="prose max-w-none text-brand-steel-dark leading-relaxed space-y-6">
              <p className="text-base">
                The estimates provided are for pre-feasibility purposes and are
                based on the inputs supplied and typical industry design
                parameters. A detailed engineering review is strongly
                recommended before preparing a formal proposal.
              </p>

              <section>
                <h4 className="text-lg font-semibold text-brand-navy-dark border-l-4 border-blue-500 pl-3 mb-2">
                  Technology Recommendation
                </h4>
                <p>
                  A <strong>{recommendedTech}</strong> system is recommended
                  based on the{" "}
                  <strong>{report.contaminant_type.toLowerCase()}</strong>{" "}
                  nature of the contaminants. This technology provides the most
                  efficient and cost-effective solution for this application. An
                  alternative option, <strong>{alternativeTech}</strong>, would
                  likely result in lower performance and a larger footprint.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-brand-navy-dark border-l-4 border-green-500 pl-3 mb-2">
                  Financials
                </h4>
                <p>
                  The estimated payback period of approximately{" "}
                  <strong>{paybackPeriod} years</strong> is derived from a
                  simplified model and does not account for variables such as
                  cost of capital, depreciation, or potential revenue from
                  recovered resources. The cost per cubic meter of treated water
                  remains a key performance indicator of operational efficiency.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-brand-navy-dark border-l-4 border-amber-500 pl-3 mb-2">
                  Next Steps
                </h4>
                <p>
                  We recommend a comprehensive engineering review to refine
                  these estimates and develop a formal proposal. This should
                  include detailed evaluations of site-specific factors such as
                  civil works, electrical infrastructure, and automation
                  requirements.
                </p>
              </section>
            </div>
          </div>
        </main>
        {formSubmitted ? (
          <div
            className="bg-green-100 border-l-4 border-brand-action-green text-green-700 p-4 rounded-lg shadow-md mb-8"
            role="alert"
          >
            <p className="font-bold">Thank You!</p>
            <p>
              Your submission has been received. If you requested a review, our
              team will be in touch shortly. Your PDF download has started if
              requested.
            </p>
          </div>
        ) : (
          <div className="bg-brand-off-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleOpenModal("review")}
                className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Review & Send To Me As PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
