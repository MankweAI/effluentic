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

    const dafSpecs = calculateDafSizing(flow_rate_m3_hr, tss_mg_l, industry);
    const clarifierSpecs = calculateClarifierSizing(flow_rate_m3_hr, industry);

    const reportData = {
      industry,
      contaminant_type,
      flow_rate_m3_hr,
      tss_mg_l,
      daf_surface_area_m2: dafSpecs.surface_area_m2,
      daf_capex_min_zar: dafSpecs.capex_min_zar,
      daf_capex_max_zar: dafSpecs.capex_max_zar,
      daf_opex_annual_zar: dafSpecs.opex_annual_zar,
      clarifier_surface_area_m2: clarifierSpecs.surface_area_m2,
      clarifier_capex_min_zar: clarifierSpecs.capex_min_zar,
      clarifier_capex_max_zar: clarifierSpecs.capex_max_zar,
      clarifier_opex_annual_zar: clarifierSpecs.opex_annual_zar,
      data_json: { dafSpecs, clarifierSpecs },
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
        reportData: { ...reportData, id: data.id },
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
