import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "How to Optimize Chemical Dosage for DAF Systems",
  description:
    "Learn strategies for minimizing chemical consumption while maintaining performance, including jar testing and proper mixing.",
  videoPlaceholder: "Video: Optimizing DAF Chemicals",
  calculatorConfig: {
    title: "Chemical Cost Savings Estimator",
    description:
      "Estimate the potential annual savings from reducing chemical dosage in your DAF system.",
    hiddenFields: {
      conceptFocus: "chemical_dosing", // Focus on chemical optimization/cost
      industry: "food_beverage", // Provide context
      contaminant_type: "Low-Density", // Assumed context for DAF
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry",
        type: "select",
        // Options relevant to Low-Density / DAF applications
        options: [
          { value: "food_beverage", label: "Food & Beverage (General)" },
          { value: "meat_processing", label: "Meat Processing" },
          { value: "dairy_processing", label: "Dairy Processing" },
          // Add other relevant low-density industries if applicable
        ],
        defaultValue: "food_beverage",
        tooltip: "Select the industry that best matches your application.",
      },
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The volumetric flow rate being treated.",
      },
      {
        name: "current_coagulant_dose", // Changed name for clarity
        label: "Current Coagulant Dose",
        unit: "mg/L",
        min: 10, // Lowered min
        max: 1000,
        step: 10,
        defaultValue: 250,
        tooltip:
          "Your current average dosage of primary coagulant (e.g., ferric chloride, PAC).",
      },
      {
        name: "potential_reduction_percent", // New field for savings calc
        label: "Potential Dose Reduction",
        unit: "%",
        min: 0,
        max: 50, // Realistic max reduction
        step: 1,
        defaultValue: 10, // Example 10% reduction
        tooltip:
          "Estimate percentage reduction achievable through optimization (e.g., via jar tests).",
      },
      // Need TSS to estimate baseline dose cost, using a hidden default or adding input
      {
        name: "tss_mg_l",
        label: "Typical TSS/FOG",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip: "Needed to estimate base chemical cost.",
      },
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
      href: "/spokes/guide-to-flocculants-and-coagulants-for-sedimentation",
      title: "Guide to Flocculants & Coagulants",
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
