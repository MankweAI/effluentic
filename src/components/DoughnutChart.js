"use client";

import { useEffect, useRef } from "react";

// Helper to format currency robustly
const formatZAR = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "N/A";
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const DoughnutChart = ({ data }) => {
  const canvasRef = useRef(null);

  // Ensure data exists and values are numbers, default to 0 if not
  const capexMax =
    typeof data?.capexMax === "number" && !isNaN(data.capexMax)
      ? data.capexMax
      : 0;
  const opexAnnual =
    typeof data?.opexAnnual === "number" && !isNaN(data.opexAnnual)
      ? data.opexAnnual
      : 0;

  useEffect(() => {
    if (!canvasRef.current) return; // Always get canvas ref

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = 200; // Slightly smaller size
    const center = size / 2;
    const radius = 75; // Adjusted radius
    const lineWidth = 20; // Adjusted line width

    canvas.width = size;
    canvas.height = size;

    // Calculate total safely, handle case where both are 0
    const total = capexMax + opexAnnual;
    const capexPercentage = total > 0 ? capexMax / total : 0;
    const opexPercentage = total > 0 ? opexAnnual / total : 0;

    let progress = 0;
    const animationDuration = 60; // Frames for animation ~1 second

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const draw = (p) => {
      ctx.clearRect(0, 0, size, size);

      // Background ring
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#E5E7EB"; // Tailwind gray-200
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Only draw segments if total > 0
      if (total > 0) {
        // CAPEX segment
        if (capexPercentage > 0) {
          const capexEndAngle =
            -Math.PI / 2 + Math.PI * 2 * capexPercentage * p;
          const capexGradient = ctx.createLinearGradient(0, 0, size, size);
          capexGradient.addColorStop(0, "#2563EB"); // Tailwind blue-600
          capexGradient.addColorStop(1, "#3B82F6"); // Tailwind blue-500
          ctx.beginPath();
          ctx.arc(center, center, radius, -Math.PI / 2, capexEndAngle, false);
          ctx.strokeStyle = capexGradient;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";
          ctx.shadowColor = "rgba(37, 99, 235, 0.2)"; // Softer shadow
          ctx.shadowBlur = 5;
          ctx.stroke();
        }

        // OPEX segment
        if (opexPercentage > 0) {
          const opexStartAngle = -Math.PI / 2 + Math.PI * 2 * capexPercentage; // Start where CAPEX ends
          const opexEndAngle =
            opexStartAngle + Math.PI * 2 * opexPercentage * p;
          const opexGradient = ctx.createLinearGradient(0, size, size, 0);
          opexGradient.addColorStop(0, "#059669"); // Tailwind green-600
          opexGradient.addColorStop(1, "#10B981"); // Tailwind green-500
          ctx.beginPath();
          // Ensure arc is drawn only if start and end are different
          if (Math.abs(opexEndAngle - opexStartAngle) > 0.001) {
            ctx.arc(
              center,
              center,
              radius,
              opexStartAngle,
              opexEndAngle,
              false
            );
          }
          ctx.strokeStyle = opexGradient;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";
          ctx.shadowColor = "rgba(5, 150, 105, 0.2)"; // Softer shadow
          ctx.shadowBlur = 5;
          ctx.stroke();
        }
      } else {
        // Optional: Draw something indication zero values, like a simple grey circle or text
        ctx.fillStyle = "#6B7280"; // Tailwind gray-500
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "14px Inter, sans-serif";
        ctx.fillText("N/A", center, center);
      }
    };

    let frameCount = 0;
    let animationFrameId;
    const animate = () => {
      frameCount++;
      progress = frameCount / animationDuration;
      const easedProgress = easeOutCubic(Math.min(progress, 1));
      draw(easedProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate(); // Start animation

    // Cleanup function to cancel animation frame if component unmounts
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [capexMax, opexAnnual]); // Rerun effect if data values change

  return (
    <div className="flex flex-col items-center font-sans">
      {" "}
      {/* Use Tailwind classes */}
      <canvas ref={canvasRef} className="mb-5" />
      {/* Legend */}
      <div className="flex flex-col gap-3 text-sm">
        {" "}
        {/* Use Tailwind classes */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-sm"></span>
          <span className="text-gray-800 font-medium">Budget CAPEX:</span>
          <span className="text-gray-800 font-mono">{formatZAR(capexMax)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 bg-gradient-to-br from-green-600 to-green-500 rounded-sm"></span>
          <span className="text-gray-800 font-medium">Annual OPEX:</span>
          <span className="text-gray-800 font-mono">
            {formatZAR(opexAnnual)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
