import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Clarifier Surface Overflow Rate (SOR) Calculator",
  description:
    "Calculate the required surface area for your gravity clarifier based on the SOR design parameter.",
  videoPlaceholder: "Video: Clarifier SOR Explained",
  calculatorConfig: {
    title: "Calculate Required Clarifier Area",
    description:
      "Determine the footprint required based on your plant's hydraulic load.",
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
      href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
      title: "How to Size a Clarifier for Mining Wastewater",
    },
    {
      href: "/spokes/common-operational-problems-with-wastewater-clarifiers",
      title: "Common Problems with Clarifiers",
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
