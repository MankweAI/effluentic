import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "A Guide to Flocculants and Coagulants for Sedimentation",
  description:
    "Understand the difference between coagulants and flocculants and their role in enhancing gravity settling.",
  videoPlaceholder: "Video: Coagulation & Flocculation",
  calculatorConfig: {
    title: "Jar Test Simulator",
    description:
      "A conceptual tool to understand how chemical dosage impacts settling.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      flow_rate_m3_hr: 100,
    },
    fields: [
      {
        name: "tss_mg_l",
        label: "Initial TSS",
        unit: "mg/L",
        min: 500,
        max: 10000,
        step: 100,
        defaultValue: 2000,
        tooltip: "Initial solids concentration.",
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
