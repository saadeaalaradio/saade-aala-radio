"use client";

import Link from "next/link";
import { useState } from "react";

// --- TEAM MEMBER DATABASE ---
interface QNA {
  id: string;
  question: string;
  fanName: string;
  answer: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string; // PNG path in /public folder
  accentColor: string;
  journey: string;
  quote: string;
  socials: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  qnaBubbles: QNA[];
}

const HOSTS: TeamMember[] = [
  {
    id: "harshdeep",
    name: "Harshdeep Singh",
    role: "Lead Anchor & Chaos Director",
    image: "/hosts/harshdeep.png",
    accentColor: "#FFC800",
    journey:
      "From running wild production sets to co-founding Saade Aala Radio, Harshdeep brings unfiltered energy and chaotic stories that keep every single episode completely unpredictable.",
    quote: "“Tension nahi leni, story poori sun ke jaani aa!”",
    socials: {
      instagram: "https://www.instagram.com/saadeaalaradio",
      youtube: "https://www.youtube.com/@SaadeAalaRadio",
    },
    qnaBubbles: [
      {
        id: "q1",
        fanName: "Aman from Mohali",
        question: "Bhai Sirsa wali story da next part kado aauga?",
        answer: "Agley episode vich pakka! Edited and ready aa, bas wait karo!",
      },
      {
        id: "q2",
        fanName: "Simran",
        question: "Who breaks character the most during recordings?",
        answer: "100% Sarabjeet! Give him 2 minutes and he loses it.",
      },
    ],
  },
  {
    id: "sarabjeet",
    name: "Sarabjeet Singh",
    role: "Co-Host & Comeback King",
    image: "/hosts/sarabjeet.png",
    accentColor: "#7000E0",
    journey:
      "Sarabjeet is the anchor of reality—until he snaps with one-liners that shatter the room. Known for his razor-sharp timing and hilarious comebacks.",
    quote: "“Ehne gall shuru kiti si, khatam main karunga!”",
    socials: {
      instagram: "https://www.instagram.com/saadeaalaradio",
      facebook: "https://www.facebook.com/SaadeAalaRadio",
    },
    qnaBubbles: [
      {
        id: "q1",
        fanName: "Gurpreet",
        question: "How do you stay calm when Harshdeep starts yelling?",
        answer: "I don't stay calm, I just wait for my turn to roast him back!",
      },
    ],
  },
  {
    id: "sandeep",
    name: "Sandeep Singh",
    role: "Co-Host & Cunning Strategist",
    image: "/hosts/sandeep.png",
    accentColor: "#FF4500",
    journey:
      "The quiet genius behind the craziest takes. Sandeep sits back, observes the room, and drops lethal punchlines when you least expect it.",
    quote: "“Dimaag thoda ghumaya karo, mazaa fir hi aaunda.”",
    socials: {
      instagram: "https://www.instagram.com/saadeaalaradio",
    },
    qnaBubbles: [
      {
        id: "q1",
        fanName: "Preet",
        question: "What is your favorite MMA Arcade special move?",
        answer: "Awesome Ambala Kick! Unlocks in 3 hits every time.",
      },
    ],
  },
];

export default function TeamPage() {
  const [selectedHost, setSelectedHost] = useState<TeamMember>(HOSTS[0]);
  const [showAskForm, setShowAskForm] = useState(false);
  const [fanName, setFanName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setShowAskForm(false);
      setSubmitted(false);
      setFanName("");
      setQuestionText("");
      alert(`Question sent to ${selectedHost.name}! They'll be notified.`);
    }, 1200);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-xl font-black tracking-tighter text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-xl font-light tracking-widest text-white">
              RADIO
            </span>
          </Link>
          <Link
            href="/"
            className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800] hover:text-[#FFC800] transition-colors"
          >
            ← HOME
          </Link>
        </header>

        {/* --- HOST SELECTOR GRID --- */}
        <section className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-[#A1A1AA] tracking-wider">
            MEET THE HOSTS
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {HOSTS.map((host) => {
              const isSelected = selectedHost.id === host.id;
              return (
                <button
                  key={host.id}
                  onClick={() => setSelectedHost(host)}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all text-center ${
                    isSelected
                      ? "bg-[#141417] border-[#FFC800] scale-105 shadow-xl"
                      : "bg-[#141417]/50 border-[#27272A] hover:border-white/20"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-white shadow-md"
                    style={{ backgroundColor: host.accentColor }}
                  >
                    {host.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-white truncate w-full">
                    {host.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* --- SELECTED HOST PROFILE CARD --- */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181C] to-[#141417] border border-[#27272A] p-6 shadow-2xl flex flex-col items-center text-center">
          
          {/* Accent Glow */}
          <div
            className="absolute -top-12 inset-x-0 h-32 blur-3xl rounded-full opacity-25 pointer-events-none transition-all"
            style={{ backgroundColor: selectedHost.accentColor }}
          />

          {/* Host PNG Container */}
          <div className="relative w-32 h-32 mb-4 rounded-2xl bg-[#09090B] border-2 border-[#27272A] overflow-hidden flex items-center justify-center shadow-xl">
            <div
              className="w-full h-full flex items-center justify-center font-black text-4xl text-white opacity-80"
              style={{ backgroundColor: selectedHost.accentColor }}
            >
              {selectedHost.name.charAt(0)}
            </div>
          </div>

          <h1 className="text-xl font-black text-white">{selectedHost.name}</h1>
          <span
            className="text-xs font-bold px-3 py-0.5 rounded-full mt-1 mb-3 border"
            style={{
              color: selectedHost.accentColor,
              backgroundColor: `${selectedHost.accentColor}15`,
              borderColor: `${selectedHost.accentColor}40`,
            }}
          >
            {selectedHost.role}
          </span>

          {/* Social Media Links */}
          <div className="flex items-center gap-3 mt-1">
            {selectedHost.socials.instagram && (
              <a
                href={selectedHost.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#FFC800] transition-colors"
              >
                Instagram
              </a>
            )}
            {selectedHost.socials.youtube && (
              <a
                href={selectedHost.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#FFC800] transition-colors"
              >
                YouTube
              </a>
            )}
          </div>
        </section>

        {/* --- JOURNEY & QUOTE --- */}
        <section className="flex flex-col gap-4">
          <div className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-wider text-[#A1A1AA] uppercase">
              The Journey
            </span>
            <p className="text-xs text-[#D4D4D8] leading-relaxed">
              {selectedHost.journey}
            </p>
          </div>

          {/* Funny Quote Box */}
          <div
            className="p-5 rounded-2xl border-l-4 bg-[#141417] border-[#27272A] shadow-md transition-all"
            style={{ borderLeftColor: selectedHost.accentColor }}
          >
            <span className="text-[10px] font-bold tracking-wider text-[#A1A1AA] uppercase block mb-1">
              Signature Quote
            </span>
            <p className="text-sm font-bold text-white italic">
              {selectedHost.quote}
            </p>
          </div>
        </section>

        {/* --- ASK QUESTION BUTTON --- */}
        <section>
          <button
            onClick={() => setShowAskForm(true)}
            className="w-full py-3.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            💬 ASK {selectedHost.name.split(" ")[0].toUpperCase()} A QUESTION
          </button>
        </section>

        {/* --- ASK QUESTION DRAWER --- */}
        {showAskForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#141417] border border-[#27272A] rounded-3xl p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">
                  Ask {selectedHost.name}
                </h3>
                <button
                  onClick={() => setShowAskForm(false)}
                  className="text-xs font-bold text-[#A1A1AA] hover:text-white"
                >
                  ✕ CLOSE
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center text-xs font-bold text-[#FFC800] animate-pulse">
                  ⚡ Question submitted! Notifying {selectedHost.name}...
                </div>
              ) : (
                <form onSubmit={handleSubmitQuestion} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (or Anonymous)"
                    value={fanName}
                    onChange={(e) => setFanName(e.target.value)}
                    className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFC800]"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder={`Ask ${selectedHost.name} anything funny or podcast-related...`}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFC800] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
                  >
                    SEND QUESTION ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* --- CONVERSATION BUBBLES --- */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#A1A1AA] tracking-wider">
            <span>FAN CONVERSATIONS</span>
            <span className="text-[#FFC800] text-[10px]">Q&A BUBBLES</span>
          </div>

          <div className="flex flex-col gap-3">
            {selectedHost.qnaBubbles.map((qna) => (
              <div
                key={qna.id}
                className="bg-[#141417] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2.5"
              >
                {/* Fan Question */}
                <div className="flex flex-col gap-1 bg-[#09090B] p-3 rounded-xl border border-white/5 self-start w-[90%]">
                  <span className="text-[9px] font-bold text-[#FFC800]">
                    👤 {qna.fanName} asked:
                  </span>
                  <p className="text-xs text-white font-medium">
                    "{qna.question}"
                  </p>
                </div>

                {/* Host Answer */}
                <div
                  className="flex flex-col gap-1 p-3 rounded-xl border self-end w-[90%]"
                  style={{
                    backgroundColor: `${selectedHost.accentColor}10`,
                    borderColor: `${selectedHost.accentColor}30`,
                  }}
                >
                  <span className="text-[9px] font-bold" style={{ color: selectedHost.accentColor }}>
                    💬 {selectedHost.name} replied:
                  </span>
                  <p className="text-xs text-white font-medium">
                    "{qna.answer}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER SECTION --- */}
        <footer className="mt-4 pt-6 border-t border-[#27272A] flex flex-col items-center gap-5 text-center">
          
          {/* 500px x 500px Logo Placeholder Box */}
          <div className="w-24 h-24 aspect-square rounded-2xl bg-[#141417] border-2 border-dashed border-[#27272A] flex flex-col items-center justify-center gap-1 group hover:border-[#FFC800] transition-colors">
            <span className="text-xs font-mono text-[#FFC800] font-bold">500 x 500</span>
            <span className="text-[9px] text-[#A1A1AA]">LOGO HERE</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center justify-center gap-5 text-xs font-semibold text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#FFC800] transition-colors">
              Home
            </Link>
            <Link href="/team" className="hover:text-[#FFC800] transition-colors">
              Team
            </Link>
            <Link href="/game" className="hover:text-[#FFC800] transition-colors">
              Game
            </Link>
            <Link href="/about" className="hover:text-[#FFC800] transition-colors">
              About us
            </Link>
          </nav>

          {/* Contact & Agency Credits */}
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#A1A1AA]">
              Contact us:{" "}
              <a
                href="mailto:saadeaalaradio@gmail.com"
                className="text-white hover:text-[#FFC800] transition-colors underline font-medium"
              >
                saadeaalaradio@gmail.com
              </a>
            </p>
            <p className="text-[10px] text-[#52525B] tracking-wide pt-1">
              Created by <span className="text-[#A1A1AA] font-bold">Creative Benchers</span>
            </p>
          </div>

        </footer>

      </main>
    </div>
  );
}