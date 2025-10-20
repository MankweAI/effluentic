import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "DAF vs. Oil-Water Separators: Which is Better for FOG?",
  description:
    "A comparison of Dissolved Air Flotation and conventional oil-water separators for treating emulsified vs. free-floating oils.",
  videoPlaceholder: "Video: DAF vs. OWS",
  calculatorConfig: {
    title: "Technology Selector",
    description:
      "Answer a few questions to see which technology is a better fit for your application.",
    hiddenFields: {
      industry: "food_beverage",
      contaminant_type: "Low-Density",
    },
    fields: [
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
        label: "Emulsified FOG Content",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1000,
        tooltip:
          "The concentration of chemically or mechanically emulsified FOG.",
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
