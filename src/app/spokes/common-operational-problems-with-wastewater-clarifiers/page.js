import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Common Operational Problems with Wastewater Clarifiers",
  description:
    "Identify and solve common issues like sludge blanket problems, short-circuiting, and pin floc in the effluent.",
  videoPlaceholder: "Video: Clarifier Troubleshooting",
  calculatorConfig: {
    title: "Clarifier Troubleshooting Assistant",
    description:
      "Select the observed problem to get potential causes and solutions in the report.",
    hiddenFields: {
      conceptFocus: "troubleshooting", // Focus on troubleshooting
      technology_context: "clarifier", // Specific to clarifiers
      // Provide default industry/flow/tss for context if troubleshooting tips depend on it
      flow_rate_m3_hr: 200,
      tss_mg_l: 3000,
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry",
        type: "select",
        // Options relevant to High-Density / Clarifier applications
        options: [
          { value: "mining_beneficiation", label: "Mining & Beneficiation" },
          // Add other relevant high-density industries if applicable (e.g., Heavy Industry, Power Generation Ash)
          { value: "heavy_industry_metals", label: "Heavy Industry / Metals" },
          {
            value: "aggregate_sand_washing",
            label: "Aggregate / Sand Washing",
          },
        ],
        defaultValue: "mining_beneficiation",
        tooltip: "Select the industry that best matches your application.",
      },
      {
        name: "problem_type", // Input to specify the problem
        label: "Observed Problem",
        type: "select",
        options: [
          {
            value: "high_tss",
            label: "High TSS in Effluent (Pin Floc / Cloudy)",
          },
          { value: "sludge_blanket_high", label: "Sludge Blanket Too High" },
          {
            value: "sludge_blanket_low",
            label: "Sludge Blanket Too Low / Rat-holing",
          },
          { value: "floating_sludge", label: "Floating Sludge / Scum" },
          { value: "short_circuiting", label: "Suspected Short-Circuiting" },
        ],
        defaultValue: "high_tss",
        tooltip: "Select the primary issue you are experiencing.",
      },
      // Could add fields for specific measurements like Sludge Blanket Depth
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
