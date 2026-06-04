import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const albums = await db.collection("gallery_albums").find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(albums);
  } catch (error) {
    console.error("GET gallery albums error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery albums" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, category } = await request.json();

    if (!name || !category) {
      return NextResponse.json({ error: "Name and Category are required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Get the maximum order to append this album at the end
    const lastAlbum = await db
      .collection("gallery_albums")
      .find({})
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    
    const nextOrder = lastAlbum.length > 0 ? (lastAlbum[0].order || 0) + 1 : 0;

    const result = await db.collection("gallery_albums").insertOne({
      name,
      description: description || "",
      category,
      order: nextOrder,
      images: [],
    });

    return NextResponse.json({
      success: true,
      albumId: result.insertedId,
    });
  } catch (error) {
    console.error("POST gallery album error:", error);
    return NextResponse.json({ error: "Failed to create gallery album" }, { status: 500 });
  }
}

// Bulk update order for reordering albums
export async function PUT(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { albums } = await request.json(); // Array of { id: string, order: number }

    if (!Array.isArray(albums)) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const bulkOps = albums.map((album) => ({
      updateOne: {
        filter: { _id: new ObjectId(album.id) },
        update: { $set: { order: album.order } },
      },
    }));

    if (bulkOps.length > 0) {
      await db.collection("gallery_albums").bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, message: "Albums reordered successfully" });
  } catch (error) {
    console.error("PUT reorder gallery albums error:", error);
    return NextResponse.json({ error: "Failed to reorder gallery albums" }, { status: 500 });
  }
}
