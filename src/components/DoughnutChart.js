// src/components/DoughnutChart.js
"use client";

import { useEffect, useRef } from "react";

const DoughnutChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const total = data.capexMax + data.opexAnnual;
      const capexPercentage = data.capexMax / total;
      const opexPercentage = data.opexAnnual / total;

      let current = 0;
      const animate = () => {
        if (current >= 100) return;
        current += 2;
        ctx.clearRect(0, 0, 200, 200);

        // Draw CAPEX segment
        ctx.beginPath();
        ctx.arc(
          100,
          100,
          80,
          0,
          Math.PI * 2 * capexPercentage * (current / 100)
        );
        ctx.lineTo(100, 100);
        ctx.fillStyle = "#3B82F6";
        ctx.fill();

        // Draw OPEX segment
        ctx.beginPath();
        ctx.arc(
          100,
          100,
          80,
          Math.PI * 2 * capexPercentage,
          Math.PI * 2 * (capexPercentage + opexPercentage * (current / 100))
        );
        ctx.lineTo(100, 100);
        ctx.fillStyle = "#10B981";
        ctx.fill();

        // Inner circle
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [data]);

  return <canvas ref={canvasRef} width="200" height="200"></canvas>;
};

export default DoughnutChart;
