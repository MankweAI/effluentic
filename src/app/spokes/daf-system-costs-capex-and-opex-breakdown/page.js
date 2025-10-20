import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF System Costs: A CAPEX and OPEX Breakdown",
  description:
    "Understand the costs associated with a DAF system, from initial investment to ongoing operational expenses.",
  videoPlaceholder: "Video: DAF Cost Analysis",
  calculatorConfig: {
    title: "Budgetary DAF Cost Calculator",
    description:
      "Generate a Class 4 cost estimate for a DAF system based on your flow and solids load.",
    hiddenFields: {
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry",
        type: "select",
        options: ["food_beverage", "meat_processing", "dairy_processing"],
        defaultValue: "food_beverage",
      },
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The volumetric flow rate of wastewater to be treated.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS)",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip:
          "Total Suspended Solids - the concentration of solid particles in the wastewater.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/daf-sizing-calculator-and-key-design-parameters",
      title: "DAF Sizing Calculator & Design Parameters",
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
