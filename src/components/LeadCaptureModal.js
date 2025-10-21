"use client";

import { useState } from "react";

export default function LeadCaptureModal({
  reportId,
  ctaType,
  conceptFocus, // Receive conceptFocus
  onClose,
  onFormSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError("Email address is required.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lead/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          report_id: reportId,
          cta_type: ctaType,
          concept_focus: conceptFocus, // Send conceptFocus with lead data
        }),
      });

      const responseBody = await response.json(); // Read body regardless of status

      if (!response.ok) {
        console.error("Lead Capture API Error:", responseBody);
        throw new Error(
          responseBody.error || `Submission failed. Status: ${response.status}`
        );
      }

      onFormSubmit(); // Notify parent component of success
    } catch (err) {
      console.error("Lead Capture Submit Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const isReview = ctaType === "review";

  const modalTitle = isReview
    ? "Request Your Free Engineering Review"
    : "Get Your PDF Report";
  const modalSubtext = isReview
    ? "An engineer will review your report (focused on: " +
      (conceptFocus?.replace(/_/g, " ") || "General") +
      ") and follow up via email."
    : "We'll send a copy of this report (focused on: " +
      (conceptFocus?.replace(/_/g, " ") || "General") +
      ") to your inbox for your records.";
  const buttonText = isReview ? "Submit Request" : "Send PDF to My Inbox";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 fade-in px-4">
      {" "}
      {/* Added padding for small screens */}
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md m-4 relative">
        {" "}
        {/* Added relative positioning */}
        {/* Close button top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* Progress bar simulation or step indicator (optional) */}
        {/* <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "100%" }}></div>
        </div> */}
        <div className="mb-5">
          {" "}
          {/* Adjusted spacing */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {modalTitle}
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {modalSubtext}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-describedby="email-error"
            />
          </div>

          {error && (
            <p
              id="email-error"
              className="text-red-500 text-sm mt-2 text-center"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors mt-6" // Added margin top
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
                Submitting...
              </>
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
