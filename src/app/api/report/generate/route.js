import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import {
  calculateDafSizing,
  calculateClarifierSizing,
} from "@/lib/calculationEngine";

export async function POST(request) {
  try {
    const body = await request.json();
    const { industry, contaminant_type, flow_rate_m3_hr, tss_mg_l } = body;

    if (!industry || !contaminant_type || !flow_rate_m3_hr || !tss_mg_l) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure numeric types from the form submission
    const numeric_flow_rate = Number(flow_rate_m3_hr);
    const numeric_tss = Number(tss_mg_l);

    const dafSpecs = calculateDafSizing(
      numeric_flow_rate,
      numeric_tss,
      industry
    );
    const clarifierSpecs = calculateClarifierSizing(
      numeric_flow_rate,
      industry
    );

    const reportData = {
      industry,
      contaminant_type,
      flow_rate_m3_hr: numeric_flow_rate,
      tss_mg_l: numeric_tss,
      daf_surface_area_m2: dafSpecs.surface_area_m2,
      daf_capex_min_zar: dafSpecs.capex_min_zar,
      daf_capex_max_zar: dafSpecs.capex_max_zar,
      daf_opex_annual_zar: dafSpecs.opex_annual_zar,
      clarifier_surface_area_m2: clarifierSpecs.surface_area_m2,
      clarifier_capex_min_zar: clarifierSpecs.capex_min_zar,
      clarifier_capex_max_zar: clarifierSpecs.capex_max_zar,
      clarifier_opex_annual_zar: clarifierSpecs.opex_annual_zar,
      data_json: { dafSpecs, clarifierSpecs }, // Store detailed results
    };

    const { data, error } = await supabase
      .from("reports")
      .insert(reportData)
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
      throw new Error(error.message);
    }

    return NextResponse.json(
      {
        reportId: data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
