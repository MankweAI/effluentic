import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF Sizing & CAPEX Calculator",
  description:
    "A direct consultation on the critical design parameters for sizing a Dissolved Air Flotation system: HLR and SLR.",
  videoPlaceholder: "Video: The DAF Specialist",
  calculatorConfig: {
    title: "Instantly Size Your DAF",
    description:
      "Get the budgetary CAPEX, OPEX, and footprint data required for your pre-feasibility report.",
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
