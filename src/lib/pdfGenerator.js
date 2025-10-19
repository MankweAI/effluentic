import jsPDF from "jspdf";
import "jspdf-autotable";

const formatCurrency = (value) => {
  if (typeof value !== "number") return "N/A";
  return `R ${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function generatePdf(reportData) {
  const doc = new jsPDF();
  const recommendedTech =
    reportData.contaminant_type === "Low-Density" ? "DAF" : "Clarifier";
  const recommendedSpecs = {
    surfaceArea:
      recommendedTech === "DAF"
        ? reportData.daf_surface_area_m2
        : reportData.clarifier_surface_area_m2,
    capexMin:
      recommendedTech === "DAF"
        ? reportData.daf_capex_min_zar
        : reportData.clarifier_capex_min_zar,
    capexMax:
      recommendedTech === "DAF"
        ? reportData.daf_capex_max_zar
        : reportData.clarifier_capex_max_zar,
    opexAnnual:
      recommendedTech === "DAF"
        ? reportData.daf_opex_annual_zar
        : reportData.clarifier_opex_annual_zar,
  };

  // Header
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text("EffluentLogic Pre-Feasibility Report", 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Report ID: ${reportData.id}`, 14, 30);

  // Input Parameters
  doc.autoTable({
    startY: 40,
    head: [["Input Parameters"]],
    body: [
      [{ content: `Industry: ${reportData.industry}` }],
      [{ content: `Flow Rate: ${reportData.flow_rate_m3_hr} m³/hr` }],
      [{ content: `TSS: ${reportData.tss_mg_l} mg/L` }],
      [{ content: `Contaminant Type: ${reportData.contaminant_type}` }],
    ],
    theme: "grid",
    headStyles: { fillColor: [22, 163, 74] },
  });

  // Recommendations & Budget
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [[`Primary Recommendation: ${recommendedTech}`]],
    body: [
      [`Required Surface Area: ${recommendedSpecs.surfaceArea} m²`],
      [
        `Budget CAPEX Range: ${formatCurrency(
          recommendedSpecs.capexMin
        )} - ${formatCurrency(recommendedSpecs.capexMax)}`,
      ],
      [`Estimated Annual OPEX: ${formatCurrency(recommendedSpecs.opexAnnual)}`],
    ],
    theme: "grid",
    headStyles: { fillColor: [37, 99, 235] },
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 25,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      `Generated: ${new Date().toLocaleDateString("en-ZA")}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save(`EffluentLogic_Report_${reportData.id.substring(0, 8)}.pdf`);
}

