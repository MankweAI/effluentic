import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "South African Effluent Discharge Regulations for Industrial Sites",
  description:
    "A summary of the key national and municipal regulations governing industrial wastewater discharge.",
  videoPlaceholder: "Video: SA Effluent Regulations",
  calculatorConfig: {
    title: "Compliance Check",
    description:
      "Check if your effluent values meet typical municipal by-law limits.",
    hiddenFields: {
      industry: "food_beverage",
      contaminant_type: "Low-Density",
      flow_rate_m3_hr: 50,
    },
    fields: [
      {
        name: "tss_mg_l",
        label: "Your Effluent TSS",
        unit: "mg/L",
        min: 0,
        max: 5000,
        step: 50,
        defaultValue: 1000,
        tooltip: "Your measured TSS before discharge.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/water-management-and-treatment-in-mining-and-beneficiation",
      title: "Water Management in Mining",
    },
    {
      href: "/spokes/key-considerations-for-food-and-beverage-wastewater-treatment",
      title: "Wastewater Guide: Food & Beverage",
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
