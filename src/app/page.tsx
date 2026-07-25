"use client";

import { useState, useEffect } from "react";

interface EpisodeData {
  title: string;
  pubDate: string;
  link: string;
  embedUrl?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("youtube");
  const [episode, setEpisode] = useState<EpisodeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Latest featured YouTube video from Saade Aala Radio channel
  const latestYouTubeVideoId = "ES6ONFKyEgM"; 

  useEffect(() => {
    async function loadLatestEpisode() {
      try {
        const res = await fetch("/api/podcast");
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
    alert(`Playing sound effect: ${soundName}`);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B]">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* Header Navigation */}
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

        {/* Hero Card: Dynamic Episode Auto-Sync */}
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

          {/* Toggle Tabs */}
          <div className="flex bg-[#09090B] p-1 rounded-xl border border-[#27272A] mb-4">
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
          </div>

          {/* Player Container */}
          <div className="w-full aspect-video bg-black rounded-2xl border border-[#27272A] overflow-hidden flex items-center justify-center">
            {activeTab === "youtube" ? (
              <iframe
                src={`https://www.youtube.com/embed/${latestYouTubeVideoId}?autoplay=0&rel=0`}
                title="Saade Aala Radio Latest Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : episode?.embedUrl ? (
              <iframe
                src={episode.embedUrl}
                title="Saade Aala Radio Spotify Player"
                className="w-full h-full border-0"
                allow="encrypted-media"
              />
            ) : (
              <p className="text-xs text-[#A1A1AA] p-4 text-center">
                🎧 Syncing latest Spotify episode...
              </p>
            )}
          </div>
        </section>

        {/* Fan Soundboard */}
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

            <button
              onClick={() => playSound("Catchphrase")}
              className="flex justify-between items-center bg-[#141417] border border-[#27272A] hover:border-[#FFC800] p-3.5 rounded-2xl text-xs font-medium text-white transition-all active:scale-95"
            >
              <span>Catchphrase</span>
              <span className="text-[#FFC800] text-[10px]">▶</span>
            </button>

            <button
              onClick={() => playSound("Drumroll")}
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