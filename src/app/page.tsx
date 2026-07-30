"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [activePlayer, setActivePlayer] = useState<"youtube" | "spotify">("youtube");

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      
      {/* GLOBAL NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090B]/80 border-b border-[#27272A] px-6 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl font-black tracking-tighter text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-2xl font-light tracking-widest text-white">
              RADIO
            </span>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="flex items-center gap-6 text-sm font-bold text-[#A1A1AA]">
            <Link href="/" className="text-[#FFC800] hover:text-[#FFC800] transition-colors">
              Home
            </Link>
            <Link href="/team" className="hover:text-[#FFC800] transition-colors">
              Meet The Team
            </Link>
            <Link href="/stories" className="hover:text-[#FFC800] transition-colors">
              Short Stories
            </Link>
            <Link href="/game" className="hover:text-[#FFC800] transition-colors border border-[#FFC800]/30 px-3 py-1 rounded-full text-[#FFC800] bg-[#FFC800]/10">
              🎮 MMA Arcade
            </Link>
          </nav>

          {/* Admin Quick Switch */}
          <Link
            href="/admin"
            className="text-xs font-extrabold text-black bg-[#FFC800] px-4 py-2 rounded-xl hover:bg-[#FFC800]/90 transition-all shadow-md"
          >
            ADMIN CMS 🔐
          </Link>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col gap-10">

        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row gap-8 items-center bg-[#141417] border border-[#27272A] p-8 rounded-3xl shadow-2xl">
          <div className="flex-1 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20 self-start">
              🔥 PUNJABI COMEDY PODCAST
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Unfiltered Chaos, Deep Laughs & Wild Stories.
            </h1>
            <p className="text-sm md:text-base text-[#A1A1AA] leading-relaxed">
              Join Harshdeep, Sarabjeet, and Sandeep every week as they dive into raw discussions, viral roasts, and unscripted life experiences.
            </p>

            <div className="flex gap-4 pt-2">
              <Link href="/team" className="px-6 py-3 bg-[#FFC800] text-black font-extrabold text-xs md:text-sm rounded-2xl shadow-lg hover:scale-105 transition-transform">
                MEET THE HOSTS 🎙️
              </Link>
              <Link href="/stories" className="px-6 py-3 bg-white/5 border border-[#27272A] text-white font-extrabold text-xs md:text-sm rounded-2xl hover:border-[#FFC800] transition-colors">
                READ STORIES 📖
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[420px] shrink-0 bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
            {/* Player Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-[#141417] p-1 rounded-xl border border-[#27272A]">
              <button
                onClick={() => setActivePlayer("youtube")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  activePlayer === "youtube" ? "bg-[#FFC800] text-black" : "text-[#A1A1AA]"
                }`}
              >
                📹 YouTube Video
              </button>
              <button
                onClick={() => setActivePlayer("spotify")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  activePlayer === "spotify" ? "bg-[#FFC800] text-black" : "text-[#A1A1AA]"
                }`}
              >
                🎧 Spotify Audio
              </button>
            </div>

            {/* Embedded Player */}
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-[#27272A]">
              {activePlayer === "youtube" ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PL3oW2tjiIx8m7jU"
                  title="Saade Aala Radio Latest Episode"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://open.spotify.com/embed/show/3voSKp0xDQSbzMNVxf239H"
                  title="Spotify Podcast Player"
                  allow="encrypted-media"
                />
              )}
            </div>
          </div>
        </section>

        {/* SOUNDBOARD & SHOWCASE GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-lg font-black text-[#FFC800]">🔊 INSTANT SOUNDBOARD</h2>
            <p className="text-xs text-[#A1A1AA]">Tap any button to trigger iconic punchlines from the hosts:</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Tension Nahi Leni", host: "Harshdeep" },
                { label: "Khatam Main Karunga", host: "Sarabjeet" },
                { label: "Dimaag Ghumaya Karo", host: "Sandeep" },
                { label: "Ambala Kick!", host: "MMA Move" },
                { label: "Sirsa Shortcut", host: "Classic Tale" },
                { label: "Mic Leak Flood", host: "Behind Scenes" },
              ].map((sound, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Playing: "${sound.label}"`)}
                  className="bg-[#09090B] border border-[#27272A] hover:border-[#FFC800] p-3 rounded-2xl flex flex-col items-start gap-1 active:scale-95 transition-all"
                >
                  <span className="text-xs font-black text-white">{sound.label}</span>
                  <span className="text-[10px] text-[#FFC800] font-bold">{sound.host}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Arcade Banner */}
          <div className="bg-gradient-to-br from-[#141417] to-[#27272A] border border-[#FFC800]/30 p-6 rounded-3xl flex flex-col justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold text-[#FFC800] uppercase tracking-widest">MINI-GAME</span>
              <h3 className="text-xl font-black text-white mt-1">8-Bit MMA Battle</h3>
              <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                Fight as Harshdeep, Sarabjeet, or Sandeep in a 3-round retro arcade match!
              </p>
            </div>
            <Link
              href="/game"
              className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs text-center rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              PLAY ARCADE GAME 🎮
            </Link>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-12 py-8 border-t border-[#27272A] text-center text-xs text-[#A1A1AA] flex flex-col gap-4">
        <div className="flex justify-center gap-6 font-semibold">
          <Link href="/" className="hover:text-[#FFC800]">Home</Link>
          <Link href="/team" className="hover:text-[#FFC800]">Meet The Team</Link>
          <Link href="/stories" className="hover:text-[#FFC800]">Short Stories</Link>
          <Link href="/admin" className="hover:text-[#FFC800]">Admin CMS</Link>
        </div>
        <p>Created by <strong className="text-white">Creative Benchers</strong></p>
      </footer>

    </div>
  );
}