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
      const capexPercentage = (data.capexMax / total) * 100;
      const opexPercentage = (data.opexAnnual / total) * 100;

      const drawSegment = (startAngle, endAngle, color) => {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.arc(100, 100, 80, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      };

      ctx.clearRect(0, 0, 200, 200);

      const capexEndAngle = (Math.PI / 180) * (capexPercentage * 3.6);
      drawSegment(0, capexEndAngle, "#3B82F6");

      const opexEndAngle =
        capexEndAngle + (Math.PI / 180) * (opexPercentage * 3.6);
      drawSegment(capexEndAngle, opexEndAngle, "#10B981");

      // Inner circle for doughnut effect
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }
  }, [data]);

  return <canvas ref={canvasRef} width="200" height="200"></canvas>;
};

export default DoughnutChart;
