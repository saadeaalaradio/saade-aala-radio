"use client";

import Link from "next/link";
import { useState } from "react";

// Inline SVG Logos for Social Media Platforms
const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "YouTube":
      return (
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case "Spotify":
      return (
        <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.36.18.48.66.301 1.02zm1.48-3.24c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.38-1.38 9.841-.72 13.56 1.56.36.239.54.84.181 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z"/>
        </svg>
      );
    case "Instagram":
      return (
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      );
    case "Facebook":
      return (
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case "Snapchat":
      return (
        <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
          <path d="M12.016 2.012c-4.407 0-6.937 2.973-6.937 5.766 0 1.18.375 2.238 1.031 3.094-.188.422-.609.914-1.266 1.242a.563.563 0 0 0-.258.68c.117.28.398.445.688.406 1.055-.14 1.898-.68 2.39-1.125.188.164.399.305.633.422-1.078 1.289-3.234 1.969-5.18 2.039a.563.563 0 0 0-.539.563c.023.773.703 1.289 1.43 1.195 1.734-.234 3.258-.89 4.313-1.688.188.234.398.445.633.633-1.078 1.359-2.906 2.32-4.992 2.672a.563.563 0 0 0-.469.656c.07.305.344.516.656.516a8.88 8.88 0 0 0 1.266-.094c2.813-.422 5.156-1.805 6.422-3.609.188.023.375.047.563.047.188 0 .375-.024.563-.047 1.266 1.804 3.609 3.187 6.422 3.609.422.07.844.117 1.266.094a.563.563 0 0 0 .187-1.172c-2.086-.352-3.914-1.313-4.992-2.672.235-.188.445-.399.633-.633 1.055.798 2.578 1.454 4.313 1.688.727.094 1.407-.422 1.43-1.195a.563.563 0 0 0-.539-.563c-1.946-.07-4.102-.75-5.18-2.039.234-.117.445-.258.633-.422.492.445 1.335.985 2.39 1.125.29.039.57-.126.688-.406a.563.563 0 0 0-.258-.68c-.657-.328-1.078-.82-1.266-1.242.656-.856 1.031-1.914 1.031-3.094 0-2.793-2.53-5.766-6.937-5.766z"/>
        </svg>
      );
    default:
      return null;
  }
};

// --- TYPES FOR LIVE EPISODE DATA ---
interface EpisodeData {
  title: string;
  pubDate: string;
  link?: string;
  youtubeId?: string;
  embedUrl?: string;
}

const placeholderEpisode: EpisodeData = {
  title: "Episode Placeholder: Need your Spotify RSS Feed URL to Auto-Sync!",
  pubDate: "May 15, 2024",
  link: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H",
  youtubeId: "ES6ONFKyEgM",
  embedUrl: "https://open.spotify.com/embed/show/3voSKp0xDQSbzMNVxf239H?utm_source=generator",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"youtube" | "spotify">("youtube");
  const [episode] = useState<EpisodeData>(placeholderEpisode);
  const [loading] = useState(false);

  const playSound = (soundDescription: string) => {
    alert(`🔊 Playing Sound Effect: ${soundDescription}`);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-xl font-light tracking-widest text-white">
              RADIO
            </span>
          </div>
          <Link
            href="/team"
            className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800] hover:text-[#FFC800] transition-colors"
          >
            TEAM →
          </Link>
        </header>

        {/* --- SECTION 1: THE DUAL MEDIA PLAYER --- */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181C] to-[#141417] border border-[#27272A] p-6 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFC800]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20 mb-4">
            ⚡ LATEST EPISODE {loading ? "(Syncing...)" : ""}
          </div>

          <h1 className="text-lg font-bold text-white leading-snug mb-1">
            {episode.title}
          </h1>
          <p className="text-xs text-[#A1A1AA] mb-4">
            Auto-Synced • {episode.pubDate}
          </p>

          {/* Player Toggle Tabs */}
          <div className="flex bg-[#09090B] p-1 rounded-xl border border-[#27272A] mb-4">
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "youtube"
                  ? "bg-[#FF0000] text-white shadow-md"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              YouTube Video
            </button>
            <button
              onClick={() => setActiveTab("spotify")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "spotify"
                  ? "bg-[#1DB954] text-black shadow-md"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              Spotify Audio
            </button>
          </div>

          {/* Aspect-Ratio Player Viewport */}
          <div className="w-full aspect-video bg-black rounded-2xl border border-[#27272A] overflow-hidden flex items-center justify-center relative">
            
            {/* YouTube Embed Player */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'youtube' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              {episode.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${episode.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                  title="Saade Aala Radio Latest YouTube Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <p className="text-xs text-[#A1A1AA] p-4 text-center">Video Sync Pending RSS...</p>
              )}
            </div>

            {/* Spotify Embed Player */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'spotify' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <iframe
                src={episode.embedUrl}
                title="Saade Aala Radio Latest Spotify Episode"
                className="w-full h-full border-0"
                allow="encrypted-media"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: FUN SOUNDBOARDS --- */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#A1A1AA] tracking-wider">
            <span>FUN SOUNDBOARD</span>
            <span className="text-[#FFC800]">TAP TO PLAY</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              "Iconic Sirsa Laugh",
              "Sarabjeet Comeback",
              "Sandeep Cunning Smile",
              "Harsh Rant Alert",
            ].map((soundName) => (
              <button
                key={soundName}
                onClick={() => playSound(soundName)}
                className="flex justify-between items-center bg-[#141417] border border-[#27272A] hover:border-[#FFC800] p-3.5 rounded-2xl text-xs font-medium text-white transition-all active:scale-95 group"
              >
                <span>{soundName}</span>
                <span className="text-[#FFC800] text-[10px] group-hover:animate-pulse">▶</span>
              </button>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: MMA GAME SPOTLIGHT --- */}
        <section>
          <Link
            href="/game"
            className="flex items-center justify-between bg-gradient-to-r from-[#18181C] to-[#141417] border-2 border-[#FFC800]/20 p-4 rounded-3xl hover:border-[#FFC800] transition-all group shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC800]/20 flex items-center justify-center text-lg">
                🥊
              </div>
              <div>
                <div className="text-xs font-black text-white group-hover:text-[#FFC800] transition-colors">
                  SAADE AALA MMA ARCADE
                </div>
                <div className="text-[10px] text-[#A1A1AA]">
                  Best of 3 8-bit battle! Can you win?
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#FFC800]">PLAY →</span>
          </Link>
        </section>

        {/* --- SECTION 4: SOCIAL MEDIA LINKS WITH OFFICIAL SVG LOGOS --- */}
        <section className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-[#A1A1AA] tracking-wider">
            CONNECT & SUBSCRIBE
          </div>

          <div className="bg-[#141417] border border-[#27272A] rounded-2xl p-3 grid grid-cols-2 gap-2.5">
            {[
              { name: "YouTube", handle: "@SaadeAalaRadio", color: "#FF0000", url: "https://www.youtube.com/@SaadeAalaRadio" },
              { name: "Spotify", handle: "Listen Free", color: "#1DB954", url: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H" },
              { name: "Instagram", handle: "@saadeaalaradio", color: "#E4405F", url: "https://www.instagram.com/saadeaalaradio" },
              { name: "Facebook", handle: "Saade Aala Radio", color: "#1877F2", url: "https://www.facebook.com/SaadeAalaRadio" },
              { name: "LinkedIn", handle: "Comedy Hub", color: "#0077B5", url: "https://www.linkedin.com/showcase/saade-aala-radio" },
              { name: "Snapchat", handle: "@saadeaalaradio", color: "#FFFC00", url: "https://www.snapchat.com/add/saadeaalaradio" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all active:scale-95 group"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: social.color }}
                >
                  <SocialIcon name={social.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{social.name}</div>
                  <div className="text-[9px] text-[#A1A1AA] truncate">{social.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}