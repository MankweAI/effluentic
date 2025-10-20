"use client";

import { useEffect, useRef } from "react";

const DoughnutChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = 220;
    const center = size / 2;
    const radius = 80;
    const lineWidth = 22;

    canvas.width = size;
    canvas.height = size;

    const total = data.capexMax + data.opexAnnual;
    const capexPercentage = data.capexMax / total;
    const opexPercentage = data.opexAnnual / total;

    let progress = 0;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const draw = (p) => {
      ctx.clearRect(0, 0, size, size);

      // Background ring
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // CAPEX segment
      const capexEnd = -Math.PI / 2 + Math.PI * 2 * capexPercentage * p;
      const capexGradient = ctx.createLinearGradient(0, 0, size, size);
      capexGradient.addColorStop(0, "#2563EB");
      capexGradient.addColorStop(1, "#3B82F6");
      ctx.beginPath();
      ctx.arc(center, center, radius, -Math.PI / 2, capexEnd);
      ctx.strokeStyle = capexGradient;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(37, 99, 235, 0.3)";
      ctx.shadowBlur = 6;
      ctx.stroke();

      // OPEX segment
      const opexStart = -Math.PI / 2 + Math.PI * 2 * capexPercentage;
      const opexEnd = opexStart + Math.PI * 2 * opexPercentage * p;
      const opexGradient = ctx.createLinearGradient(0, size, size, 0);
      opexGradient.addColorStop(0, "#059669");
      opexGradient.addColorStop(1, "#10B981");
      ctx.beginPath();
      ctx.arc(center, center, radius, opexStart, opexEnd);
      ctx.strokeStyle = opexGradient;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(5, 150, 105, 0.3)";
      ctx.shadowBlur = 6;
      ctx.stroke();
    };

    const animate = () => {
      progress += 0.02;
      const eased = easeOutCubic(Math.min(progress, 1));
      draw(eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }, [data]);

  const formatZAR = (amount) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <canvas ref={canvasRef} style={{ marginBottom: "20px" }} />

      {/* Legend with values */}
      <div style={{ display: "flex", gap: "30px", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              background: "linear-gradient(0deg, #2563EB, #3B82F6)",
              borderRadius: "3px",
            }}
          ></span>
          <span style={{ color: "#0A2540", fontWeight: 500 }}>CAPEX:</span>
          <span style={{ color: "#0A2540" }}>{formatZAR(data.capexMax)}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              background: "linear-gradient(0deg, #059669, #10B981)",
              borderRadius: "3px",
            }}
          ></span>
          <span style={{ color: "#0A2540", fontWeight: 500 }}>OPEX:</span>
          <span style={{ color: "#0A2540" }}>{formatZAR(data.opexAnnual)}</span>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
