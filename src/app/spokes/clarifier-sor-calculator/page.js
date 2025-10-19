"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClarifierSorCalculatorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    industry: "mining_beneficiation",
    contaminant_type: "High-Density", // Pre-filled for this spoke
    flow_rate_m3_hr: 250,
    tss_mg_l: 5000, // Default value for API, not a primary user input here
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let clampedValue = Number(value);
    if (name === "flow_rate_m3_hr") {
      if (clampedValue > 2000) clampedValue = 2000;
      if (clampedValue < 10) clampedValue = 10;
    }
    setFormData((prev) => ({ ...prev, [name]: clampedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          flow_rate_m3_hr: Number(formData.flow_rate_m3_hr),
          tss_mg_l: Number(formData.tss_mg_l), // Send default TSS
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate report.");
      }
      const result = await response.json();
      router.push(`/report/${result.reportId}`);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">
          Clarifier Surface Overflow Rate (SOR) Calculator
        </h1>
        <p className="mt-4 text-lg text-brand-steel max-w-2xl mx-auto">
          Johan explains the importance of SOR for sizing gravity clarifiers and
          thickeners in mining and heavy industry applications.
        </p>
        <div className="mt-8 aspect-video bg-gray-800 rounded-lg shadow-xl flex items-center justify-center text-white mx-auto max-w-3xl border-4 border-white">
          <p className="font-mono">
            Video Placeholder: The Mining & Heavy Industry Expert
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="bg-brand-off-white p-8 md:p-10 rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-navy mb-2">
            Calculate Required Clarifier Area
          </h2>
          <p className="text-brand-steel mb-8">
            Determine the footprint required based on your plant&apos;s hydraulic
            load.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label
                htmlFor="flow_rate_m3_hr"
                className="block text-sm font-medium text-gray-700"
              >
                Process Flow Rate
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="flow_rate_m3_hr"
                  name="flow_rate_m3_hr"
                  min="10"
                  max="2000"
                  step="10"
                  value={formData.flow_rate_m3_hr}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center">
                  <input
                    type="number"
                    name="flow_rate_m3_hr"
                    value={formData.flow_rate_m3_hr}
                    onChange={handleInputChange}
                    className="w-24 font-mono text-right bg-brand-light-gray border border-gray-300 rounded-md px-2 py-1"
                  />
                  <span className="ml-2 text-brand-steel">m³/hr</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-brand-navy text-white font-bold py-4 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:bg-brand-steel transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Report...
                </>
              ) : (
                "Generate Report"
              )}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
