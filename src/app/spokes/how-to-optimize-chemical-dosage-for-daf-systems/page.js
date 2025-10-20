import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "How to Optimize Chemical Dosage for DAF Systems",
  description:
    "Learn strategies for minimizing chemical consumption while maintaining performance, including jar testing and proper mixing.",
  videoPlaceholder: "Video: Optimizing DAF Chemicals",
  calculatorConfig: {
    title: "Chemical Cost Savings Estimator",
    description:
      "See how a small reduction in chemical dose can lead to significant annual savings.",
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
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The volumetric flow rate of wastewater to be treated.",
      },
      {
        name: "tss_mg_l",
        label: "Current Coagulant Dose",
        unit: "mg/L",
        min: 50,
        max: 1000,
        step: 10,
        defaultValue: 250,
        tooltip:
          "Your current average dosage of coagulant (e.g., ferric chloride).",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/chemical-treatment-options-for-breaking-oil-emulsions",
      title: "Chemical Treatment for Oil Emulsions",
    },
    {
      href: "/spokes/guide-to-flocculants-and-coagulants-for-sedimentation",
      title: "Guide to Flocculants & Coagulants",
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
