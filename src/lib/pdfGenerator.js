import jsPDF from "jspdf";
import "jspdf-autotable";

const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) return "N/A";
  return `R ${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 0, // Changed to 0 for consistency with web
    maximumFractionDigits: 0,
  })}`;
};

const formatNumber = (value, decimals = 2) => {
  if (typeof value !== "number" || isNaN(value)) return "N/A";
  return value.toLocaleString("en-ZA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Function to add a section with error handling for missing data
const addSection = (
  doc,
  title,
  dataPairs,
  startY,
  headColor = [37, 99, 235]
) => {
  if (!dataPairs || dataPairs.length === 0) return startY; // Skip if no data

  // Filter out pairs with undefined/null values before rendering
  const validDataPairs = dataPairs.filter(
    (pair) => pair[1] !== undefined && pair[1] !== null && pair[1] !== "N/A"
  );
  if (validDataPairs.length === 0) return startY; // Skip if no valid data

  doc.autoTable({
    startY: startY,
    head: [[title]],
    body: validDataPairs.map((pair) => [`${pair[0]}:`, pair[1]]), // Format as Key: Value
    theme: "grid",
    headStyles: { fillColor: headColor },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60 },
      1: { cellWidth: "auto" },
    }, // Adjust widths as needed
  });
  return doc.lastAutoTable.finalY + 10; // Return Y position for next section
};

export function generatePdf(reportData, conceptFocus) {
  // Added conceptFocus
  const doc = new jsPDF();
  let currentY = 40; // Start position for tables

  // --- Header ---
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text("EffluentLogic Pre-Feasibility Report", 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Report ID: ${reportData.id?.substring(0, 8) || "N/A"}`, 14, 30);
  doc.text(`Focus: ${conceptFocus?.replace(/_/g, " ") || "General"}`, 14, 34);

  // --- Input Parameters ---
  const inputParams = reportData.input_params || {};
  const inputDataPairs = [
    ["Industry", reportData.industry || "N/A"],
    // Add other inputs dynamically
    ...Object.entries(inputParams)
      .filter(([key]) => key !== "industry") // Avoid duplicating industry
      .map(([key, value]) => {
        const label = key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        const unit = key.includes("m3_hr")
          ? " m³/hr"
          : key.includes("mg_l")
          ? " mg/L"
          : "";
        return [label, `${value ?? "N/A"}${unit}`];
      }),
  ];
  currentY = addSection(
    doc,
    "Input Parameters",
    inputDataPairs,
    currentY,
    [59, 130, 246]
  ); // Blue

  // --- Concept-Specific Primary Results ---
  const calculatedData = reportData.calculated_data || {};

  if (conceptFocus === "chemical_dosing" && calculatedData.chemicalDosage) {
    const chemDataPairs = [
      [
        "Estimated Dose",
        `${formatNumber(calculatedData.chemicalDosage.dose_mg_l, 1)} mg/L`,
      ],
      [
        "Est. Daily Usage",
        `${formatNumber(calculatedData.chemicalDosage.daily_kg, 2)} kg/day`,
      ],
      [
        "Est. Annual Cost",
        formatCurrency(calculatedData.chemicalDosage.annual_cost_zar),
      ],
    ];
    currentY = addSection(
      doc,
      "Chemical Dosage Estimate",
      chemDataPairs,
      currentY,
      [22, 163, 74]
    ); // Green
  } else if (
    conceptFocus === "regulatory_check" &&
    calculatedData.complianceStatus
  ) {
    const complianceDataPairs = Object.entries(
      calculatedData.complianceStatus
    ).map(([key, status]) => {
      const label = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      const limitText = status.limit
        ? `Limit: ${status.limit}`
        : `Limit: ${status.limit_min}-${status.limit_max}`;
      const valueText = `${status.value ?? "N/A"} (${limitText}) - ${
        status.compliant ? "Compliant" : "Non-Compliant"
      }`;
      return [label, valueText];
    });
    currentY = addSection(
      doc,
      "Regulatory Compliance Check",
      complianceDataPairs,
      currentY,
      [245, 158, 11]
    ); // Amber
  } else if (
    conceptFocus === "biological_load_estimation" &&
    calculatedData.biologicalLoad
  ) {
    const bioDataPairs = [
      [
        "Est. Daily COD Load",
        `${formatNumber(calculatedData.biologicalLoad.daily_cod_kg, 1)} kg/day`,
      ],
      [
        "Est. Daily BOD Load",
        `${formatNumber(
          calculatedData.biologicalLoad.estimated_bod_kg,
          1
        )} kg/day`,
      ],
    ];
    currentY = addSection(
      doc,
      "Estimated Biological Load",
      bioDataPairs,
      currentY,
      [107, 114, 128]
    ); // Gray
  } else if (
    conceptFocus === "troubleshooting" &&
    calculatedData.troubleshootingTips
  ) {
    // Troubleshooting might be better as text block
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text("Troubleshooting Suggestions", 14, currentY);
    currentY += 7;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    calculatedData.troubleshootingTips.forEach((tip) => {
      const splitTip = doc.splitTextToSize(`- ${tip}`, 180);
      doc.text(splitTip, 14, currentY);
      currentY += splitTip.length * 4; // Adjust line height
    });
    currentY += 5; // Add padding after list
  }

  // --- DAF/Clarifier Sizing & Budget (Show if calculated) ---
  let recommendedTech = "DAF"; // Recalculate default logic if needed
  if (
    reportData.contaminant_type === "High-Density" ||
    reportData.industry === "mining_beneficiation"
  ) {
    recommendedTech = "Clarifier";
  } else if (
    reportData.contaminant_type === "Low-Density" ||
    ["food_beverage", "meat_processing", "dairy_processing"].includes(
      reportData.industry
    )
  ) {
    recommendedTech = "DAF";
  }

  const dafSpecs = calculatedData.dafSpecs;
  const clarifierSpecs = calculatedData.clarifierSpecs;
  const primarySpecs = recommendedTech === "DAF" ? dafSpecs : clarifierSpecs;
  const secondarySpecs = recommendedTech === "DAF" ? clarifierSpecs : dafSpecs;
  const secondaryTech = recommendedTech === "DAF" ? "Clarifier" : "DAF";

  if (primarySpecs && primarySpecs.surface_area_m2 > 0) {
    const techDataPairs = [
      [
        "Required Surface Area",
        `${formatNumber(primarySpecs.surface_area_m2)} m²`,
      ],
      [
        "Budget CAPEX Range",
        `${formatCurrency(primarySpecs.capex_min_zar)} - ${formatCurrency(
          primarySpecs.capex_max_zar
        )}`,
      ],
      ["Estimated Annual OPEX", formatCurrency(primarySpecs.opex_annual_zar)],
    ];
    // Calculate Payback and Cost/m3 using primary specs
    const paybackPeriod =
      primarySpecs.opex_annual_zar > 0
        ? `~${(
            primarySpecs.capex_max_zar / primarySpecs.opex_annual_zar
          ).toFixed(1)} Years`
        : "N/A";
    const costPerM3 =
      reportData.flow_rate_m3_hr > 0 && primarySpecs.opex_annual_zar > 0
        ? `R ${(
            primarySpecs.opex_annual_zar /
            (reportData.flow_rate_m3_hr * 24 * 365)
          ).toFixed(2)}`
        : "N/A";
    techDataPairs.push(["Simple Payback Period", paybackPeriod]);
    techDataPairs.push(["Est. Cost per m³", costPerM3]);

    currentY = addSection(
      doc,
      `Primary Recommendation: ${recommendedTech}`,
      techDataPairs,
      currentY,
      [22, 163, 74]
    ); // Green
  }

  // Optionally show alternative if it exists and wasn't the primary focus
  if (
    secondarySpecs &&
    secondarySpecs.surface_area_m2 > 0 &&
    conceptFocus !== `${secondaryTech.toLowerCase()}_sizing`
  ) {
    const altTechDataPairs = [
      [
        "Required Surface Area",
        `${formatNumber(secondarySpecs.surface_area_m2)} m²`,
      ],
      [
        "Budget CAPEX Range",
        `${formatCurrency(secondarySpecs.capex_min_zar)} - ${formatCurrency(
          secondarySpecs.capex_max_zar
        )}`,
      ],
      ["Estimated Annual OPEX", formatCurrency(secondarySpecs.opex_annual_zar)],
    ];
    currentY = addSection(
      doc,
      `Alternative Technology: ${secondaryTech}`,
      altTechDataPairs,
      currentY,
      [107, 114, 128]
    ); // Gray
  }

  // --- Commentary ---
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text("Commentary", 14, currentY);
  currentY += 7;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  // Make commentary dynamic based on focus
  let commentaryText = `This report provides a preliminary assessment based on the '${
    conceptFocus?.replace(/_/g, " ") || "General"
  }' focus and the inputs provided. `;
  if (primarySpecs && primarySpecs.surface_area_m2 > 0) {
    commentaryText += `The sizing and budgetary costs (${formatCurrency(
      primarySpecs.capex_min_zar
    )} - ${formatCurrency(
      primarySpecs.capex_max_zar
    )} CAPEX for ${recommendedTech}) are Class 4 estimates (+/- 30-50%) based on industry benchmarks and typical design parameters. `;
  }
  if (calculatedData.chemicalDosage) {
    commentaryText += `Chemical dosage estimates (${formatNumber(
      calculatedData.chemicalDosage.dose_mg_l,
      1
    )} mg/L) are indicative; jar testing is essential for accurate determination. `;
  }
  if (calculatedData.complianceStatus) {
    commentaryText += `Regulatory limits shown are typical examples (e.g., City of Cape Town for municipal); local by-laws must be confirmed. `;
  }
  commentaryText +=
    "A detailed engineering review, considering site specifics and full wastewater characterization, is required for definitive design and costing.";

  const splitText = doc.splitTextToSize(commentaryText, 180); // Ensure text fits width
  doc.text(splitText, 14, currentY);

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    // Position footer elements at the bottom
    const pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 35,
      pageHeight - 10
    );
    doc.text(
      `Generated: ${new Date().toLocaleDateString("en-ZA")}`,
      14,
      pageHeight - 10
    );
    doc.text(
      `EffluentLogic Report - ID: ${reportData.id?.substring(0, 8) || "N/A"}`,
      14,
      pageHeight - 15
    );
  }

  doc.save(
    `EffluentLogic_Report_${reportData.id?.substring(0, 8) || "NoID"}.pdf`
  );
}
