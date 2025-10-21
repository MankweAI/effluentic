import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Lamella Clarifiers vs. Conventional Clarifiers",
  description:
    "A comparison of high-rate, inclined plate settlers and traditional gravity clarifiers, looking at footprint, cost, and performance.",
  videoPlaceholder: "Video: Lamella vs. Conventional Clarifiers",
  calculatorConfig: {
    title: "Clarifier Sizing (Footprint Comparison)",
    description:
      "Calculate the required surface area for a conventional clarifier based on SOR. Lamella units typically offer significant footprint reduction.",
    // Focus is clarifier sizing, commentary can discuss lamella benefits
    hiddenFields: {
      conceptFocus: "clarifier_sizing",
      contaminant_type: "High-Density",
      // tss_mg_l: 5000, // Not needed for SOR calc
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
        max: 2000,
        step: 10,
        defaultValue: 150,
        tooltip:
          "The volumetric flow rate determines conventional clarifier area via SOR.",
      },
      // Could add a conceptual output in the report comparing footprint savings
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/the-pros-and-cons-of-lamella-clarifier-designs",
      title: "Pros & Cons of Lamella Clarifiers",
    },
    {
      href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
      title: "How to Size a Clarifier for Mining Wastewater",
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
