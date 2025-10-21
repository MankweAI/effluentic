import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Key Considerations for Food & Beverage Wastewater Treatment",
  description:
    "A general guide for the F&B industry, covering common contaminants and the importance of primary treatment.",
  videoPlaceholder: "Video: Food & Beverage Wastewater",
  calculatorConfig: {
    title: "General F&B DAF & Load Estimator",
    description:
      "Get a baseline DAF size/cost and estimate the potential downstream biological load.",
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
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The volumetric flow rate of wastewater.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS/FOG)",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip: "Total Suspended Solids - influencing DAF SLR.",
      },
      {
        name: "cod_mg_l", // Added COD input
        label: "Estimated Influent COD",
        unit: "mg/L",
        min: 1500,
        max: 12000,
        step: 100,
        defaultValue: 5000,
        tooltip:
          "Chemical Oxygen Demand, indicates organic strength for potential biological treatment.",
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
      href: "/spokes/dairy-processing-wastewater-challenges-and-solutions",
      title: "Wastewater Guide: Dairy Processing",
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
