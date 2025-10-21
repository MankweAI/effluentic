import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Dairy Processing Wastewater: Challenges and Solutions",
  description:
    "Addressing the unique challenges of dairy effluent, including high milk fat content, extreme pH swings, and high soluble BOD.",
  videoPlaceholder: "Video: Dairy Wastewater Solutions",
  calculatorConfig: {
    title: "Dairy DAF & Load Estimator",
    description:
      "Size a DAF for high FOG/protein and estimate the downstream biological load.",
    // Combined focus: DAF sizing primary, biological load secondary
    hiddenFields: {
      conceptFocus: "daf_sizing", // Primary focus for calculator action
      contaminant_type: "Low-Density",
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
        min: 5,
        max: 800,
        step: 10,
        defaultValue: 100,
        tooltip: "The flow rate from your dairy.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS/Fat/Protein)",
        unit: "mg/L",
        min: 300,
        max: 5000, // Adjusted max based on research
        step: 100,
        defaultValue: 1000,
        tooltip:
          "Estimated TSS, including milk fats and proteins, influencing DAF SLR.",
      },
      {
        name: "cod_mg_l", // Added COD input
        label: "Estimated Influent COD",
        unit: "mg/L",
        min: 2000,
        max: 10000, // Range for typical dairy, not whey
        step: 100,
        defaultValue: 5000,
        tooltip:
          "Chemical Oxygen Demand (excluding high-strength whey), indicates load for biological treatment.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/guide-to-wastewater-treatment-in-the-meat-processing-industry",
      title: "Wastewater Guide: Meat Processing",
    },
    {
      href: "/spokes/key-considerations-for-food-and-beverage-wastewater-treatment",
      title: "Wastewater Guide: Food & Beverage",
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
