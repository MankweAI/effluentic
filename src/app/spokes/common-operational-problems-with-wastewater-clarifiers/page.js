import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Common Operational Problems with Wastewater Clarifiers",
  description:
    "Identify and solve common issues like sludge blanket problems, short-circuiting, and pin floc in the effluent.",
  videoPlaceholder: "Video: Clarifier Troubleshooting",
  calculatorConfig: {
    title: "Sludge Blanket Depth Monitor",
    description:
      "Track and log sludge blanket depth to identify potential operational issues.",
    hiddenFields: {
      industry: "mining_beneficiation",
      contaminant_type: "High-Density",
      flow_rate_m3_hr: 200,
      tss_mg_l: 3000,
    },
    fields: [
      // This would be a more complex component in reality
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/troubleshooting-high-total-suspended-solids-in-effluent",
      title: "Troubleshooting High TSS in Effluent",
    },
    {
      href: "/spokes/clarifier-surface-overflow-rate-sor-calculator",
      title: "Clarifier SOR Calculator",
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
