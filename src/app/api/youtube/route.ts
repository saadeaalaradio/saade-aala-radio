import { NextResponse } from "next/server";

export async function GET() {
  try {
    const CHANNEL_ID = "UC2iOVDWKiddCPKN89wBUhGg";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Refreshes every hour
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      throw new Error(`YouTube RSS returned status ${res.status}`);
    }

    const xmlText = await res.text();

    // Simple regex extraction for latest video entries
    const videoMatches = [...xmlText.matchAll(/<entry>[\s\S]*?<\/entry>/g)];

    const episodes = videoMatches.slice(0, 6).map((match) => {
      const entry = match[0];
      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || "Saade Aala Radio Episode";
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || "";

      return {
        id: videoId,
        title: title.replace("<![CDATA[", "").replace("]]>", ""),
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        published,
      };
    });

    return NextResponse.json({
      success: true,
      latestVideoId: episodes[0]?.id || "",
      episodes,
    });
  } catch (error: any) {
    console.error("YouTube Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch YouTube videos" },
      { status: 500 }
    );
  }
}