"use client";

import Link from "next/link";

interface Host {
  name: string;
  role: string;
  bio: string;
  instagram?: string;
  snapchat?: string;
}

const teamMembers: Host[] = [
  {
    name: "Harshdeep Singh",
    role: "Founder & Co-Host",
    bio: "Bringing the chaotic stories, unfiltered commentary, and daily rants to Saade Aala Radio.",
    instagram: "https://www.instagram.com/harshdeep243",
    snapchat: "https://www.snapchat.com/@harshdeep_243",
  },
  {
    name: "Sarabjeet Singh",
    role: "Co-Host",
    bio: "Master of comic timing, quick comebacks, and keeping the banter rolling.",
    instagram: "https://www.instagram.com/sarabjeet_00001",
    snapchat: "https://www.snapchat.com/@sarabjeet0033",
  },
  {
    name: "Sandeep Singh",
    role: "Co-Host",
    bio: "The wild card of the group bringing unexpected roasts and unfiltered hot takes.",
    instagram: "https://www.instagram.com/saandeep_ambala_official",
    snapchat: "https://www.snapchat.com/@puadh_aale",
  },
];

export default function TeamPage() {
  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA]">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* Navigation / Header */}
        <header className="flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-xl font-bold tracking-tight text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-xl font-light tracking-widest text-white">
              RADIO
            </span>
          </Link>
          <Link
            href="/"
            className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800] transition-colors"
          >
            ← BACK HOME
          </Link>
        </header>

        {/* Section Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181C] to-[#141417] border border-[#27272A] p-6 shadow-2xl text-center">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7000E0]/20 blur-3xl rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20 mb-3">
            🎙️ THE VOICES
          </div>
          
          <h1 className="text-xl font-bold text-white mb-2">Meet the Squad</h1>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            The minds behind the roasts, late-night thoughts, and unfiltered Punjabi comedy on Saade Aala Radio.
          </p>
        </section>

        {/* Team Cards List */}
        <section className="flex flex-col gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-3 transition-all hover:border-[#FFC800]/50"
            >
              <div className="flex items-center gap-4">
                {/* Profile Avatar Badge */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7000E0] to-[#FFC800] p-[2px] flex-shrink-0">
                  <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center text-base font-bold text-[#FFC800]">
                    {member.name.charAt(0)}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-white leading-tight">
                    {member.name}
                  </h2>
                  <span className="text-xs font-medium text-[#FFC800] mt-0.5">
                    {member.role}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-normal">
                {member.bio}
              </p>

              {/* Social Buttons Row */}
              <div className="flex items-center gap-4 pt-3 border-t border-[#27272A]">
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A1A1AA] hover:text-[#FFC800] transition-colors"
                  >
                    <span>📷 Instagram</span>
                    <span>→</span>
                  </a>
                )}

                {member.snapchat && (
                  <a
                    href={member.snapchat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A1A1AA] hover:text-[#FFC800] transition-colors"
                  >
                    <span>👻 Snapchat</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Navigation */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-semibold text-[#FFC800] hover:underline"
          >
            ← Back to Latest Episode & Soundboard
          </Link>
        </div>

      </main>
    </div>
  );
}