"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HighFatWastewaterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    industry: "food_beverage",
    contaminant_type: "Low-Density", // Pre-filled for this spoke
    flow_rate_m3_hr: 50,
    tss_mg_l: 1200,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate report");
      }

      const result = await response.json();
      router.push(`/report/${result.reportId}`);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Video & Context */}
        <div className="prose lg:prose-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            The Engineer&apos;s Guide to High-FOG Effluent
          </h1>
          <p className="text-gray-600">
            A senior process engineer, Johan, provides a comprehensive overview
            of treating high-fat, oil, and grease (FOG) wastewater.
          </p>
          <div className="aspect-video bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-white my-8">
            {/* Placeholder for Johan's Video */}
            <p>Video Placeholder (16:9)</p>
          </div>
        </div>

        {/* Right Column: Calculator */}
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Get Your Baseline Data
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your plant&apos;s data to generate an instant pre-feasibility
            report.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700"
              >
                Primary Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="food_beverage">Food & Beverage</option>
                <option value="meat_processing">Meat Processing</option>
                <option value="dairy_processing">Dairy Processing</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="flow_rate_m3_hr"
                className="block text-sm font-medium text-gray-700"
              >
                Flow Rate ({formData.flow_rate_m3_hr} m³/hr)
              </label>
              <input
                type="range"
                id="flow_rate_m3_hr"
                name="flow_rate_m3_hr"
                min="1"
                max="500"
                value={formData.flow_rate_m3_hr}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label
                htmlFor="tss_mg_l"
                className="block text-sm font-medium text-gray-700"
              >
                Suspended Solids (TSS) ({formData.tss_mg_l} mg/L)
              </label>
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Generating Report..." : "Generate Report"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

