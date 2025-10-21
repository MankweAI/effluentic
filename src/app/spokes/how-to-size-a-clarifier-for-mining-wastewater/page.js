import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "How to Size a Clarifier for Mining Wastewater",
  description:
    "A practical guide to calculating the required surface area for a gravity clarifier based on Surface Overflow Rate (SOR).",
  videoPlaceholder: "Video: Sizing Mining Clarifiers",
  calculatorConfig: {
    title: "Clarifier Sizing Calculator (Mining)",
    description:
      "Determine the footprint required based on your plant's hydraulic load (SOR).",
    hiddenFields: {
      conceptFocus: "clarifier_sizing", // Focus on clarifier sizing
      contaminant_type: "High-Density",
      // tss_mg_l: 6000, // TSS not directly used for SOR calc, can omit hidden
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry",
        type: "select",
        // Options relevant to High-Density / Clarifier applications
        options: [
          { value: "mining_beneficiation", label: "Mining & Beneficiation" },
          // Add other relevant high-density industries if applicable (e.g., Heavy Industry, Power Generation Ash)
          { value: "heavy_industry_metals", label: "Heavy Industry / Metals" },
          {
            value: "aggregate_sand_washing",
            label: "Aggregate / Sand Washing",
          },
        ],
        defaultValue: "mining_beneficiation",
        tooltip: "Select the industry that best matches your application.",
      },
      {
        name: "flow_rate_m3_hr",
        label: "Process Flow Rate",
        unit: "m³/hr",
        min: 10,
        max: 2000, // Adjusted max based on original spoke
        step: 10,
        defaultValue: 250,
        tooltip: "The volumetric flow rate dictates area via SOR.",
      },
      // Removed TSS input as SOR is the primary driver here
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/clarifier-surface-overflow-rate-sor-calculator",
      title: "Clarifier SOR Calculator",
    },
    {
      href: "/spokes/thickener-design-for-mining-and-heavy-metals-industry",
      title: "Thickener Design for the Mining Industry",
    },
  ],
};

export default function Page() {
  return (
    <SpokePage
      title={pageConfig.title}
      description={pageConfig.description}
      videoPlaceholder={pageConfig.videoPlaceholder}
      calculatorConfig={pageConfig.calculatorConfig}
      hubLink={pageConfig.hubLink}
      relatedSpokes={pageConfig.relatedSpokes}
    />
  );
}
