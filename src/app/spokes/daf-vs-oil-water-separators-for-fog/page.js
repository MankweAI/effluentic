import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF vs. Oil-Water Separators: Which is Better for FOG?",
  description:
    "A comparison of Dissolved Air Flotation and conventional oil-water separators for treating emulsified vs. free-floating oils.",
  videoPlaceholder: "Video: DAF vs. OWS",
  calculatorConfig: {
    title: "DAF Sizing (for Emulsified FOG)",
    description:
      "Size a DAF system, typically preferred for emulsified FOG common in these industries. OWS are better for free oil.",
    // Focus remains DAF sizing as OWS sizing is simpler and not implemented here
    hiddenFields: {
      conceptFocus: "daf_sizing",
      industry: "food_beverage",
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry",
        type: "select",
        // Options relevant to Low-Density / DAF applications
        options: [
          { value: "food_beverage", label: "Food & Beverage (General)" },
          { value: "meat_processing", label: "Meat Processing" },
          { value: "dairy_processing", label: "Dairy Processing" },
          // Add other relevant low-density industries if applicable
        ],
        defaultValue: "food_beverage",
        tooltip: "Select the industry that best matches your application.",
      },
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The volumetric flow rate of wastewater to be treated.",
      },
      {
        name: "tss_mg_l", // Label adjusted for context
        label: "Emulsified FOG & TSS Content",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1000,
        tooltip:
          "Concentration of emulsified FOG and associated solids influencing DAF sizing (SLR).",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/guide-to-dissolved-air-flotation-for-fog-removal",
      title: "Guide to DAF for FOG Removal",
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
