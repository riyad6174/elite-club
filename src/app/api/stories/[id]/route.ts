import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();

    const story = await db.collection("stories").findOne({ _id: new ObjectId(id) });
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error("GET story by id error:", error);
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const updates = await request.json();
    const { db } = await connectToDatabase();

    const updateFields: any = {};
    if (updates.title !== undefined) updateFields.title = updates.title;
    if (updates.excerpt !== undefined) updateFields.excerpt = updates.excerpt;
    if (updates.body !== undefined) updateFields.body = updates.body;
    if (updates.category !== undefined) updateFields.category = updates.category;
    if (updates.date !== undefined) updateFields.date = updates.date;
    if (updates.author !== undefined) updateFields.author = updates.author;
    if (updates.images !== undefined) updateFields.images = updates.images;
    if (updates.quote !== undefined) updateFields.quote = updates.quote;
    if (updates.quoteBy !== undefined) updateFields.quoteBy = updates.quoteBy;
    if (updates.isPublished !== undefined) updateFields.isPublished = !!updates.isPublished;

    const result = await db
      .collection("stories")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Story updated successfully" });
  } catch (error) {
    console.error("PUT story error:", error);
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { db } = await connectToDatabase();

    const result = await db.collection("stories").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Story deleted successfully" });
  } catch (error) {
    console.error("DELETE story error:", error);
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
