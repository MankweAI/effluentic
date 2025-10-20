"use client";
import { useEffect, useState } from "react";

const BarChart = ({ data }) => {
  const capex = data?.capexMax || 0;
  const opex = data?.opexAnnual || 0;

  const maxVal = Math.max(capex, opex) * 1.25;

  // Animate the bars by starting from 0% and then transitioning to their true value.
  const [animatedCapex, setAnimatedCapex] = useState(0);
  const [animatedOpex, setAnimatedOpex] = useState(0);

  const capexPercentage = maxVal > 0 ? (capex / maxVal) * 100 : 0;
  const opexPercentage = maxVal > 0 ? (opex / maxVal) * 100 : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCapex(capexPercentage);
      setAnimatedOpex(opexPercentage);
    }, 100); // small delay for smooth start
    return () => clearTimeout(timer);
  }, [capexPercentage, opexPercentage]);

  return (
    <div className="w-full h-64 bg-white p-4 rounded-xl shadow-md flex flex-col justify-end">
      <h3 className="text-center text-lg font-semibold text-brand-navy-dark mb-4">
        CAPEX vs OPEX
      </h3>

      <div className="flex items-end justify-around h-full">
        {/* CAPEX */}
        <div className="w-1/4 flex flex-col items-center h-full">
          <div className="relative flex flex-col justify-end h-full w-full">
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
              style={{ height: `${animatedCapex}%` }}
            ></div>
            {/* Value label above the bar */}
            <span className="absolute bottom-full mb-2 text-xs font-semibold text-blue-700">
              {capex.toLocaleString()} ZAR
            </span>
          </div>
          <p className="text-sm font-medium mt-3 text-brand-steel-dark">
            CAPEX
          </p>
        </div>

        {/* OPEX */}
        <div className="w-1/4 flex flex-col items-center h-full">
          <div className="relative flex flex-col justify-end h-full w-full">
            <div
              className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-1000 ease-out"
              style={{ height: `${animatedOpex}%` }}
            ></div>
            <span className="absolute bottom-full mb-2 text-xs font-semibold text-green-700">
              {opex.toLocaleString()} ZAR
            </span>
          </div>
          <p className="text-sm font-medium mt-3 text-brand-steel-dark">OPEX</p>
        </div>
      </div>

      {/* Optional legend or summary */}
      <div className="mt-4 flex justify-center space-x-4 text-xs text-brand-steel-dark">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span>CAPEX</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>OPEX</span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
