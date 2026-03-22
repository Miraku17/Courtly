import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/supabase/auth-guard";

const MAX_VENUE_PHOTOS = 10;

export async function GET() {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const supabase = await createClient();

  const { data: venue } = await supabase
    .from("venues")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!venue) {
    return NextResponse.json({ error: "You do not have a venue." }, { status: 404 });
  }

  const { data: photos, error } = await supabase
    .from("venue_photos")
    .select("*")
    .eq("venue_id", venue.id)
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ photos });
}

export async function POST(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const supabase = await createClient();

  // Verify user has a venue
  const { data: venue } = await supabase
    .from("venues")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!venue) {
    return NextResponse.json({ error: "You do not have a venue." }, { status: 404 });
  }

  // Check current photo count
  const { count } = await supabase
    .from("venue_photos")
    .select("*", { count: "exact", head: true })
    .eq("venue_id", venue.id);

  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 });
  }

  const currentCount = count ?? 0;
  if (currentCount + files.length > MAX_VENUE_PHOTOS) {
    return NextResponse.json(
      { error: `You can upload at most ${MAX_VENUE_PHOTOS} photos. You currently have ${currentCount}.` },
      { status: 400 }
    );
  }

  const uploaded: { id: string; url: string; position: number }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${i}.${ext}`;
    const filePath = `${user.id}/${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("venue-photos")
      .upload(filePath, buffer, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("venue-photos")
      .getPublicUrl(filePath);

    const position = currentCount + i;

    const { data: photo, error: insertError } = await supabase
      .from("venue_photos")
      .insert({
        venue_id: venue.id,
        url: urlData.publicUrl,
        position,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    uploaded.push({ id: photo.id, url: photo.url, position: photo.position });
  }

  return NextResponse.json({
    message: `${uploaded.length} photo(s) uploaded successfully.`,
    photos: uploaded,
  });
}

export async function DELETE(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const photoId = searchParams.get("id");

  if (!photoId) {
    return NextResponse.json({ error: "Photo ID is required." }, { status: 400 });
  }

  const supabase = await createClient();

  // Verify ownership through venue
  const { data: photo } = await supabase
    .from("venue_photos")
    .select("id, url, venue_id, venues!inner(owner_id)")
    .eq("id", photoId)
    .single();

  if (!photo) {
    return NextResponse.json({ error: "Photo not found." }, { status: 404 });
  }

  // Extract storage path from URL to delete the file
  const urlParts = photo.url.split("/venue-photos/");
  if (urlParts[1]) {
    await supabase.storage.from("venue-photos").remove([urlParts[1]]);
  }

  const { error: deleteError } = await supabase
    .from("venue_photos")
    .delete()
    .eq("id", photoId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Photo deleted successfully." });
}
