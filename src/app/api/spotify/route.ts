import { NextResponse } from "next/server";

export async function GET() {
  try {
    const SPOTIFY_SHOW_ID = "3voSKp0xDQSbzMNVxf239H";
    const rssUrl = `https://anchor.fm/s/saadeaalaradio/podcast/rss`;

    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Refreshes automatically every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Spotify RSS feed");
    }

    const xmlText = await res.text();
    return NextResponse.json({ success: true, xml: xmlText, spotifyShowId: SPOTIFY_SHOW_ID });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Spotify sync failed" },
      { status: 500 }
    );
  }
}