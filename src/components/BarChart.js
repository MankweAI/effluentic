// src/components/BarChart.js
"use client";

import { useState, useEffect } from "react";

const BarChart = ({ data }) => {
  const [maxVal, setMaxVal] = useState(0);

  useEffect(() => {
    if (data) {
      const maxValue = Math.max(data.capexMax, data.opexAnnual) * 1.25;
      setMaxVal(maxValue);
    }
  }, [data]);

  const capexPercentage = maxVal > 0 ? (data.capexMax / maxVal) * 100 : 0;
  const opexPercentage = maxVal > 0 ? (data.opexAnnual / maxVal) * 100 : 0;

  return (
    <div className="w-full h-64 bg-brand-light-gray p-4 rounded-lg flex flex-col justify-end">
      <div className="flex items-end h-full">
        <div className="w-1/2 px-4 flex flex-col items-center">
          <div
            className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
            style={{ height: `${capexPercentage}%` }}
          ></div>
          <p className="text-sm font-medium mt-2 text-brand-steel-dark">
            CAPEX
          </p>
        </div>
        <div className="w-1/2 px-4 flex flex-col items-center">
          <div
            className="w-full bg-green-500 rounded-t-lg transition-all duration-500"
            style={{ height: `${opexPercentage}%` }}
          ></div>
          <p className="text-sm font-medium mt-2 text-brand-steel-dark">OPEX</p>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
