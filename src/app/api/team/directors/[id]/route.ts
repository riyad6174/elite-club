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
    const director = await db.collection("directors").findOne({ _id: new ObjectId(id) });
    if (!director) {
      return NextResponse.json({ error: "Director not found" }, { status: 404 });
    }
    return NextResponse.json(director);
  } catch (error) {
    console.error("GET director by id error:", error);
    return NextResponse.json({ error: "Failed to fetch director" }, { status: 500 });
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

    const updateFields: Record<string, any> = {};
    if (updates.name !== undefined) updateFields.name = updates.name;
    if (updates.role !== undefined) updateFields.role = updates.role;
    if (updates.img !== undefined) updateFields.img = updates.img;
    if (updates.resc_id !== undefined) updateFields.resc_id = updates.resc_id;
    if (updates.jersey_name !== undefined) updateFields.jersey_name = updates.jersey_name;
    if (updates.jersey_no !== undefined) updateFields.jersey_no = updates.jersey_no;
    if (updates.order !== undefined) updateFields.order = updates.order;

    const result = await db
      .collection("directors")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Director not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Director updated successfully" });
  } catch (error) {
    console.error("PUT director error:", error);
    return NextResponse.json({ error: "Failed to update director" }, { status: 500 });
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
    const result = await db.collection("directors").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Director not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Director deleted successfully" });
  } catch (error) {
    console.error("DELETE director error:", error);
    return NextResponse.json({ error: "Failed to delete director" }, { status: 500 });
  }
}
