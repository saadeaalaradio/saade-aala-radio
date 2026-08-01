import { NextResponse } from "next/server";

export async function GET() {
  try {
    const CHANNEL_ID = "UC2iOVDWKiddCPKN89wBUhGg"; 
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Refreshes automatically every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch YouTube RSS feed");
    }

    const xmlText = await res.text();
    return NextResponse.json({ success: true, xml: xmlText });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "YouTube sync failed" },
      { status: 500 }
    );
  }
}