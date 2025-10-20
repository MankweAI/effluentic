import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "The Pros and Cons of Lamella Clarifier Designs",
  description:
    "Evaluate if a compact, high-rate lamella clarifier is a suitable alternative to a conventional design for your application.",
  videoPlaceholder: "Video: Lamella Clarifier Pros & Cons",
  calculatorConfig: {
    title: "Footprint Savings Calculator",
    description:
      "Compare the required footprint of a lamella vs. a conventional clarifier.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      tss_mg_l: 4000,
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Process Flow Rate",
        unit: "m³/hr",
        min: 10,
        max: 1000,
        step: 10,
        defaultValue: 100,
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
      href: "/spokes/lamella-clarifiers-vs-conventional-clarifiers",
      title: "Lamella vs. Conventional Clarifiers",
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
