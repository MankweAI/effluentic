import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Chemical Treatment Options for Breaking Oil Emulsions",
  description:
    "Explore the use of coagulants and flocculants in destabilizing oil-in-water emulsions prior to mechanical separation.",
  videoPlaceholder: "Video: Chemical Emulsion Breaking",
  calculatorConfig: {
    title: "Estimate Chemical Dosage",
    description:
      "This calculator provides a rough estimate for coagulant demand based on your inputs.",
    hiddenFields: {
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry",
        type: "select",
        options: ["food_beverage", "meat_processing", "dairy_processing"],
        defaultValue: "food_beverage",
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
        name: "tss_mg_l",
        label: "FOG & TSS Concentration",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1500,
        tooltip: "The combined concentration of fats, oils, grease and solids.",
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
