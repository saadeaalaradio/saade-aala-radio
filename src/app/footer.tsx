"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [footerLogo, setFooterLogo] = useState<string>("/logo-placeholder.png");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_cms_config");
      if (saved) {
        try {
          const config = JSON.parse(saved);
          if (config.footerLogoUrl) setFooterLogo(config.footerLogoUrl);
        } catch (e) {
          console.error("Error reading footer logo", e);
        }
      }
    }
  }, []);

  return (
    <footer className="mt-12 bg-[#141417] border-t border-[#27272A] py-10 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="w-20 h-20 bg-[#09090B] border border-[#27272A] rounded-2xl flex items-center justify-center overflow-hidden relative">
            <img
              src={footerLogo}
              alt="Saade Aala Radio 500x500 Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <span className="text-base font-black text-[#FFC800]">SAADE AALA RADIO</span>
            <p className="text-xs text-[#A1A1AA] max-w-[280px] mt-1">
              Unfiltered Punjabi banter, comedy specials, and raw stories.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2 text-xs font-semibold text-[#A1A1AA]">
          <span className="text-xs font-black text-white uppercase tracking-wider mb-1">NAVIGATION</span>
          <Link href="/" className="hover:text-[#FFC800]">Home</Link>
          <Link href="/about" className="hover:text-[#FFC800]">About Us</Link>
          <Link href="/team" className="hover:text-[#FFC800]">Meet The Team</Link>
          <Link href="/stories" className="hover:text-[#FFC800]">Short Stories</Link>
          <Link href="/game" className="hover:text-[#FFC800]">MMA Arcade Game</Link>
        </div>

        {/* Contact & Credit */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-[#A1A1AA]">
          <span className="text-xs font-black text-white uppercase tracking-wider mb-1">GET IN TOUCH</span>
          <p>saadeaalaradio@gmail.com</p>
          <div className="mt-4 pt-4 border-t border-[#27272A] w-full text-center md:text-right">
            <p className="text-[11px]">
              Built by <strong className="text-white">Creative Benchers</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}