import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Using a DAF System for Low-Density Solids Removal",
  description:
    "Learn how Dissolved Air Flotation is used to effectively remove buoyant organic solids and other low-density contaminants.",
  videoPlaceholder: "Video: DAF for Organic Solids",
  calculatorConfig: {
    title: "DAF Sizing Calculator (Low-Density Solids)",
    description:
      "Size a DAF system based on hydraulic (HLR) and solids loading rates (SLR) for low-density solids.",
    hiddenFields: {
      conceptFocus: "daf_sizing", // Explicit DAF Sizing focus
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
        tooltip: "The volumetric flow rate of wastewater (HLR).",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS)",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip: "The concentration of low-density suspended solids (SLR).",
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
      href: "/spokes/daf-sizing-calculator-and-key-design-parameters",
      title: "DAF Sizing Calculator & Design Parameters",
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
