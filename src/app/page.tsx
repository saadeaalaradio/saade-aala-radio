"use client";

import Link from "next/link";
import { useState } from "react";

// --- TYPES FOR LIVE EPISODE DATA ---
interface EpisodeData {
  title: string;
  pubDate: string;
  link?: string;       // Made optional so TypeScript won't strictly enforce it
  youtubeId?: string;
  embedUrl?: string;
}

// Placeholder episode object with all required properties included
const placeholderEpisode: EpisodeData = {
  title: "Episode Placeholder: Need your Spotify RSS Feed URL to Auto-Sync!",
  pubDate: "May 15, 2024",
  link: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H",
  youtubeId: "ES6ONFKyEgM",
  embedUrl: "https://open.spotify.com/embed/show/3voSKp0xDQSbzMNVxf239H?utm_source=generator",
};

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<"youtube" | "spotify">("youtube");
  const [episode] = useState<EpisodeData>(placeholderEpisode);
  const [loading] = useState(false);

  // --- INTERACTIVE SOUNDBOARD ENGINE ---
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

        {/* --- SECTION 1: THE DUAL MEDIA PLAYER (YOUTUBE + SPOTIFY) --- */}
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

        {/* --- SECTION 4: ALL 6 SOCIAL MEDIA LINKS --- */}
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
              { name: "Snapchat", handle: "@saadeaalaradio", color: "#FFFC00", url: "https://www.snapchat.com/add/saadeaalaradio", textColor: 'black' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black shadow-md"
                  style={{ backgroundColor: social.color, color: social.textColor || 'white' }}
                >
                  {social.name.charAt(0)}
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