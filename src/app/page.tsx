"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Types for our live-synced episode data
interface EpisodeData {
  title: string;
  pubDate: string;
  link: string;
  embedUrl?: string; // We'll generate this
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("spotify");
  const [episode, setEpisode] = useState<EpisodeData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetching the Spotify RSS feed (Placeholder logic until we have your URL)
  // We'll set this up formally once you provide the RSS URL.
  useEffect(() => {
    async function loadLatestEpisode() {
      try {
        const res = await fetch("/api/podcast"); // We'll build this API route
        const data = await res.json();
        if (data && !data.error) {
          setEpisode(data);
        }
      } catch (err) {
        console.error("Error loading RSS feed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLatestEpisode();
  }, []);

  const playSound = (soundName: string) => {
    // We'll add the real audio synthesis engine here in a future step!
    alert(`Playing sound effect: ${soundName}`);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA]">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* Header Navigation (Cleaned Up) */}
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#FFC800]">
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
            MEET THE TEAM →
          </Link>
        </header>

        {/* 1. Hero Player: DYNAMIC EPISODE AUTO-SYNC */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181C] to-[#141417] border border-[#27272A] p-6 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7000E0]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20 mb-4">
            ⚡ LATEST EPISODE
          </div>

          <h1 className="text-lg font-bold text-white leading-snug mb-1">
            {loading ? "Fetching latest upload..." : episode?.title || "We Went to Sirsa... Biggest Mistake Ever"}
          </h1>
          <p className="text-xs text-[#A1A1AA] mb-4">
            {episode?.pubDate
              ? `Released • ${new Date(episode.pubDate).toLocaleDateString()}`
              : "Auto-Synced Feed"}
          </p>

          {/* Toggle Tabs (Spotify vs Youtube) */}
          <div className="flex bg-[#09090B] p-1 rounded-xl border border-[#27272A] mb-4">
            <button
              onClick={() => setActiveTab("spotify")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "spotify"
                  ? "bg-[#1DB954] text-black"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              Spotify Audio
            </button>
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "youtube"
                  ? "bg-[#FF0000] text-white"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              YouTube Video
            </button>
          </div>

          {/* Player Container (Where the Embeds live) */}
          <div className="w-full aspect-video bg-black rounded-2xl border border-[#27272A] overflow-hidden flex items-center justify-center">
            {activeTab === "spotify" && episode?.embedUrl ? (
              <iframe
                src={episode.embedUrl}
                title="Saade Aala Radio Spotify Player"
                className="w-full h-full border-0"
                allow="encrypted-media"
              />
            ) : activeTab === "youtube" ? (
              // Hardcoded placeholder until we connect YouTube channel
              <iframe
                src="https://www.youtube.com/embed/ES6ONFKyEgM?autoplay=0&rel=0"
                title="Saade Aala Radio Latest Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="text-xs text-[#A1A1AA] p-4 text-center">
                🎧 Syncing latest Spotify episode...
              </p>
            )}
          </div>
        </section>

        {/* 🎮 8-Bit MMA Game Link (Your Version 1.0 benchmark!) */}
        <section>
          <Link
            href="/game"
            className="flex items-center justify-between bg-gradient-to-r from-[#18181C] to-[#141417] border border-[#FFC800]/40 p-4 rounded-2xl hover:border-[#FFC800] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC800]/20 flex items-center justify-center text-lg">
                🥊
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#FFC800] transition-colors">
                  SAADE AALA MMA ARCADE
                </div>
                <div className="text-[10px] text-[#A1A1AA]">
                  The benchmark: Best of 3 8-bit battle!
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#FFC800]">PLAY →</span>
          </Link>
        </section>

        {/* 🎭 Host Lineup spotlight (Interactive 3D Stage) */}
        <section className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-[#A1A1AA] tracking-wider">
            YOUR HOSTS
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { name: "Harshdeep", initial: "H", color: "#FFC800" },
              { name: "Sarabjeet", initial: "S", color: "#7000E0" },
              { name: "Sandeep", initial: "S", color: "#FF4500" },
            ].map((host) => (
              <div
                key={host.name}
                className="bg-[#141417] border border-[#27272A] p-4 rounded-2xl flex flex-col items-center gap-1.5 group hover:border-[#FFC800]/40 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-xl"
                  style={{ backgroundColor: host.color }}
                >
                  {host.initial}
                </div>
                <span className="text-xs font-semibold text-white">
                  {host.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Fan Soundboard (Tap to play) */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#A1A1AA] tracking-wider">
            <span>FUN SOUNDBOARD</span>
            <span className="text-[#FFC800]">TAP TO PLAY</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => playSound("Sirsa Story Laugh")}
              className="flex justify-between items-center bg-[#141417] border border-[#27272A] hover:border-[#FFC800] p-3.5 rounded-2xl text-xs font-medium text-white transition-all active:scale-95"
            >
              <span>Iconic Laugh</span>
              <span className="text-[#FFC800] text-[10px]">▶</span>
            </button>

            <button
              onClick={() => playSound("Airhorn")}
              className="flex justify-between items-center bg-[#141417] border border-[#27272A] hover:border-[#FFC800] p-3.5 rounded-2xl text-xs font-medium text-white transition-all active:scale-95"
            >
              <span>Airhorn</span>
              <span className="text-[#FFC800] text-[10px]">▶</span>
            </button>
          </div>
        </section>

        {/* Connect & Subscribe Block (YouTube, Spotify, etc.) */}
        <section className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-[#A1A1AA] tracking-wider">
            CONNECT & SUBSCRIBE
          </div>

          <div className="bg-[#141417] border border-[#27272A] rounded-2xl p-3 flex flex-col gap-2">
            {[
              { name: "YouTube", handle: "@SaadeAalaRadio", color: "#FF0000" },
              { name: "Spotify", handle: "Listen Free", color: "#1DB954" },
              { name: "Instagram", handle: "@SaadeAalaRadio", color: "#E4405F" },
            ].map((social) => (
              <div
                key={social.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: social.color }}
                  >
                    {social.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{social.name}</div>
                    <div className="text-[10px] text-[#A1A1AA]">{social.handle}</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#FFC800]">Subscribe →</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}