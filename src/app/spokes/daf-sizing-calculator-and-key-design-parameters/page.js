import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF Sizing & Key Design Parameters", // Title adjusted slightly
  description:
    "A direct consultation on the critical design parameters for sizing a Dissolved Air Flotation system: HLR and SLR.",
  videoPlaceholder: "Video: The DAF Specialist",
  calculatorConfig: {
    title: "Instantly Size Your DAF",
    description:
      "Get the budgetary CAPEX, OPEX, and footprint data required for your pre-feasibility report.",
    hiddenFields: {
      conceptFocus: "daf_sizing", // Explicit DAF sizing focus
      contaminant_type: "Low-Density", // Assumed context for DAF focus
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
        tooltip: "The volumetric flow rate (determines area via HLR).",
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
          "Total Suspended Solids - including FOG (determines area via SLR).",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/how-does-a-dissolved-air-flotation-system-work",
      title: "How Does a DAF System Work?",
    },
    {
      href: "/spokes/daf-system-costs-capex-and-opex-breakdown",
      title: "DAF System Costs: CAPEX & OPEX",
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
