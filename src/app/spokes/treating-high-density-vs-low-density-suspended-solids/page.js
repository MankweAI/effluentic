import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Treating High-Density vs. Low-Density Suspended Solids",
  description:
    "Understand the fundamental difference between flotation and sedimentation for effective TSS removal.",
  videoPlaceholder: "Video: Flotation vs. Sedimentation",
  calculatorConfig: {
    title: "Primary Treatment Sizing",
    description:
      "Select your primary contaminant type, then input parameters to size the appropriate technology (DAF or Clarifier).",
    // Focus is comparison, but calculations are specific
    hiddenFields: {
      conceptFocus: "daf_clarifier_comparison",
      // industry: "food_beverage", // Industry will be set based on contaminant type below
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry (Optional Context)",
        type: "select",
        // Include options from both categories + a general option
        options: [
          { value: "general_industrial", label: "General Industrial" }, // Added default
          { value: "food_beverage", label: "Food & Beverage (General)" },
          { value: "meat_processing", label: "Meat Processing" },
          { value: "dairy_processing", label: "Dairy Processing" },
          { value: "mining_beneficiation", label: "Mining & Beneficiation" },
          { value: "heavy_industry_metals", label: "Heavy Industry / Metals" },
          {
            value: "aggregate_sand_washing",
            label: "Aggregate / Sand Washing",
          },
          { value: "other", label: "Other" },
        ],
        defaultValue: "general_industrial", // Default to general
        tooltip:
          "Select your industry for potentially more tailored results or limits.",
      },
      {
        name: "contaminant_type",
        label: "Primary Contaminant Type",
        type: "select",
        options: ["Low-Density", "High-Density"],
        defaultValue: "Low-Density",
        tooltip:
          "Low-Density (FOG, organics) favors DAF. High-Density (grit, minerals) favors Clarifiers.",
      },
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 2000, // Wider range to cover both types
        step: 10,
        defaultValue: 100,
        tooltip: "The volumetric flow rate of wastewater to be treated.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS)",
        unit: "mg/L",
        min: 100,
        max: 20000, // Wider range
        step: 100,
        defaultValue: 2500,
        tooltip:
          "The concentration of suspended solids (influences SLR for DAF). Ignored if High-Density selected (SOR governs Clarifier).",
      },
      // Note: Industry is implicitly set by contaminant_type in the SpokePage logic/API,
      // but could be added as a conditional select field here for more control.
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
      href: "/spokes/using-a-daf-system-for-low-density-solids-removal",
      title: "Using a DAF System for Low-Density Solids",
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
