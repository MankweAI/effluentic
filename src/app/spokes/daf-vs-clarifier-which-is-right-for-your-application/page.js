import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF vs. Clarifier: Which is Right for Your Application?",
  description:
    "A direct comparison to help you choose between flotation and sedimentation for primary wastewater treatment.",
  videoPlaceholder: "Video: DAF vs. Clarifier",
  calculatorConfig: {
    title: "Technology Recommendation Tool",
    description:
      "Answer two simple questions to get a preliminary technology recommendation.",
    hiddenFields: {
      industry: "food_beverage",
      flow_rate_m3_hr: 100,
      tss_mg_l: 1500,
    },
    fields: [
      {
        name: "contaminant_type",
        label: "Primary Contaminant Type",
        type: "select",
        options: ["Low-Density", "High-Density"],
        defaultValue: "Low-Density",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/treating-high-density-vs-low-density-suspended-solids",
      title: "Treating High-Density vs. Low-Density Solids",
    },
    {
      href: "/spokes/how-does-a-dissolved-air-flotation-system-work",
      title: "How Does a DAF System Work?",
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
