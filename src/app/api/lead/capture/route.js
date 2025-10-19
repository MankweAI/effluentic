import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, report_id, cta_type } = body;

    if (!email || !report_id || !cta_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const leadData = { name, company, email, report_id, cta_type };

    const { data, error } = await supabase
      .from("leads")
      .insert(leadData)
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error inserting lead:", error.message);
      throw new Error(error.message);
    }

    return NextResponse.json(
      {
        success: true,
        leadId: data.id,
        message: "Lead captured successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
