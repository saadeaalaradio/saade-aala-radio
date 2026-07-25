"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Host {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarLetter: string;
  instagram: string;
  snapchat: string;
  accentColor: string;
}

interface EpisodeData {
  title: string;
  pubDate: string;
  link: string;
  embedUrl?: string;
}

const hostsData: Host[] = [
  {
    id: "harshdeep",
    name: "Harshdeep Singh",
    role: "Founder & Co-Host",
    bio: "Chaotic stories & daily rants.",
    avatarLetter: "H",
    instagram: "https://www.instagram.com/harshdeep243",
    snapchat: "https://www.snapchat.com/@harshdeep_243",
    accentColor: "#FFC800",
  },
  {
    id: "sarabjeet",
    name: "Sarabjeet Singh",
    role: "Co-Host",
    bio: "Master of comebacks & banter.",
    avatarLetter: "S",
    instagram: "https://www.instagram.com/sarabjeet_00001",
    snapchat: "https://www.snapchat.com/@sarabjeet0033",
    accentColor: "#7000E0",
  },
  {
    id: "sandeep",
    name: "Sandeep Singh",
    role: "Co-Host",
    bio: "Wild card & hot takes.",
    avatarLetter: "S",
    instagram: "https://www.instagram.com/saandeep_ambala_official",
    snapchat: "https://www.snapchat.com/@puadh_aale",
    accentColor: "#FF4500",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("youtube");
  const [episode, setEpisode] = useState<EpisodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeHost, setActiveHost] = useState<Host>(hostsData[0]);

  // Latest featured YouTube video ID
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
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA]">
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
          <Link
            href="/team"
            className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800] hover:text-[#FFC800] transition-colors"
          >
            FULL TEAM →
          </Link>
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

        {/* 🎭 Interactive 3-Host Lineup Card */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#A1A1AA] tracking-wider">
            <span>MEET THE HOSTS</span>
            <span className="text-[#FFC800]">TAP A HOST</span>
          </div>

          <div className="relative overflow-hidden bg-[#141417] border border-[#27272A] rounded-2xl p-5 flex flex-col gap-5">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FFC800]/10 blur-3xl rounded-full pointer-events-none" />

            {/* Host Standing Stage */}
            <div className="flex items-end justify-center gap-3 pt-2 pb-1">
              {hostsData.map((host) => {
                const isSelected = activeHost.id === host.id;
                return (
                  <button
                    key={host.id}
                    onClick={() => setActiveHost(host)}
                    onMouseEnter={() => setActiveHost(host)}
                    className={`relative flex flex-col items-center transition-all duration-300 transform outline-none cursor-pointer ${
                      isSelected
                        ? "scale-110 -translate-y-2 z-10"
                        : "scale-90 opacity-60 hover:opacity-100 z-0"
                    }`}
                  >
                    {/* Active Host Glow Circle */}
                    <div
                      className={`w-20 h-28 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 shadow-xl ${
                        isSelected
                          ? "border-[#FFC800] bg-gradient-to-b from-white/10 to-[#09090B]"
                          : "border-[#27272A] bg-[#09090B]"
                      }`}
                      style={{
                        borderColor: isSelected ? host.accentColor : "#27272A",
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md mb-1"
                        style={{
                          backgroundColor: host.accentColor,
                        }}
                      >
                        {host.avatarLetter}
                      </div>
                      <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-[70px]">
                        {host.name.split(" ")[0]}
                      </span>
                    </div>

                    {/* Stage Shadow / Spotlight */}
                    {isSelected && (
                      <div
                        className="w-16 h-2 rounded-full blur-sm mt-1 animate-pulse"
                        style={{ backgroundColor: host.accentColor }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Host Info Panel */}
            <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-4 flex flex-col gap-2.5 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {activeHost.name}
                  </h3>
                  <p
                    className="text-[11px] font-semibold mt-0.5"
                    style={{ color: activeHost.accentColor }}
                  >
                    {activeHost.role}
                  </p>
                </div>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[#A1A1AA]">
                  ACTIVE
                </span>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {activeHost.bio}
              </p>

              {/* Host Socials */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#27272A]">
                <a
                  href={activeHost.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#A1A1AA] hover:text-[#FFC800] transition-colors"
                >
                  📷 Instagram →
                </a>
                <a
                  href={activeHost.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#A1A1AA] hover:text-[#FFC800] transition-colors"
                >
                  👻 Snapchat →
                </a>
              </div>
            </div>
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

        {/* Social & Media Hub Block with Brand Logos */}
        <section className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-[#A1A1AA] tracking-wider">
            CONNECT & SUBSCRIBE
          </div>

          <div className="bg-[#141417] border border-[#27272A] rounded-2xl p-4 flex flex-col gap-3">
            
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@SaadeAalaRadio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF0000]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#FF0000]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">YouTube</div>
                  <div className="text-[10px] text-[#A1A1AA]">@SaadeAalaRadio</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">Subscribe →</span>
            </a>

            {/* Spotify */}
            <a
              href="https://open.spotify.com/show/4O3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#1DB954] hover:bg-[#1DB954]/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1DB954]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#1DB954]" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.293c-.218.358-.684.473-1.04.254-2.857-1.747-6.454-2.143-10.692-1.173-.404.093-.807-.165-.9-.569-.092-.404.166-.807.57-.9 4.636-1.06 8.604-.606 11.808 1.353.356.22.472.683.254 1.035zm1.464-3.253c-.274.446-.86.587-1.306.313-3.268-2.008-8.25-2.59-12.115-1.417-.5.152-1.026-.13-1.178-.63-.153-.5.13-1.026.63-1.178 4.417-1.34 9.91-.69 13.655 1.606.446.274.588.86.314 1.306zm.126-3.41c-3.92-2.327-10.38-2.542-14.137-1.402-.613.186-1.259-.166-1.445-.78-.186-.612.167-1.258.78-1.444 4.312-1.31 11.447-1.05 15.96 1.63.553.328.737 1.042.41 1.594-.328.553-1.042.738-1.568.402z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Spotify</div>
                  <div className="text-[10px] text-[#A1A1AA]">Saade Aala Radio Podcast</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">Listen →</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/harshdeep243"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E4405F] hover:bg-[#E4405F]/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E4405F]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#E4405F]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Instagram</div>
                  <div className="text-[10px] text-[#A1A1AA]">Reels & Clips</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">Follow →</span>
            </a>

            {/* Snapchat */}
            <a
              href="https://www.snapchat.com/@harshdeep_243"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FFFC00] hover:bg-[#FFFC00]/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFFC00]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#FFFC00]" viewBox="0 0 24 24">
                    <path d="M12.022 1.5c-4.835 0-7.393 3.518-7.393 6.271 0 1.954.898 3.328 1.83 4.135.263.227.355.432.227.773-.136.363-.454 1.158-.59 1.498-.068.181-.182.25-.386.181-.613-.204-1.748-.567-2.815-.159-.976.363-1.408 1.294-.795 2.112.568.749 2.044 1.112 3.406 1.112.386 0 .727-.045.999-.113.318-.091.545.023.681.25.386.636 1.453 2.18 4.836 2.18 3.383 0 4.45-1.544 4.836-2.18.136-.227.363-.341.681-.25.272.068.613.113.999.113 1.362 0 2.838-.363 3.406-1.112.613-.818.181-1.749-.795-2.112-1.067-.408-2.202-.045-2.815.159-.204.069-.318 0-.386-.181-.136-.34-.454-1.135-.59-1.498-.128-.341-.036-.546.227-.773.932-.807 1.83-2.181 1.83-4.135 0-2.753-2.558-6.271-7.393-6.271z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Snapchat</div>
                  <div className="text-[10px] text-[#A1A1AA]">Behind The Scenes</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">Add →</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1877F2]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Facebook</div>
                  <div className="text-[10px] text-[#A1A1AA]">Saade Aala Radio Page</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">Follow →</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LinkedIn</div>
                  <div className="text-[10px] text-[#A1A1AA]">Official Business Page</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">Connect →</span>
            </a>

          </div>
        </section>

      </main>
    </div>
  );
}