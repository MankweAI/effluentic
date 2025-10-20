import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "How Does a Dissolved Air Flotation System Work?",
  description:
    "A visual explanation of the DAF process, from air saturation and coagulation to sludge removal.",
  videoPlaceholder: "Video: DAF Process Explained",
  calculatorConfig: {
    title: "Air-to-Solids Ratio (ASR) Estimator",
    description:
      "Calculate the theoretical ASR for your DAF system, a key parameter for flotation efficiency.",
    hiddenFields: {
      industry: "food_beverage",
      contaminant_type: "Low-Density",
    },
    fields: [
      {
        name: "flow_rate_m3_hr",
        label: "Influent Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "The main flow of wastewater into the DAF.",
      },
      {
        name: "tss_mg_l",
        label: "Influent Solids (TSS)",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip: "The concentration of solids in the influent wastewater.",
      },
    ],
  },
  hubLink: {
    href: "/",
    title: "Main Hub",
  },
  relatedSpokes: [
    {
      href: "/spokes/daf-sizing-calculator-and-key-design-parameters",
      title: "DAF Sizing Calculator & Design Parameters",
    },
    {
      href: "/spokes/daf-vs-clarifier-which-is-right-for-your-application",
      title: "DAF vs. Clarifier: Which is Right for You?",
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
