import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAuthenticated } from "@/lib/auth";

const DEFAULT_CAMP_DETAILS = {
  title: "KIDS' SUMMER CAMP",
  description: "Empowering the next generation of athletes and community leaders through the beautiful game.",
  dates: "July – August",
  ageGroup: "6–14 Years",
  fees: "Free (Sponsored)",
  location: "Regina Fields / University of Regina",
  registrationLink: "https://www.facebook.com/groups/574758087066199",
  bannerImage: "",
  campDetails: "",
  images: [
    { src: "/assets/stories/kids-summer-soccer-camp-2024.png", alt: "Summer Camp — Match Day" },
    { src: "/assets/stories/kids-summer-soccer-camp-2024-2.png", alt: "Summer Camp — Training Session" },
  ],
  announcements: [
    { date: "June 2026", text: "Registrations for the upcoming summer season are now open! Space is limited." }
  ],
  schedule: [
    { title: "Tuesday Sessions", date: "Every Tuesday", time: "6:00 PM - 8:00 PM" },
    { title: "Thursday Sessions", date: "Every Thursday", time: "6:00 PM - 8:00 PM" }
  ]
};

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    let camp = await db.collection("kids_camp").findOne({});
    
    // If no document exists, initialize with default values
    if (!camp) {
      const result = await db.collection("kids_camp").insertOne({ ...DEFAULT_CAMP_DETAILS });
      camp = { _id: result.insertedId, ...DEFAULT_CAMP_DETAILS };
    }

    return NextResponse.json(camp);
  } catch (error) {
    console.error("GET kids camp error:", error);
    return NextResponse.json({ error: "Failed to fetch camp details" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await request.json();
    const { db } = await connectToDatabase();

    const updateFields: any = {};
    if (updates.title !== undefined) updateFields.title = updates.title;
    if (updates.description !== undefined) updateFields.description = updates.description;
    if (updates.dates !== undefined) updateFields.dates = updates.dates;
    if (updates.ageGroup !== undefined) updateFields.ageGroup = updates.ageGroup;
    if (updates.fees !== undefined) updateFields.fees = updates.fees;
    if (updates.location !== undefined) updateFields.location = updates.location;
    if (updates.registrationLink !== undefined) updateFields.registrationLink = updates.registrationLink;
    if (updates.bannerImage !== undefined) updateFields.bannerImage = updates.bannerImage;
    if (updates.campDetails !== undefined) updateFields.campDetails = updates.campDetails;
    if (updates.images !== undefined) updateFields.images = updates.images;
    if (updates.announcements !== undefined) updateFields.announcements = updates.announcements;
    if (updates.schedule !== undefined) updateFields.schedule = updates.schedule;

    // Use updateOne with upsert to update the singleton record
    await db.collection("kids_camp").updateOne(
      {},
      { $set: updateFields },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Camp details updated successfully" });
  } catch (error) {
    console.error("PUT kids camp error:", error);
    return NextResponse.json({ error: "Failed to update camp details" }, { status: 500 });
  }
}
