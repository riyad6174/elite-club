import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const directors = await db
      .collection("directors")
      .find({})
      .sort({ order: 1, createdAt: 1 })
      .toArray();
    return NextResponse.json(directors);
  } catch (error) {
    console.error("GET directors error:", error);
    return NextResponse.json({ error: "Failed to fetch directors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, role, img, resc_id, jersey_name, jersey_no, order } = await request.json();

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("directors").insertOne({
      name,
      role,
      img: img || null,
      resc_id: resc_id || null,
      jersey_name: jersey_name || "",
      jersey_no: jersey_no || "",
      order: order || 0,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      directorId: result.insertedId,
    });
  } catch (error) {
    console.error("POST director error:", error);
    return NextResponse.json({ error: "Failed to create director" }, { status: 500 });
  }
}
