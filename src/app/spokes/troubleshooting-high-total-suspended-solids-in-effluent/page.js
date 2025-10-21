import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Troubleshooting High Total Suspended Solids (TSS) in Effluent",
  description:
    "A diagnostic guide to common causes of high TSS, from chemical underdosing to hydraulic overloading.",
  videoPlaceholder: "Video: Fixing High TSS",
  calculatorConfig: {
    title: "Troubleshooting Assistant",
    description:
      "Select your primary treatment unit to get relevant troubleshooting tips in the report.",
    hiddenFields: {
      conceptFocus: "troubleshooting", // Focus on troubleshooting
      problem_type: "high_tss", // Define the problem for the backend
      // Provide default industry/flow/tss for context if troubleshooting tips depend on it
      flow_rate_m3_hr: 100,
      tss_mg_l: 500, // Example effluent TSS
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
        name: "technology_context", // Input to specify the equipment
        label: "Primary Treatment Unit",
        type: "select",
        options: [
          { value: "daf", label: "DAF System" },
          { value: "clarifier", label: "Clarifier / Thickener" },
          { value: "other", label: "Other / Unsure" },
        ],
        defaultValue: "daf",
        tooltip: "Select the equipment experiencing high TSS in its effluent.",
      },
      // Could add fields for observed symptoms if logic gets complex
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/common-operational-problems-with-wastewater-clarifiers",
      title: "Common Problems with Clarifiers",
    },
    {
      href: "/spokes/how-to-optimize-chemical-dosage-for-daf-systems",
      title: "How to Optimize Chemical Dosage for DAF",
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
