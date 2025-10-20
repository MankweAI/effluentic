import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Water Management and Treatment in Mining & Beneficiation",
  description:
    "An overview of the water cycle in mining, from process water clarification and recycling to tailings management.",
  videoPlaceholder: "Video: Mining Water Management",
  calculatorConfig: {
    title: "Process Water Clarifier Sizer",
    description:
      "Calculate the size of a clarifier needed to recycle your process water.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      tss_mg_l: 6000,
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Process Water Flow Rate",
        unit: "m³/hr",
        min: 50,
        max: 10000,
        step: 50,
        defaultValue: 1500,
        tooltip: "The flow rate of water to be clarified for reuse.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/thickener-design-for-mining-and-heavy-metals-industry",
      title: "Thickener Design for the Mining Industry",
    },
    {
      href: "/spokes/south-african-effluent-discharge-regulations-for-industrial-sites",
      title: "South African Effluent Regulations",
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

