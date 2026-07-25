"use client";

import { useState, useEffect } from "react";

interface EpisodeData {
  title: string;
  pubDate: string;
  link: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("spotify");
  const [episode, setEpisode] = useState<EpisodeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest episode dynamically on page load
  useEffect(() => {
    async function loadLatestEpisode() {
      try {
        const res = await fetch("/api/podcast");
        const data = await res.json();
        if (data && !data.error) {
          setEpisode(data);
        }
      } catch (err) {
        console.error("Error loading feed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLatestEpisode();
  }, []);

  const playSound = (soundName: string) => {
    alert(`Playing sound: ${soundName}`);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-xl font-light tracking-widest text-white">
              RADIO
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5">
            OFFICIAL SITE
          </span>
        </header>

        {/* Hero Card: Auto-Synced Latest Episode */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181C] to-[#141417] border border-[#27272A] p-6 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7000E0]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20 mb-4">
            ⚡ LATEST EPISODE
          </div>

          <h1 className="text-lg font-bold text-white leading-snug mb-1">
            {loading ? "Fetching latest episode..." : episode?.title || "EP #42: Late Night Comedy Special"}
          </h1>
          <p className="text-xs text-[#A1A1AA] mb-4">
            {episode?.pubDate ? `Released • ${new Date(episode.pubDate).toLocaleDateString()}` : "Auto-Updating Feed"}
          </p>

          {/* Platform Toggle */}
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

          {/* Dynamic Embed Player Frame */}
          <div className="w-full aspect-video bg-black rounded-2xl border border-[#27272A] flex items-center justify-center text-xs text-[#A1A1AA] overflow-hidden">
            {activeTab === "spotify" ? (
              <p className="p-4 text-center">
                🎧 [ Auto-Sync Spotify Player Embed ]
              </p>
            ) : (
              <p className="p-4 text-center">
                📺 [ Auto-Sync YouTube Video Embed ]
              </p>
            )}
          </div>
        </section>

        {/* Interactive Soundboard */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#A1A1AA] tracking-wider">
            <span>FUN SOUNDBOARD</span>
            <span className="text-[#FFC800]">TAP TO PLAY</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => playSound("Wheeze Laugh")}
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

            <button
              onClick={() => playSound("Catchphrase")}
              className="flex justify-between items-center bg-[#141417] border border-[#27272A] hover:border-[#FFC800] p-3.5 rounded-2xl text-xs font-medium text-white transition-all active:scale-95"
            >
              <span>Catchphrase</span>
              <span className="text-[#FFC800] text-[10px]">▶</span>
            </button>

            <button
              onClick={() => playSound("Drum Roll")}
              className="flex justify-between items-center bg-[#141417] border border-[#27272A] hover:border-[#FFC800] p-3.5 rounded-2xl text-xs font-medium text-white transition-all active:scale-95"
            >
              <span>Drum Roll</span>
              <span className="text-[#FFC800] text-[10px]">▶</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}