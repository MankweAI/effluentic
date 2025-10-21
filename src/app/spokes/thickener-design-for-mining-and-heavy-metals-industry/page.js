import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Thickener Design for the Mining & Heavy Metals Industry",
  description:
    "An overview of high-torque, high-rate thickeners used for dewatering tailings and process water recovery.",
  videoPlaceholder: "Video: Mining Thickener Design",
  calculatorConfig: {
    title: "Thickener Area Calculator (based on SOR)",
    description:
      "Estimate the required thickener diameter based on your process flow rate (SOR method).",
    // Thickener sizing is complex; using SOR method as a proxy consistent with clarifier calc. Solids flux method is more accurate but needs more inputs.
    hiddenFields: {
      conceptFocus: "clarifier_sizing", // Using clarifier logic as thickeners are specialized clarifiers
      contaminant_type: "High-Density",
      // tss_mg_l input is not directly used if sizing by SOR based on flow rate
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
        name: "flow_rate_m3_hr", // Primary input for SOR-based sizing
        label: "Process Flow Rate (Slurry)",
        unit: "m³/hr",
        min: 50,
        max: 10000, // Range for mining
        step: 50,
        defaultValue: 1000,
        tooltip:
          "The volumetric flow rate of the slurry feed to the thickener.",
      },
      // Original spoke used Solids Throughput (t/hr) which requires different calc logic (Unit Area).
      // Sticking to SOR method for consistency with current engine.
      /*
       {
         name: "solids_throughput_t_hr", // Requires different calculation logic not yet implemented
         label: "Solids Throughput",
         unit: "t/hr",
         min: 1, max: 500, step: 1, defaultValue: 50,
         tooltip: "The mass of dry solids processed per hour (used for Unit Area sizing method)."
       },
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
      href: "/spokes/water-management-and-treatment-in-mining-and-beneficiation",
      title: "Water Management in Mining",
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
