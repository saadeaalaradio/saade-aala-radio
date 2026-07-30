"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export interface HomepageSection {
  id: "webplayer" | "carousel" | "hosts_photo" | "social_media" | "mma_game" | "stories";
  title: string;
  enabled: boolean;
}

const DEFAULT_SECTIONS: HomepageSection[] = [
  { id: "webplayer", title: "1. Webplayer (YouTube + Spotify)", enabled: true },
  { id: "carousel", title: "2. Latest Episode Poster Carousel", enabled: true },
  { id: "hosts_photo", title: "3. Hosts Photo & Meet The Team", enabled: true },
  { id: "social_media", title: "4. Social Media Tab", enabled: true },
  { id: "mma_game", title: "5. MMA Arcade Game", enabled: true },
  { id: "stories", title: "6. Short Stories Tab", enabled: true },
];

export default function HomePage() {
  const [sections, setSections] = useState<HomepageSection[]>(DEFAULT_SECTIONS);
  const [activePlayer, setActivePlayer] = useState<"youtube" | "spotify">("youtube");

  // Load layout preferences from Admin CMS
  useEffect(() => {
    const saved = localStorage.getItem("saade_aala_cms_config");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.homepageSections && Array.isArray(config.homepageSections)) {
          setSections(config.homepageSections);
        }
      } catch (e) {
        console.error("Failed to parse section configuration", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans pb-24 md:pb-12 selection:bg-[#FFC800] selection:text-black">
      
      {/* 💻 DESKTOP HEADER (Monitors / Laptops) */}
      <header className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-[#09090B]/90 border-b border-[#27272A] px-8 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 no-underline">
            <span className="text-2xl font-black tracking-tighter text-[#FFC800]">SAADE AALA</span>
            <span className="text-2xl font-light tracking-widest text-white">RADIO</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-bold text-[#A1A1AA]">
            <Link href="/" className="text-[#FFC800]">Home</Link>
            <Link href="/team" className="hover:text-[#FFC800] transition-colors">Meet The Team</Link>
            <Link href="/stories" className="hover:text-[#FFC800] transition-colors">Short Stories</Link>
            <Link href="/game" className="hover:text-[#FFC800] transition-colors text-[#FFC800]">🎮 MMA Arcade</Link>
            <Link href="/admin" className="px-4 py-2 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-md">
              ADMIN CMS 🔐
            </Link>
          </nav>
        </div>
      </header>

      {/* 📱 MOBILE HEADER (Phones) */}
      <header className="md:hidden sticky top-0 z-50 backdrop-blur-md bg-[#09090B]/95 border-b border-[#27272A] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 no-underline">
          <span className="text-lg font-black text-[#FFC800]">SAADE AALA</span>
          <span className="text-lg font-light text-white">RADIO</span>
        </Link>
        <Link href="/admin" className="px-2.5 py-1 bg-[#FFC800] text-black text-[10px] font-black rounded-lg">
          CMS 🔐
        </Link>
      </header>

      {/* DYNAMIC CONTENT CONTAINER */}
      <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-8 md:gap-12">

        {sections.map((section) => {
          if (!section.enabled) return null;

          switch (section.id) {
            
            /* 1. WEBPLAYER (YOUTUBE + SPOTIFY) */
            case "webplayer":
              return (
                <section key={section.id} className="bg-[#141417] border border-[#27272A] p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 flex flex-col gap-3 w-full">
                    <span className="text-[10px] md:text-xs font-black text-[#FFC800] tracking-widest uppercase">NOW STREAMING</span>
                    <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">Latest Podcast Episode</h1>
                    <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed">
                      Join Harshdeep, Sarabjeet, and Sandeep as they dive into raw Punjabi banter, viral stories, and unscripted laughs.
                    </p>

                    <div className="flex bg-[#09090B] p-1 rounded-xl border border-[#27272A] self-start mt-2">
                      <button
                        onClick={() => setActivePlayer("youtube")}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activePlayer === "youtube" ? "bg-[#FFC800] text-black" : "text-[#A1A1AA]"
                        }`}
                      >
                        📹 YouTube
                      </button>
                      <button
                        onClick={() => setActivePlayer("spotify")}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activePlayer === "spotify" ? "bg-[#FFC800] text-black" : "text-[#A1A1AA]"
                        }`}
                      >
                        🎧 Spotify
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-[480px] aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden border border-[#27272A] shrink-0">
                    {activePlayer === "youtube" ? (
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/videoseries?list=PL3oW2tjiIx8m7jU"
                        title="Saade Aala Radio YouTube Episode"
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

            /* 2. POSTER CAROUSEL OF LATEST EPISODES */
            case "carousel":
              return (
                <section key={section.id} className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base md:text-xl font-black text-white">🔥 Recent Episode Posters</h2>
                    <span className="text-[10px] md:text-xs text-[#A1A1AA]">Swipe ➔</span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#FFC800]">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className="min-w-[180px] md:min-w-[220px] bg-[#141417] border border-[#27272A] p-3 rounded-2xl flex flex-col gap-2 shrink-0 hover:border-[#FFC800] transition-colors"
                      >
                        <div className="aspect-square w-full rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-center text-xs text-[#71717A] font-bold">
                          POSTER {item} (1:1)
                        </div>
                        <span className="text-xs font-black text-white line-clamp-1">Episode #{item} - Sirsa Special</span>
                        <span className="text-[10px] text-[#FFC800] font-bold">45 mins • Comedy</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            /* 3. STATIC PHOTO OF 3 HOSTS + MEET THE TEAM BUTTON */
            case "hosts_photo":
              return (
                <section key={section.id} className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#27272A] bg-[#141417] min-h-[280px] md:min-h-[380px] flex items-end p-6 md:p-10 shadow-2xl">
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
                <section key={section.id} className="bg-gradient-to-r from-[#141417] via-[#27272A] to-[#141417] border border-[#FFC800]/40 p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
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

      {/* 📱 MOBILE BOTTOM NAVIGATION BAR (Sticky Phone Dock) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#09090B]/95 backdrop-blur-md border-t border-[#27272A] px-6 py-2.5 flex justify-between items-center text-center shadow-2xl">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-[#FFC800]">
          <span className="text-base">🏠</span>
          <span className="text-[9px] font-bold">Home</span>
        </Link>
        <Link href="/team" className="flex flex-col items-center gap-0.5 text-[#A1A1AA]">
          <span className="text-base">🎙️</span>
          <span className="text-[9px] font-bold">Team</span>
        </Link>
        <Link href="/stories" className="flex flex-col items-center gap-0.5 text-[#A1A1AA]">
          <span className="text-base">📖</span>
          <span className="text-[9px] font-bold">Stories</span>
        </Link>
        <Link href="/game" className="flex flex-col items-center gap-0.5 text-[#A1A1AA]">
          <span className="text-base">🎮</span>
          <span className="text-[9px] font-bold">Arcade</span>
        </Link>
      </nav>

      {/* FOOTER */}
      <footer className="hidden md:block py-8 border-t border-[#27272A] text-center text-xs text-[#A1A1AA]">
        <p>Saade Aala Radio • Built by <strong className="text-white">Creative Benchers</strong></p>
      </footer>

    </div>
  );
}