import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import {
  calculateDafSizing,
  calculateClarifierSizing,
  estimateChemicalDosage,
  checkRegulatoryCompliance,
  estimateBiologicalLoad,
  getTroubleshootingTips,
} from "@/lib/calculationEngine";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received body:", body); // Log received data

    // Destructure known potential inputs and the new conceptFocus
    const {
      conceptFocus,
      industry,
      contaminant_type,
      flow_rate_m3_hr,
      tss_mg_l,
      cod_mg_l,
      current_cod_dose,
      problem_type,
      technology_context,
      ...otherInputs
    } = body;

    if (!conceptFocus) {
      return NextResponse.json(
        { error: "Missing required field: conceptFocus" },
        { status: 400 }
      );
    }
    if (
      !industry &&
      conceptFocus !== "regulatory_check" &&
      conceptFocus !== "troubleshooting"
    ) {
      // Industry might not be needed for all concepts
      // Allow regulatory check without industry if parameters are given directly
      // Troubleshooting might also be generic
      console.warn("Missing industry field for concept:", conceptFocus);
      // Decide if this is an error or if defaults can be used
      // return NextResponse.json({ error: "Missing required field: industry" }, { status: 400 });
    }

    // Combine known numeric inputs with other potential inputs
    const inputParams = {
      flow_rate_m3_hr: flow_rate_m3_hr ? Number(flow_rate_m3_hr) : undefined,
      tss_mg_l: tss_mg_l ? Number(tss_mg_l) : undefined,
      cod_mg_l: cod_mg_l ? Number(cod_mg_l) : undefined,
      current_cod_dose: current_cod_dose ? Number(current_cod_dose) : undefined,
      contaminant_type: contaminant_type,
      ...otherInputs, // Include any other parameters passed (e.g., pH, FOG etc. for compliance check)
    };

    // Filter out undefined values from inputParams
    Object.keys(inputParams).forEach(
      (key) => inputParams[key] === undefined && delete inputParams[key]
    );

    let calculated_data = {};

    // --- Perform calculations based on conceptFocus ---
    switch (conceptFocus) {
      case "daf_sizing":
      case "clarifier_sizing":
      case "daf_clarifier_comparison":
      case "fog_treatment": // Treat FOG as needing DAF sizing primarily
      case "low_density_solids": // Treat as DAF sizing
      case "high_density_solids": // Treat as Clarifier sizing
        // Always calculate both for comparison baseline in the report, even if focus is one
        calculated_data.dafSpecs = calculateDafSizing(
          inputParams.flow_rate_m3_hr,
          inputParams.tss_mg_l,
          industry
        );
        calculated_data.clarifierSpecs = calculateClarifierSizing(
          inputParams.flow_rate_m3_hr,
          industry
        );
        // Add chemical dose estimate relevant to the primary recommended tech
        const primaryTech =
          contaminant_type === "High-Density" ? "clarifier" : "daf";
        calculated_data.chemicalDosage = estimateChemicalDosage(
          inputParams.flow_rate_m3_hr,
          inputParams.tss_mg_l,
          industry,
          primaryTech
        );
        break;
      case "chemical_dosing":
      case "emulsion_breaking":
        // Determine technology context if possible (default to DAF if low-density assumed)
        const techForChem =
          contaminant_type === "High-Density" ? "clarifier" : "daf";
        calculated_data.chemicalDosage = estimateChemicalDosage(
          inputParams.flow_rate_m3_hr,
          inputParams.tss_mg_l,
          industry,
          techForChem
        );
        // Also include sizing for context
        calculated_data.dafSpecs = calculateDafSizing(
          inputParams.flow_rate_m3_hr,
          inputParams.tss_mg_l,
          industry
        );
        calculated_data.clarifierSpecs = calculateClarifierSizing(
          inputParams.flow_rate_m3_hr,
          industry
        );
        break;
      case "regulatory_check":
        // Use all relevant inputParams for the check
        calculated_data.complianceStatus = checkRegulatoryCompliance(
          industry || "default",
          inputParams
        ); // Use default industry if none provided
        break;
      case "biological_load_estimation":
        // Requires flow_rate_m3_hr and cod_mg_l
        if (inputParams.flow_rate_m3_hr && inputParams.cod_mg_l) {
          calculated_data.biologicalLoad = estimateBiologicalLoad(
            inputParams.flow_rate_m3_hr,
            inputParams.cod_mg_l,
            industry
          );
        } else {
          console.warn(
            "Missing flow_rate or cod_mg_l for biological load estimation"
          );
          calculated_data.biologicalLoad = {
            error: "Flow rate and COD required for this calculation.",
          };
        }
        // Include primary treatment sizing for context
        calculated_data.dafSpecs = calculateDafSizing(
          inputParams.flow_rate_m3_hr,
          inputParams.tss_mg_l,
          industry
        );
        calculated_data.clarifierSpecs = calculateClarifierSizing(
          inputParams.flow_rate_m3_hr,
          industry
        );
        break;
      case "troubleshooting":
        // Requires problem_type, technology_context, and potentially other details
        calculated_data.troubleshootingTips = getTroubleshootingTips(
          problem_type,
          technology_context,
          inputParams
        );
        break;
      default:
        // Default to standard DAF/Clarifier comparison if concept is unknown
        console.warn(
          `Unknown conceptFocus: ${conceptFocus}, defaulting to DAF/Clarifier comparison.`
        );
        calculated_data.dafSpecs = calculateDafSizing(
          inputParams.flow_rate_m3_hr,
          inputParams.tss_mg_l,
          industry
        );
        calculated_data.clarifierSpecs = calculateClarifierSizing(
          inputParams.flow_rate_m3_hr,
          industry
        );
    }

    // --- Prepare data for Supabase ---
    const reportData = {
      industry: industry || "N/A", // Handle potentially missing industry
      contaminant_type: contaminant_type, // May be undefined, handled by DB
      flow_rate_m3_hr: inputParams.flow_rate_m3_hr, // May be undefined
      tss_mg_l: inputParams.tss_mg_l, // May be undefined
      concept_focus: conceptFocus,
      input_params: inputParams, // Store all received inputs
      // Store baseline DAF/Clarifier specs if calculated
      daf_surface_area_m2: calculated_data.dafSpecs?.surface_area_m2,
      daf_capex_min_zar: calculated_data.dafSpecs?.capex_min_zar,
      daf_capex_max_zar: calculated_data.dafSpecs?.capex_max_zar,
      daf_opex_annual_zar: calculated_data.dafSpecs?.opex_annual_zar,
      clarifier_surface_area_m2:
        calculated_data.clarifierSpecs?.surface_area_m2,
      clarifier_capex_min_zar: calculated_data.clarifierSpecs?.capex_min_zar,
      clarifier_capex_max_zar: calculated_data.clarifierSpecs?.capex_max_zar,
      clarifier_opex_annual_zar:
        calculated_data.clarifierSpecs?.opex_annual_zar,
      calculated_data: calculated_data, // Store all specific results
    };

    // --- Insert into Supabase ---
    const { data, error } = await supabase
      .from("reports")
      .insert(reportData)
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error inserting report:", error.message);
      throw new Error(`Supabase error: ${error.message}`);
    }

    // --- Return Success ---
    return NextResponse.json(
      {
        reportId: data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error in /api/report/generate:", error);
    return NextResponse.json(
      // Provide a more specific error message if available
      {
        error: `Failed to generate report: ${
          error.message || "Internal server error"
        }`,
      },
      { status: 500 }
    );
  }
}
