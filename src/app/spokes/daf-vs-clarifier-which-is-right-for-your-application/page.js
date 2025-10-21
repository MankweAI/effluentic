import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF vs. Clarifier: Which is Right for Your Application?",
  description:
    "A direct comparison to help you choose between flotation and sedimentation for primary wastewater treatment.",
  videoPlaceholder: "Video: DAF vs. Clarifier",
  calculatorConfig: {
    title: "Technology Recommendation Tool",
    description:
      "Select your primary contaminant type to get a preliminary technology recommendation and sizing.",
    hiddenFields: {
      conceptFocus: "daf_clarifier_comparison", // Focus is the comparison
      flow_rate_m3_hr: 100, // Using defaults as contaminant type is key input
      tss_mg_l: 1500, // Using defaults as contaminant type is key input
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
      // Add Flow and TSS back if more granular comparison needed, but contaminant type is primary decision factor
      /*
       {
         name: "flow_rate_m3_hr", label: "Flow Rate", unit: "m³/hr",
         min: 1, max: 2000, step: 10, defaultValue: 100, tooltip: "Confirm flow rate."
       },
       {
         name: "tss_mg_l", label: "Suspended Solids (TSS)", unit: "mg/L",
         min: 100, max: 20000, step: 100, defaultValue: 1500, tooltip: "Confirm TSS."
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
      href: "/spokes/treating-high-density-vs-low-density-suspended-solids",
      title: "Treating High-Density vs. Low-Density Solids",
    },
    {
      href: "/spokes/how-does-a-dissolved-air-flotation-system-work",
      title: "How Does a DAF System Work?",
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
