import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { uploadFile } from "@/lib/storage";

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const media = await db
      .collection("media")
      .find({})
      .sort({ uploadedAt: -1 })
      .toArray();

    return NextResponse.json(media);
  } catch (error) {
    console.error("GET media error:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicUrl = await uploadFile(buffer, file.name, file.type);

    const { db } = await connectToDatabase();
    const result = await db.collection("media").insertOne({
      url: publicUrl,
      filename: file.name,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      _id: result.insertedId,
      url: publicUrl,
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("POST media error:", error);
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}
