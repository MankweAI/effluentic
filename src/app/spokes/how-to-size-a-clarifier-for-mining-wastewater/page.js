import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "How to Size a Clarifier for Mining Wastewater",
  description:
    "A practical guide to calculating the required surface area for a gravity clarifier based on Surface Overflow Rate (SOR).",
  videoPlaceholder: "Video: Sizing Mining Clarifiers",
  calculatorConfig: {
    title: "Clarifier Sizing Calculator",
    description:
      "Determine the footprint required based on your plant's hydraulic load.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      tss_mg_l: 6000,
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Process Flow Rate",
        unit: "m³/hr",
        min: 10,
        max: 2000,
        step: 10,
        defaultValue: 250,
        tooltip: "The volumetric flow rate of wastewater to be treated.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/clarifier-surface-overflow-rate-sor-calculator",
      title: "Clarifier SOR Calculator",
    },
    {
      href: "/spokes/thickener-design-for-mining-and-heavy-metals-industry",
      title: "Thickener Design for the Mining Industry",
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
