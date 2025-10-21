import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "The Pros and Cons of Lamella Clarifier Designs",
  description:
    "Evaluate if a compact, high-rate lamella clarifier is a suitable alternative to a conventional design for your application.",
  videoPlaceholder: "Video: Lamella Clarifier Pros & Cons",
  calculatorConfig: {
    title: "Footprint Comparison (Conventional vs. Lamella)",
    description:
      "Compare the estimated footprint of a conventional clarifier vs. a lamella unit for the same flow rate.",
    // Focus on Clarifier sizing, report can add commentary on Lamella comparison
    hiddenFields: {
      conceptFocus: "clarifier_sizing", // Sizing needed for comparison
      contaminant_type: "High-Density",
      // tss_mg_l: 4000, // Not needed for SOR based calc
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
        name: "flow_rate_m3_hr",
        label: "Process Flow Rate",
        unit: "m³/hr",
        min: 10,
        max: 1000, // Lamellas often used in smaller/medium scale
        step: 10,
        defaultValue: 100,
        tooltip: "Flow rate to compare footprint requirements.",
      },
      // Report logic will need to estimate lamella area based on conventional area (e.g., 10-20% of conventional)
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
