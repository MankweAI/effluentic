"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import ReportSkeleton from "@/components/ReportSkeleton";
import BarChart from "@/components/BarChart";
import DoughnutChart from "@/components/DoughnutChart";
import { generatePdf } from "@/lib/pdfGenerator";

// Helper to format currency
const formatCurrency = (value) => {
  if (typeof value !== "number") return "N/A";
  return `R ${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function ReportPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

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
        <header className="bg-brand-off-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-brand-navy-dark">
              Pre-Feasibility Report
            </h1>
            <p className="text-sm text-brand-steel mt-1">
              Report ID: {report.id}
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {formSubmitted ? (
            <div
              className="bg-green-100 border-l-4 border-brand-action-green text-green-700 p-4 rounded-lg shadow-md mb-8"
              role="alert"
            >
              <p className="font-bold">Thank You!</p>
              <p>
                Your submission has been received. If you requested a review,
                our team will be in touch shortly. Your PDF download has started
                if requested.
              </p>
            </div>
          ) : (
            <div className="bg-brand-off-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <p className="text-brand-navy-dark text-lg font-semibold mr-auto">
                Ready for the next step?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenModal("review")}
                  className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Request Engineering Review
                </button>
                <button
                  onClick={() => handleOpenModal("pdf")}
                  className="w-full sm:w-auto bg-brand-off-white text-blue-600 border-2 border-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  Save as PDF
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Summary */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-brand-off-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-brand-navy-dark border-b-2 border-brand-light-gray pb-2 mb-4">
                  Input Parameters
                </h2>
                <ul className="space-y-3 text-brand-steel-dark">
                  <li className="flex justify-between">
                    <strong>Industry:</strong>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {report.industry}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Flow Rate:</strong>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {report.flow_rate_m3_hr} m³/hr
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <strong>TSS:</strong>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {report.tss_mg_l} mg/L
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Contaminant:</strong>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {report.contaminant_type}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-brand-off-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-brand-navy-dark border-b-2 border-brand-light-gray pb-2 mb-4">
                  Cost Breakdown
                </h2>
                <div className="flex justify-center">
                  <DoughnutChart data={activeSpecs} />
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2 bg-brand-off-white p-6 rounded-lg shadow">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-brand-steel-dark">
                      Required Surface Area:
                    </p>
                    <p className="font-bold text-2xl text-brand-navy">
                      {activeSpecs.surfaceArea} m²
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-brand-steel-dark">Est. Annual OPEX:</p>
                    <p className="font-bold text-2xl text-brand-navy">
                      {formatCurrency(activeSpecs.opexAnnual)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <p className="text-brand-steel-dark">Budget CAPEX Range:</p>
                    <p className="font-bold text-2xl text-brand-navy">
                      {formatCurrency(activeSpecs.capexMin)} -{" "}
                      {formatCurrency(activeSpecs.capexMax)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
