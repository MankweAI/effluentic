"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// A generic component for a single input field in the calculator
const CalculatorInput = ({ field, value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-2 bg-gray-800 text-white -mt-8">
          {field.tooltip}
        </span>
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700"
        >
          {field.label}
        </label>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          id={field.name}
          name={field.name}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex items-center">
          <input
            type="number"
            name={field.name}
            value={value}
            onChange={onChange}
            className="w-24 font-mono text-right bg-brand-light-gray border border-gray-300 rounded-md px-2 py-1"
          />
          <span className="ml-2 text-brand-steel">{field.unit}</span>
        </div>
      </div>
    </div>
  );
};

// The main template for all spoke pages
export default function SpokePage({
  title,
  description,
  videoPlaceholder,
  calculatorConfig,
  hubLink,
  relatedSpokes,
}) {
  const router = useRouter();

  // Initialize form state from the calculator config
  const initialFormData = calculatorConfig.fields.reduce(
    (acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    },
    { ...calculatorConfig.hiddenFields }
  );

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldConfig = calculatorConfig.fields.find((f) => f.name === name);

    let processedValue = value;
    if (fieldConfig && fieldConfig.type !== "select") {
      processedValue = Number(value);
      if (processedValue > fieldConfig.max) processedValue = fieldConfig.max;
      if (processedValue < fieldConfig.min) processedValue = fieldConfig.min;
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Construct the final data object, ensuring numeric types for specific fields
      const submissionData = { ...formData };
      calculatorConfig.fields.forEach((field) => {
        if (field.type !== "select") {
          submissionData[field.name] = Number(submissionData[field.name]);
        }
      });

      const response = await fetch("/api/report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
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
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl fade-in">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">
          {title}
        </h1>
        <p className="mt-4 text-lg text-brand-steel max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-8 aspect-video bg-gray-800 rounded-lg shadow-xl flex items-center justify-center text-white mx-auto max-w-3xl border-4 border-white">
          <p className="font-mono">{videoPlaceholder}</p>
        </div>
      </section>

      <section className="mt-16">
        <div className="bg-brand-off-white p-8 md:p-10 rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-navy mb-2">
            {calculatorConfig.title}
          </h2>
          <p className="text-brand-steel mb-8">
            {calculatorConfig.description}
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {calculatorConfig.fields.map((field) => {
              if (field.type === "select") {
                return (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {field.label}
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-3 bg-brand-light-gray border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              return (
                <CalculatorInput
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              );
            })}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-[#0A2540] text-white font-bold py-4 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:bg-brand-steel transition-all duration-300"
            >
              {isLoading ? "Generating Report..." : "Generate Report"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </form>
        </div>
      </section>

      <section className="mt-16 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-brand-navy mb-4">
          Related Topics
        </h3>
        <div className="space-y-3">
          {relatedSpokes.map((spoke) => (
            <Link
              href={spoke.href}
              key={spoke.href}
              className="block p-4 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500 transition-colors duration-200"
            >
              <p className="font-semibold text-brand-navy">{spoke.title}</p>
            </Link>
          ))}
          <Link
            href={hubLink.href}
            className="block p-4 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors duration-200 mt-6"
          >
            <p className="font-semibold text-brand-steel-dark">
              ← Back to {hubLink.title}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
