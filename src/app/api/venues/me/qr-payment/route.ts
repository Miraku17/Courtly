import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/supabase/auth-guard";

export async function POST(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filePath = `${user.id}/qr-payment.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = await createClient();

  // Verify user has a venue
  const { data: venue, error: venueError } = await supabase
    .from("venues")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (venueError || !venue) {
    return NextResponse.json(
      { error: "You do not have a venue." },
      { status: 404 }
    );
  }

  // Upload to venue-qr-payments bucket
  const { error: uploadError } = await supabase.storage
    .from("venue-qr-payments")
    .upload(filePath, buffer, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("venue-qr-payments")
    .getPublicUrl(filePath);

  const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

  // Update venue qr_payment_url
  const { error: updateError } = await supabase
    .from("venues")
    .update({ qr_payment_url: publicUrl })
    .eq("owner_id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "QR payment image uploaded successfully.",
    qrPaymentUrl: publicUrl,
  });
}
