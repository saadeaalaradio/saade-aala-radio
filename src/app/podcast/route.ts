import { NextResponse } from "next/server";

export async function GET() {
  const PODCAST_RSS_URL = "https://anchor.fm/s/e8ade3f8/podcast/rss";

  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        PODCAST_RSS_URL
      )}`
    );
    const data = await res.json();

    if (data.status === "ok" && data.items.length > 0) {
      const latestEpisode = data.items[0];

      // Extract Spotify Episode ID if available in guid/link
      let spotifyEmbedUrl = "";
      if (latestEpisode.guid) {
        spotifyEmbedUrl = `https://open.spotify.com/embed/episode/${latestEpisode.guid.split("/").pop()}`;
      } else if (latestEpisode.link) {
        spotifyEmbedUrl = latestEpisode.link.replace("spotify.com/episode/", "spotify.com/embed/episode/");
      }

      return NextResponse.json({
        title: latestEpisode.title,
        pubDate: latestEpisode.pubDate,
        link: latestEpisode.link,
        description: latestEpisode.description,
        embedUrl: spotifyEmbedUrl,
      });
    }

    return NextResponse.json({ error: "No episodes found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch RSS feed" }, { status: 500 });
  }
}