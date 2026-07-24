import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const members = await db
      .collection("members")
      .find({})
      .sort({ order: 1, createdAt: 1 })
      .toArray();
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET members error:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, img, resc_id, order } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Name is a required field" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("members").insertOne({
      name,
      img: img || null,
      resc_id: resc_id || null,
      order: order || 0,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      memberId: result.insertedId,
    });
  } catch (error) {
    console.error("POST member error:", error);
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
