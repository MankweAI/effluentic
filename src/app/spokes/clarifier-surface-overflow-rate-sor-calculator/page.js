import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Clarifier Surface Overflow Rate (SOR) Calculator",
  description:
    "Calculate the required surface area for your gravity clarifier based on the SOR design parameter.",
  videoPlaceholder: "Video: Clarifier SOR Explained",
  calculatorConfig: {
    title: "Calculate Required Clarifier Area",
    description:
      "Determine the footprint required based on your plant's hydraulic load and target SOR.",
    hiddenFields: {
      conceptFocus: "clarifier_sizing", // Focus on clarifier sizing via SOR
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
        defaultValue: 250,
        tooltip: "The volumetric flow rate to be treated.",
      },
      // Optionally add SOR as an input for advanced users, or keep it hidden based on industry lookup
      /*
       {
         name: "target_sor_m3_m2_day", label: "Target SOR", unit: "m³/m²/day",
         min: 5, max: 50, step: 1, defaultValue: 20, tooltip: "Design Surface Overflow Rate based on settling tests or typical values."
       }
       */
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
      title: "How to Size a Clarifier for Mining Wastewater",
    },
    {
      href: "/spokes/common-operational-problems-with-wastewater-clarifiers",
      title: "Common Problems with Clarifiers",
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
