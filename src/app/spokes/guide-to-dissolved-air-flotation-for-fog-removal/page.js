import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "A Guide to Dissolved Air Flotation (DAF) for FOG Removal",
  description:
    "Learn the principles of DAF technology and why it is the superior method for removing fats, oils, and grease from industrial effluent.",
  videoPlaceholder: "Video: DAF for FOG Explained",
  calculatorConfig: {
    title: "DAF Sizing for FOG",
    description:
      "Enter your parameters to get a preliminary size and cost estimate for a DAF system.",
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
        tooltip: "Total Suspended Solids, including FOG content.",
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
      href: "/spokes/daf-vs-oil-water-separators-for-fog",
      title: "DAF vs. Oil-Water Separators for FOG",
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
