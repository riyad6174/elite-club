import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";

export async function POST(request: Request) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicUrl = await uploadFile(buffer, file.name, file.type);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("File upload API error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
