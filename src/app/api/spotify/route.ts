import { NextResponse } from "next/server";

export async function GET() {
  try {
    const SPOTIFY_RSS_URL = "https://anchor.fm/s/e8ade3f8/podcast/rss";

    const res = await fetch(SPOTIFY_RSS_URL, {
      next: { revalidate: 3600 }, // Refreshes automatically every 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Spotify/Anchor RSS feed");
    }

    const xmlText = await res.text();
    return NextResponse.json({ success: true, xml: xmlText });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Spotify sync failed" },
      { status: 500 }
    );
  }
}