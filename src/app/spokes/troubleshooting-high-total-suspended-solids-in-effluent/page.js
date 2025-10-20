import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Troubleshooting High Total Suspended Solids (TSS) in Effluent",
  description:
    "A diagnostic guide to common causes of high TSS, from chemical underdosing to hydraulic overloading.",
  videoPlaceholder: "Video: Fixing High TSS",
  calculatorConfig: {
    title: "TSS Load Calculator",
    description:
      "Calculate your daily solids load to understand the burden on your treatment system.",
    hiddenFields: {
      industry: "food_beverage",
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 1000,
        step: 5,
        defaultValue: 100,
        tooltip: "Your average process flow rate.",
      },
      {
        name: "tss_mg_l",
        label: "Effluent TSS Concentration",
        unit: "mg/L",
        min: 50,
        max: 5000,
        step: 50,
        defaultValue: 500,
        tooltip: "The TSS concentration measured in your final effluent.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/common-operational-problems-with-wastewater-clarifiers",
      title: "Common Problems with Clarifiers",
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
