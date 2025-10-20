import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Lamella Clarifiers vs. Conventional Clarifiers",
  description:
    "A comparison of high-rate, inclined plate settlers and traditional gravity clarifiers, looking at footprint, cost, and performance.",
  videoPlaceholder: "Video: Lamella vs. Conventional Clarifiers",
  calculatorConfig: {
    title: "Footprint Comparison Calculator",
    description:
      "See the potential space savings of a lamella clarifier for your flow rate.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      tss_mg_l: 5000,
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Process Flow Rate",
        unit: "m³/hr",
        min: 10,
        max: 2000,
        step: 10,
        defaultValue: 150,
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
      href: "/spokes/the-pros-and-cons-of-lamella-clarifier-designs",
      title: "Pros & Cons of Lamella Clarifiers",
    },
    {
      href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
      title: "How to Size a Clarifier for Mining Wastewater",
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
