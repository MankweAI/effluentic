import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Treating High-Density vs. Low-Density Suspended Solids",
  description:
    "Understand the fundamental difference between flotation and sedimentation for effective TSS removal.",
  videoPlaceholder: "Video: Flotation vs. Sedimentation",
  calculatorConfig: {
    title: "Diagnostic Calculator",
    description:
      "Select your primary contaminant to determine the best treatment path.",
    hiddenFields: {
      industry: "food_beverage",
    },
    fields: [
      {
        name: "contaminant_type",
        label: "Primary Contaminant Type",
        type: "select",
        options: ["Low-Density", "High-Density"],
        defaultValue: "Low-Density",
      },
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 2000,
        step: 10,
        defaultValue: 100,
        tooltip: "The volumetric flow rate of wastewater to be treated.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS)",
        unit: "mg/L",
        min: 100,
        max: 20000,
        step: 100,
        defaultValue: 2500,
        tooltip: "The concentration of suspended solids.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
      title: "How to Size a Clarifier for Mining Wastewater",
    },
    {
      href: "/spokes/using-a-daf-system-for-low-density-solids-removal",
      title: "Using a DAF System for Low-Density Solids",
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
