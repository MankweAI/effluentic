import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "Dairy Processing Wastewater: Challenges and Solutions",
  description:
    "Addressing the unique challenges of dairy effluent, including high milk fat content, extreme pH swings, and high soluble BOD.",
  videoPlaceholder: "Video: Dairy Wastewater Solutions",
  calculatorConfig: {
    title: "Dairy DAF Sizer",
    description:
      "Size a DAF system to handle the high FOG and protein load from dairy processing.",
    hiddenFields: {
      industry: "dairy_processing",
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Flow Rate",
        unit: "m³/hr",
        min: 5,
        max: 800,
        step: 10,
        defaultValue: 100,
        tooltip: "The flow rate from your dairy.",
      },
      {
        name: "tss_mg_l",
        label: "Suspended Solids (TSS)",
        unit: "mg/L",
        min: 300,
        max: 5000,
        step: 100,
        defaultValue: 1000,
        tooltip: "The estimated TSS, including milk fats and proteins.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/guide-to-wastewater-treatment-in-the-meat-processing-industry",
      title: "Wastewater Guide: Meat Processing",
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
