import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Breaking Stable Oil Emulsions in Wastewater",
  description:
    "An advanced technical overview on treating stable oil-in-water emulsions, covering both chemical and mechanical separation steps.",
  videoPlaceholder: "Video: The Advanced Technical Advisor",
  calculatorConfig: {
    title: "Size Your Flotation System",
    description:
      "This calculator models the mechanical separation (DAF) stage. Your chemical program is a critical upstream requirement.",
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
      href: "/spokes/how-to-treat-high-fat-wastewater",
      title: "How to Treat High-Fat Wastewater",
    },
    {
      href: "/spokes/chemical-treatment-options-for-breaking-oil-emulsions",
      title: "Chemical Treatment for Oil Emulsions",
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
