"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmulsifiedOilsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    industry: "food_beverage",
    contaminant_type: "Low-Density",
    flow_rate_m3_hr: 50,
    tss_mg_l: 1200,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let clampedValue = Number(value);
    if (name === "flow_rate_m3_hr") {
      if (clampedValue > 500) clampedValue = 500;
      if (clampedValue < 1) clampedValue = 1;
    }
    if (name === "tss_mg_l") {
      if (clampedValue > 8000) clampedValue = 8000;
      if (clampedValue < 100) clampedValue = 100;
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
          tss_mg_l: Number(formData.tss_mg_l),
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
          Breaking Stable Oil Emulsions in Wastewater
        </h1>
        <p className="mt-4 text-lg text-brand-steel max-w-2xl mx-auto">
          Johan provides an advanced technical overview on treating stable
          oil-in-water emulsions, covering both chemical and mechanical
          separation steps.
        </p>
        <div className="mt-8 aspect-video bg-gray-800 rounded-lg shadow-xl flex items-center justify-center text-white mx-auto max-w-3xl border-4 border-white">
          <p className="font-mono">
            Video Placeholder: The Advanced Technical Advisor
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="bg-brand-off-white p-8 md:p-10 rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-navy mb-2">
            Size Your Flotation System
          </h2>
          <p className="text-brand-steel mb-8">
            This calculator models the mechanical separation (DAF) stage. Your
            chemical program is a critical upstream requirement.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Primary Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 bg-brand-light-gray border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
              >
                <option value="food_beverage">Food & Beverage</option>
                <option value="meat_processing">Meat Processing</option>
                <option value="dairy_processing">Dairy Processing</option>
              </select>
            </div>
            <div className="space-y-4">
              <label
                htmlFor="flow_rate_m3_hr"
                className="block text-sm font-medium text-gray-700"
              >
                Flow Rate
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="flow_rate_m3_hr"
                  name="flow_rate_m3_hr"
                  min="1"
                  max="500"
                  step="1"
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
            <div className="space-y-4">
              <label
                htmlFor="tss_mg_l"
                className="block text-sm font-medium text-gray-700"
              >
                Suspended Solids (TSS)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="tss_mg_l"
                  name="tss_mg_l"
                  min="100"
                  max="8000"
                  step="100"
                  value={formData.tss_mg_l}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center">
                  <input
                    type="number"
                    name="tss_mg_l"
                    value={formData.tss_mg_l}
                    onChange={handleInputChange}
                    className="w-24 font-mono text-right bg-brand-light-gray border border-gray-300 rounded-md px-2 py-1"
                  />
                  <span className="ml-2 text-brand-steel">mg/L</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-[#0A2540] text-white font-bold py-4 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:bg-brand-steel transition-all duration-300"
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
