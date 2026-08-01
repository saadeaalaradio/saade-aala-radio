"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export interface HomepageSection {
  id: "webplayer" | "banners" | "hosts_photo" | "social_media" | "mma_game" | "stories";
  title: string;
  enabled: boolean;
}

export interface EpisodeBanner {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
  altText: string;
  metaData: string;
  streamUrl: string;
}

export interface YouTubeEpisode {
  id: string;
  title: string;
  embedUrl: string;
  thumbnailUrl: string;
  published: string;
}

const DEFAULT_SECTIONS: HomepageSection[] = [
  { id: "webplayer", title: "1. Webplayer (YouTube + Spotify)", enabled: true },
  { id: "banners", title: "2. 16:9 Episode Banner Slides", enabled: true },
  { id: "hosts_photo", title: "3. Hosts Photo & Meet The Team", enabled: true },
  { id: "social_media", title: "4. Social Media Tab", enabled: true },
  { id: "mma_game", title: "5. MMA Arcade Game", enabled: true },
  { id: "stories", title: "6. Short Stories Tab", enabled: true },
];

export default function HomePage() {
  const [sections, setSections] = useState<HomepageSection[]>(DEFAULT_SECTIONS);
  const [activePlayer, setActivePlayer] = useState<"youtube" | "spotify">("youtube");

  // CMS Data State
  const [cmsBanners, setCmsBanners] = useState<EpisodeBanner[]>([]);

  // Live Auto-Sync State
  const [latestYoutubeId, setLatestYoutubeId] = useState<string>("");
  const [youtubeEpisodes, setYoutubeEpisodes] = useState<YouTubeEpisode[]>([]);
  const [, setIsLoadingYoutube] = useState<boolean>(true);

  // Load CMS configuration from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_cms_config");
      if (saved) {
        try {
          const config = JSON.parse(saved);
          if (config.homepageSections && Array.isArray(config.homepageSections)) {
            setSections(config.homepageSections);
          }
          if (config.episodeBanners && Array.isArray(config.episodeBanners)) {
            setCmsBanners(config.episodeBanners);
          }
        } catch (e) {
          console.error("Failed to parse CMS section configuration", e);
        }
      }
    }
  }, []);

  // Fetch Live YouTube Feed via /api/youtube route
  useEffect(() => {
    async function syncYouTubeFeed() {
      try {
        setIsLoadingYoutube(true);
        const res = await fetch("/api/youtube");
        const data = await res.json();
        if (data.success && data.episodes && data.episodes.length > 0) {
          setLatestYoutubeId(data.latestVideoId || data.episodes[0].id);
          setYoutubeEpisodes(data.episodes);
        }
      } catch (err) {
        console.error("Error fetching live YouTube RSS feed", err);
      } finally {
        setIsLoadingYoutube(false);
      }
    }

    syncYouTubeFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      {/* DYNAMIC HOMEPAGE CONTENT */}
      <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-8 md:gap-12">
        {sections.map((section) => {
          if (!section.enabled) return null;

          switch (section.id) {
            /* 1. WEBPLAYER */
            case "webplayer":
              return (
                <section
                  key={section.id}
                  className="bg-[#141417] border border-[#27272A] p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6 items-center"
                >
                  <div className="flex-1 flex flex-col gap-3 w-full">
                    <span className="text-[10px] md:text-xs font-black text-[#FFC800] tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      NOW STREAMING
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">Latest Podcast Episode</h1>
                    <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed">
                      Join Harshdeep, Sarabjeet, and Sandeep as they dive into raw Punjabi banter, viral stories, and unscripted laughs.
                    </p>

                    <div className="flex bg-[#09090B] p-1 rounded-xl border border-[#27272A] self-start mt-2">
                      <button
                        onClick={() => setActivePlayer("youtube")}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activePlayer === "youtube" ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA] hover:text-white"
                        }`}
                      >
                        📹 YouTube
                      </button>
                      <button
                        onClick={() => setActivePlayer("spotify")}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activePlayer === "spotify" ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA] hover:text-white"
                        }`}
                      >
                        🎧 Spotify
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-[480px] aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden border border-[#27272A] shrink-0 relative">
                    {activePlayer === "youtube" ? (
                      <iframe
                        className="w-full h-full"
                        src={
                          latestYoutubeId
                            ? `https://www.youtube.com/embed/${latestYoutubeId}?autoplay=0`
                            : "https://www.youtube.com/embed/videoseries?list=PL3oW2tjiIx8m7jU"
                        }
                        title="Saade Aala Radio Latest YouTube Episode"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <iframe
                        className="w-full h-full"
                        src="https://open.spotify.com/embed/show/3voSKp0xDQSbzMNVxf239H"
                        title="Saade Aala Radio Spotify Episode"
                        allow="encrypted-media"
                      />
                    )}
                  </div>
                </section>
              );

            /* 2. 16:9 DYNAMIC EPISODE BANNER SLIDES (LIVE RSS + CMS) */
            case "banners": {
              const hasLiveFeed = youtubeEpisodes.length > 0;
              const hasCmsBanners = cmsBanners.length > 0;

              return (
                <section key={section.id} className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base md:text-xl font-black text-white flex items-center gap-2">
                      🔥 Recent Episodes{" "}
                      {hasLiveFeed && (
                        <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                          LIVE SYNC
                        </span>
                      )}
                    </h2>
                    <span className="text-[10px] md:text-xs text-[#A1A1AA]">Slide Left/Right ➔</span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#FFC800]">
                    {hasLiveFeed
                      ? youtubeEpisodes.map((ep) => (
                          <a
                            key={ep.id}
                            href={`https://www.youtube.com/watch?v=${ep.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-[280px] md:w-[380px] shrink-0 snap-start bg-[#141417] border border-[#27272A] p-3 rounded-2xl flex flex-col gap-2 hover:border-[#FFC800] transition-all group"
                          >
                            <div className="aspect-video w-full rounded-xl bg-[#09090B] border border-[#27272A] overflow-hidden relative">
                              <img
                                src={ep.thumbnailUrl}
                                alt={ep.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                <span className="w-10 h-10 rounded-full bg-[#FFC800] text-black flex items-center justify-center font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
                                  ▶
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-0.5 px-1">
                              <h3 className="text-xs font-black text-white line-clamp-1 group-hover:text-[#FFC800] transition-colors">
                                {ep.title}
                              </h3>
                              <span className="text-[10px] text-[#A1A1AA] font-bold">Watch on YouTube ➔</span>
                            </div>
                          </a>
                        ))
                      : (hasCmsBanners ? cmsBanners : [1, 2, 3, 4, 5]).map((item, idx) => {
                          const isObj = typeof item === "object";
                          return (
                            <div
                              key={isObj ? item.id : idx}
                              className="w-[280px] md:w-[380px] shrink-0 snap-start bg-[#141417] border border-[#27272A] p-3 rounded-2xl flex flex-col gap-2 hover:border-[#FFC800] transition-colors"
                            >
                              <div className="aspect-video w-full rounded-xl bg-[#09090B] border border-[#27272A] overflow-hidden relative flex items-center justify-center">
                                {isObj && item.imageUrl ? (
                                  <img src={item.imageUrl} alt={item.altText || item.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-center p-4">
                                    <span className="text-xs font-black text-[#FFC800]">EPISODE BANNER SLIDE #{idx + 1}</span>
                                    <span className="text-[10px] text-[#A1A1AA]">Syncing YouTube Feed...</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-black text-white line-clamp-1">
                                  {isObj ? item.title : `Episode #${item} - Sirsa Special Roast`}
                                </span>
                                <span className="text-[10px] text-[#FFC800] font-bold shrink-0">
                                  {isObj ? item.duration : "45 MINS"}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </section>
              );
            }

            /* 3. STATIC PHOTO OF 3 HOSTS */
            case "hosts_photo":
              return (
                <section
                  key={section.id}
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#27272A] bg-[#141417] min-h-[280px] md:min-h-[380px] flex items-end p-6 md:p-10 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                  <img
                    src="/hosts-group.png"
                    alt="Harshdeep, Sarabjeet, and Sandeep"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />

                  <div className="relative z-20 flex flex-col items-start gap-2 max-w-[500px]">
                    <span className="text-[10px] md:text-xs font-extrabold text-[#FFC800] bg-[#FFC800]/20 px-3 py-1 rounded-full border border-[#FFC800]/40">
                      THE TRIO BEHIND THE MIC
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-white leading-tight">
                      Meet Harshdeep, Sarabjeet & Sandeep
                    </h2>
                    <p className="text-xs md:text-sm text-[#D4D4D8]">
                      Get to know the personalities, signature quotes, and ask them questions directly.
                    </p>
                    <Link
                      href="/team"
                      className="mt-2 px-5 py-2.5 bg-[#FFC800] text-black font-extrabold text-xs md:text-sm rounded-xl md:rounded-2xl shadow-xl hover:scale-105 transition-transform"
                    >
                      MEET THE TEAM ➔
                    </Link>
                  </div>
                </section>
              );

            /* 4. SOCIAL MEDIA TAB */
            case "social_media":
              return (
                <section key={section.id} className="bg-[#141417] border border-[#27272A] p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col gap-4">
                  <h2 className="text-base md:text-lg font-black text-[#FFC800]">🌐 Connect With Saade Aala Radio</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      { name: "YouTube", url: "https://www.youtube.com/@SaadeAalaRadio" },
                      { name: "Spotify", url: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H" },
                      { name: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
                      { name: "Facebook", url: "https://www.facebook.com/SaadeAalaRadio" },
                      { name: "LinkedIn", url: "https://www.linkedin.com/showcase/saade-aala-radio" },
                      { name: "Snapchat", url: "https://www.snapchat.com/add/saadeaalaradio" },
                    ].map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#09090B] border border-[#27272A] hover:border-[#FFC800] p-3 rounded-xl text-center text-xs font-bold text-white transition-all hover:scale-105"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </section>
              );

            /* 5. MMA ARCADE GAME */
            case "mma_game":
              return (
                <section
                  key={section.id}
                  className="bg-gradient-to-r from-[#141417] via-[#27272A] to-[#141417] border border-[#FFC800]/40 p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl"
                >
                  <div className="flex flex-col gap-2 text-center md:text-left">
                    <span className="text-[10px] font-black text-[#FFC800] tracking-widest uppercase">MINI-GAME</span>
                    <h2 className="text-xl md:text-2xl font-black text-white">8-Bit MMA Arcade Challenge</h2>
                    <p className="text-xs text-[#A1A1AA] max-w-[500px]">
                      Fight through 3 retro rounds starring Harshdeep, Sarabjeet, and Sandeep with special signature moves!
                    </p>
                  </div>
                  <Link
                    href="/game"
                    className="w-full md:w-auto px-8 py-3.5 bg-[#FFC800] text-black font-extrabold text-xs md:text-sm text-center rounded-xl md:rounded-2xl shadow-xl hover:scale-105 transition-transform shrink-0"
                  >
                    PLAY NOW 🎮
                  </Link>
                </section>
              );

            /* 6. SHORT STORIES TAB */
            case "stories":
              return (
                <section key={section.id} className="bg-[#141417] border border-[#27272A] p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base md:text-lg font-black text-white">📖 Short Stories & Blogs</h2>
                    <Link href="/stories" className="text-xs font-bold text-[#FFC800] hover:underline">
                      View All Stories ➔
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-xl md:rounded-2xl flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-[#FFC800]">Harshdeep Singh • 3 min read</span>
                      <h3 className="text-sm font-black text-white">The Unfiltered Truth Behind The Sirsa Trip</h3>
                      <p className="text-xs text-[#A1A1AA] line-clamp-2">
                        We thought it was a 2-hour drive. 14 hours later we were stranded with no phone battery...
                      </p>
                    </div>
                    <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-xl md:rounded-2xl flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-[#FFC800]">Sarabjeet Singh • 2 min read</span>
                      <h3 className="text-sm font-black text-white">Why Microphones Always Fail At The Best Joke</h3>
                      <p className="text-xs text-[#A1A1AA] line-clamp-2">
                        It’s a universal law of comedy podcasting: the punchline will trigger an audio glitch...
                      </p>
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}