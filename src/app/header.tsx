"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [headerLogo, setHeaderLogo] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_cms_config");
      if (saved) {
        try {
          const config = JSON.parse(saved);
          if (config.headerLogoUrl) setHeaderLogo(config.headerLogoUrl);
        } catch (e) {
          console.error("Error reading header logo", e);
        }
      }
    }
  }, []);

  return (
    <>
      {/* 💻 DESKTOP HEADER */}
      <header className="hidden md:block sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/90 border-b border-[#27272A] px-8 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            {headerLogo && (
              <img
                src={headerLogo}
                alt="Saade Aala Radio Logo"
                className="h-10 w-auto object-contain"
              />
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tighter text-[#FFC800]">
                SAADE AALA
              </span>
              <span className="text-2xl font-light tracking-widest text-white">
                RADIO
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-bold text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#FFC800] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#FFC800] transition-colors">About Us</Link>
            <Link href="/team" className="hover:text-[#FFC800] transition-colors">Meet The Team</Link>
            <Link href="/stories" className="hover:text-[#FFC800] transition-colors">Short Stories</Link>
            <Link href="/game" className="hover:text-[#FFC800] transition-colors text-[#FFC800]">🎮 MMA Arcade</Link>
          </nav>
        </div>
      </header>

      {/* 📱 MOBILE HEADER */}
      <header className="md:hidden sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/95 border-b border-[#27272A] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          {headerLogo && (
            <img
              src={headerLogo}
              alt="Saade Aala Radio Logo"
              className="h-8 w-auto object-contain"
            />
          )}
          <div className="flex items-center gap-1">
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA</span>
            <span className="text-lg font-light text-white">RADIO</span>
          </div>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-white bg-[#141417] border border-[#27272A] rounded-xl text-lg flex items-center justify-center active:scale-95"
          aria-label="Open Navigation Menu"
        >
          ☰
        </button>
      </header>

      {/* 📱 MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-[280px] h-full bg-[#141417] border-l border-[#27272A] p-6 flex flex-col justify-between z-10 shadow-2xl">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-[#FFC800]">SAADE AALA</span>
                  <span className="text-xs text-white">NAVIGATION</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#A1A1AA] bg-[#09090B] border border-[#27272A] px-2.5 py-1 rounded-lg"
                >
                  ✕ CLOSE
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-sm font-bold text-white">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FFC800]">🏠 Home</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>📖 About Us</Link>
                <Link href="/team" onClick={() => setIsMobileMenuOpen(false)}>🎙️ Meet The Team</Link>
                <Link href="/stories" onClick={() => setIsMobileMenuOpen(false)}>📖 Short Stories</Link>
                <Link href="/game" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FFC800]">🎮 MMA Arcade Game</Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#27272A] flex flex-col gap-2">
              <span className="text-[10px] font-bold text-[#71717A] uppercase">Connect With Us</span>
              <div className="flex gap-2 text-xs text-[#A1A1AA]">
                <a href="https://www.youtube.com/@SaadeAalaRadio" target="_blank" rel="noreferrer" className="hover:text-[#FFC800]">YouTube</a>
                <span>•</span>
                <a href="https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H" target="_blank" rel="noreferrer" className="hover:text-[#FFC800]">Spotify</a>
                <span>•</span>
                <a href="https://www.instagram.com/saadeaalaradio" target="_blank" rel="noreferrer" className="hover:text-[#FFC800]">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}