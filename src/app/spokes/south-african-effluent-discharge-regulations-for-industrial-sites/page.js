import SpokePage from "@/components/SpokePage";

const pageConfig = {
  title: "South African Effluent Discharge Regulations for Industrial Sites",
  description:
    "A summary of the key national and municipal regulations governing industrial wastewater discharge.",
  videoPlaceholder: "Video: SA Effluent Regulations",
  calculatorConfig: {
    title: "Effluent Compliance Check",
    description:
      "Enter your measured effluent values to check against typical municipal or DWS limits.",
    hiddenFields: {
      conceptFocus: "regulatory_check", // Focus on compliance check
    },
    fields: [
      {
        name: "industry",
        label: "Primary Industry (Optional Context)",
        type: "select",
        // Include options from both categories + a general option
        options: [
          { value: "general_industrial", label: "General Industrial" }, // Added default
          { value: "food_beverage", label: "Food & Beverage (General)" },
          { value: "meat_processing", label: "Meat Processing" },
          { value: "dairy_processing", label: "Dairy Processing" },
          { value: "mining_beneficiation", label: "Mining & Beneficiation" },
          { value: "heavy_industry_metals", label: "Heavy Industry / Metals" },
          {
            value: "aggregate_sand_washing",
            label: "Aggregate / Sand Washing",
          },
          { value: "other", label: "Other" },
        ],
        defaultValue: "general_industrial", // Default to general
        tooltip:
          "Select your industry for potentially more tailored results or limits.",
      },
      {
        // Optional: Allow user to select context for limits
        name: "discharge_context",
        label: "Discharge Point",
        type: "select",
        options: [
          {
            value: "municipal_sewer",
            label: "Municipal Sewer (Typical Industry)",
          },
          {
            value: "water_resource_dws",
            label: "Water Resource (DWS General Limits)",
          },
          { value: "mining_specific", label: "Mining (Specific DWS Limits)" },
        ],
        defaultValue: "municipal_sewer",
        tooltip:
          "Select where the effluent is discharged to check against relevant limits.",
      },
      // Fields for common regulated parameters
      {
        name: "tss_mg_l",
        label: "Your Effluent TSS",
        type: "number", // Use number input instead of range
        unit: "mg/L",
        min: 0,
        // max: 5000, // No max needed for input check
        step: 1,
        defaultValue: 500, // Example value
        tooltip: "Measured Total Suspended Solids in your final discharge.",
      },
      {
        name: "cod_mg_l",
        label: "Your Effluent COD",
        type: "number",
        unit: "mg/L",
        min: 0,
        step: 1,
        defaultValue: 1000,
        tooltip: "Measured Chemical Oxygen Demand in your final discharge.",
      },
      {
        name: "fog_mg_l",
        label: "Your Effluent FOG",
        type: "number",
        unit: "mg/L",
        min: 0,
        step: 1,
        defaultValue: 100,
        tooltip: "Measured Fats, Oils, and Grease in your final discharge.",
      },
      {
        name: "ph",
        label: "Your Effluent pH",
        type: "number",
        unit: "",
        min: 0,
        max: 14,
        step: 0.1,
        defaultValue: 7.0,
        tooltip: "Measured pH of your final discharge.",
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
