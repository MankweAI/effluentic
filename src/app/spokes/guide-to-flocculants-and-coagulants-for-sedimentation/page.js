import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "A Guide to Flocculants and Coagulants for Sedimentation",
  description:
    "Understand the difference between coagulants and flocculants and their role in enhancing gravity settling.",
  videoPlaceholder: "Video: Coagulation & Flocculation",
  calculatorConfig: {
    title: "Chemical Dose Estimation (Sedimentation)",
    description:
      "Estimate typical chemical dosage needs for enhancing sedimentation based on solids.",
    hiddenFields: {
      conceptFocus: "chemical_dosing", // Focus on chemicals for sedimentation
      contaminant_type: "High-Density",
      flow_rate_m3_hr: 100, // Example flow rate needed for cost estimation context
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
        name: "tss_mg_l",
        label: "Influent TSS",
        unit: "mg/L",
        min: 500,
        max: 20000, // Mining range
        step: 100,
        defaultValue: 4000, // Higher default for mining
        tooltip:
          "Initial solids concentration influencing flocculant/coagulant demand.",
      },
      // Could add water type (e.g., Process Water, Tailings) if logic becomes more complex
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/chemical-treatment-options-for-breaking-oil-emulsions",
      title: "Chemical Treatment for Oil Emulsions",
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
