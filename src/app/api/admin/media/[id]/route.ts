import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { db } = await connectToDatabase();

    const media = await db.collection("media").findOne({ _id: new ObjectId(id) });
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete from R2 or local — log but don't block if storage deletion fails
    try {
      await deleteFile(media.url);
    } catch (storageErr) {
      console.error("Storage deletion error:", storageErr);
    }

    await db.collection("media").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE media error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
