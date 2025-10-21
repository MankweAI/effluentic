import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "How Does a Dissolved Air Flotation System Work?",
  description:
    "A visual explanation of the DAF process, from air saturation and coagulation to sludge removal.",
  videoPlaceholder: "Video: DAF Process Explained",
  calculatorConfig: {
    title: "DAF System Sizing (Contextual)",
    description:
      "Enter typical parameters to see how they influence the size and cost of a DAF system.",
    // Focus remains DAF sizing to give context to the explanation
    hiddenFields: {
      conceptFocus: "daf_sizing",
      industry: "food_beverage", // Default context
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
        label: "Example Influent Flow Rate",
        unit: "m³/hr",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 50,
        tooltip: "How much wastewater enters the DAF unit per hour?",
      },
      {
        name: "tss_mg_l",
        label: "Example Influent Solids (TSS/FOG)",
        unit: "mg/L",
        min: 100,
        max: 8000,
        step: 100,
        defaultValue: 1200,
        tooltip: "How much solid/oily material needs to be floated?",
      },
      // Removed ASR calculation as it's complex for a basic calculator;
      // focus on sizing based on flow/tss which is core to the concept.
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
