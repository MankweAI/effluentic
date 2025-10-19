"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeadCaptureModal from "@/components/LeadCaptureModal";
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
  const { id } = params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'review' or 'pdf'
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Report...</p>
      </div>
    );
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
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Pre-Feasibility Report
            </h1>
            <p className="text-sm text-gray-500 mt-1">Report ID: {report.id}</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {formSubmitted ? (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-8"
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
            <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-gray-600 text-sm mr-auto">
                Ready for the next step?
              </p>
              <button
                onClick={() => handleOpenModal("review")}
                className="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Engineering Review
              </button>
              <button
                onClick={() => handleOpenModal("pdf")}
                className="w-full sm:w-auto bg-white text-blue-600 border border-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Save as PDF
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Summary */}
            <div className="md:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">
                  Input Parameters
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <strong>Industry:</strong>{" "}
                    <span className="font-mono">{report.industry}</span>
                  </li>
                  <li>
                    <strong>Flow Rate:</strong>{" "}
                    <span className="font-mono">
                      {report.flow_rate_m3_hr} m³/hr
                    </span>
                  </li>
                  <li>
                    <strong>TSS:</strong>{" "}
                    <span className="font-mono">{report.tss_mg_l} mg/L</span>
                  </li>
                  <li>
                    <strong>Contaminant:</strong>{" "}
                    <span className="font-mono">{report.contaminant_type}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">
                  Primary Recommendation
                </h2>
                <div className="text-center">
                  <p className="text-lg text-gray-500">
                    Recommended Technology
                  </p>
                  <p className="text-5xl font-bold text-blue-600 my-2">
                    {recommendedTech}
                  </p>
                  <p className="text-gray-600 mt-4">
                    Based on the low-density nature of contaminants like fats
                    and oils, flotation is the most effective treatment
                    principle.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Budgetary Estimates & Sizing
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Recommended System ({recommendedTech})
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 border-t pt-4">
                    <p className="text-gray-600">Required Surface Area:</p>
                    <p className="font-bold text-lg text-right">
                      {recommendedSpecs.surfaceArea} m²
                    </p>
                    <p className="text-gray-600">Est. Annual OPEX:</p>
                    <p className="font-bold text-lg text-right">
                      {formatCurrency(recommendedSpecs.opexAnnual)}
                    </p>
                    <p className="text-gray-600">Budget CAPEX Range:</p>
                    <p className="font-bold text-lg text-right">
                      {formatCurrency(recommendedSpecs.capexMin)} -{" "}
                      {formatCurrency(recommendedSpecs.capexMax)}
                    </p>
                  </div>
                </div>

                <div className="opacity-50">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Alternative System (Clarifier)
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 border-t pt-4">
                    <p className="text-gray-600">Required Surface Area:</p>
                    <p className="font-bold text-lg text-right">
                      {report.clarifier_surface_area_m2} m²
                    </p>
                    <p className="text-gray-600">Budget CAPEX Range:</p>
                    <p className="font-bold text-lg text-right">
                      {formatCurrency(report.clarifier_capex_min_zar)} -{" "}
                      {formatCurrency(report.clarifier_capex_max_zar)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Clarifiers are generally less effective for low-density
                    solids and may require a larger footprint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
