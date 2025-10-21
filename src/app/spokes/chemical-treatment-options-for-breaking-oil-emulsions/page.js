import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Chemical Treatment Options for Breaking Oil Emulsions",
  description:
    "Explore the use of coagulants and flocculants in destabilizing oil-in-water emulsions prior to mechanical separation.",
  videoPlaceholder: "Video: Chemical Emulsion Breaking",
  calculatorConfig: {
    title: "Estimate Chemical Dosage for Emulsions",
    description:
      "This calculator provides a rough estimate for coagulant demand based on your inputs. Jar testing is required for accuracy.",
    hiddenFields: {
      conceptFocus: "chemical_dosing", // Focus on chemical dosing
      contaminant_type: "Low-Density", // Assumed context for emulsions
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
        tooltip: "The volumetric flow rate impacts total chemical consumption.",
      },
      {
        name: "tss_mg_l", // Represents FOG + Solids load
        label: "FOG & TSS Concentration",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1500,
        tooltip: "Combined concentration influencing coagulant demand.",
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
      href: "/spokes/how-to-optimize-chemical-dosage-for-daf-systems",
      title: "How to Optimize Chemical Dosage for DAF",
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
