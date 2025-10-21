import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "The Engineer's Guide to High-FOG Effluent",
  description:
    "A senior process engineer provides a comprehensive overview of treating high-fat, oil, and grease (FOG) wastewater.",
  videoPlaceholder: "Video: Treating High-FOG Effluent",
  calculatorConfig: {
    title: "Baseline DAF Sizer for FOG",
    description:
      "Enter your plant's data to generate an instant pre-feasibility report focused on DAF sizing for FOG treatment.",
    hiddenFields: {
      conceptFocus: "fog_treatment", // Focus on FOG treatment (implies DAF)
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
        name: "tss_mg_l", // Retained as it includes FOG for SLR calculation
        label: "FOG & TSS Concentration",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip: "Estimated Total Suspended Solids including FOG content.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/removing-emulsified-oils-from-industrial-wastewater",
      title: "Removing Emulsified Oils from Industrial Wastewater",
    },
    {
      href: "/spokes/guide-to-dissolved-air-flotation-for-fog-removal",
      title: "Guide to DAF for FOG Removal",
    },
  ],
};
export default function Page() {
  // NOTE: The SpokePage component is not fully generic yet.
  // This is a simplified version for scaffolding.
  // The select field type is not implemented in the generic component.
  // We will address this in the next phase.
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
