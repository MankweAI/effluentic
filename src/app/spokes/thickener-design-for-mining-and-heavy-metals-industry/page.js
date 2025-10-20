import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Thickener Design for the Mining & Heavy Metals Industry",
  description:
    "An overview of high-torque, high-rate thickeners used for dewatering tailings and process water recovery.",
  videoPlaceholder: "Video: Mining Thickener Design",
  calculatorConfig: {
    title: "Thickener Area Calculator",
    description:
      "Estimate the required thickener diameter based on your solids throughput.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      flow_rate_m3_hr: 1000,
    },
    fields: [
      {
        name: "tss_mg_l",
        label: "Solids Throughput",
        unit: "t/hr",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The mass of dry solids to be processed per hour.",
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
      href: "/spokes/water-management-and-treatment-in-mining-and-beneficiation",
      title: "Water Management in Mining",
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
