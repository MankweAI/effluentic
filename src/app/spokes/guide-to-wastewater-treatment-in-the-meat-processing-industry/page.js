import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Guide to Wastewater Treatment in the Meat Processing Industry",
  description:
    "A comprehensive overview of treating abattoir and rendering plant effluent, focusing on high FOG, COD, and nutrient loads.",
  videoPlaceholder: "Video: Meat Processing Wastewater",
  calculatorConfig: {
    title: "Abattoir DAF & Load Estimator",
    description:
      "Get a preliminary DAF size/cost and estimate the downstream biological load (COD/BOD).",
    // Combined focus: DAF sizing primary, biological load secondary
    hiddenFields: {
      conceptFocus: "daf_sizing", // Primary focus for the calculator action
      contaminant_type: "Low-Density", // Actually mixed, but DAF is primary physical step
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
        max: 600,
        step: 5,
        defaultValue: 80,
        tooltip: "Flow rate from your abattoir or processing plant.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS/FOG/Protein)",
        unit: "mg/L",
        min: 1000,
        max: 8000,
        step: 100,
        defaultValue: 2500,
        tooltip: "Estimated influent solids load influencing DAF SLR.",
      },
      {
        name: "cod_mg_l", // Added COD input for biological load estimate
        label: "Estimated Influent COD",
        unit: "mg/L",
        min: 2500,
        max: 20000,
        step: 100,
        defaultValue: 8000,
        tooltip:
          "Chemical Oxygen Demand, indicates organic strength for biological treatment.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/dairy-processing-wastewater-challenges-and-solutions",
      title: "Wastewater Guide: Dairy Processing",
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
