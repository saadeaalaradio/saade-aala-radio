import { NextResponse } from "next/server";

export async function GET() {
  // Replace this placeholder RSS feed URL with your actual Spotify/Podcast RSS Feed URL
  const PODCAST_RSS_URL = "https://anchor.fm/s/example/podcast/rss";

  try {
    // We use rss2json as a lightweight parser for public RSS feeds
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        PODCAST_RSS_URL
      )}`
    );
    const data = await res.json();

    if (data.status === "ok" && data.items.length > 0) {
      const latestEpisode = data.items[0];
      return NextResponse.json({
        title: latestEpisode.title,
        pubDate: latestEpisode.pubDate,
        link: latestEpisode.link,
        description: latestEpisode.description,
        guid: latestEpisode.guid,
      });
    }

    return NextResponse.json({ error: "No episodes found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch RSS feed" }, { status: 500 });
  }
}