import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Guide to Wastewater Treatment in the Meat Processing Industry",
  description:
    "A comprehensive overview of treating abattoir and rendering plant effluent, focusing on high FOG, COD, and nutrient loads.",
  videoPlaceholder: "Video: Meat Processing Wastewater",
  calculatorConfig: {
    title: "Abattoir DAF Sizer",
    description:
      "Get a preliminary size and cost for a DAF system designed for meat processing effluent.",
    hiddenFields: {
      industry: "meat_processing",
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 5,
        max: 600,
        step: 5,
        defaultValue: 80,
        tooltip: "The flow rate from your abattoir or processing plant.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS)",
        unit: "mg/L",
        min: 1000,
        max: 8000,
        step: 100,
        defaultValue: 2500,
        tooltip: "The estimated TSS, including fats, proteins, and blood.",
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
