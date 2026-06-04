import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Check auth state to decide whether to filter out drafts
    const authenticated = await isAuthenticated();
    const filter = authenticated ? {} : { isPublished: true };

    const stories = await db
      .collection("stories")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET stories error:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      excerpt,
      body,
      category,
      date,
      author,
      images,
      quote,
      quoteBy,
      isPublished,
    } = await request.json();

    if (!title || !body || !category || !date || !author) {
      return NextResponse.json(
        { error: "Title, Category, Date, Author, and Body are required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("stories").insertOne({
      title,
      excerpt: excerpt || "",
      body,
      category,
      date,
      author,
      images: Array.isArray(images) ? images : [],
      quote: quote || "",
      quoteBy: quoteBy || "",
      isPublished: isPublished === undefined ? false : !!isPublished,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      storyId: result.insertedId,
    });
  } catch (error) {
    console.error("POST story error:", error);
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}
