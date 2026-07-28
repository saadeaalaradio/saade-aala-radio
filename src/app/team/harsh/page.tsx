"use client";

import Link from "next/link";
import { useState, use } from "react";

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
  image: string;
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

const TEAM_DATA: Record<string, TeamMember> = {
  harshdeep: {
    id: "harshdeep",
    name: "Harshdeep Singh",
    role: "Lead Anchor & Chaos Director",
    image: "/hosts/harshdeep.png",
    accentColor: "#FFC800",
    journey:
      "From running wild production sets to co-founding Saade Aala Radio, Harshdeep brings the unfiltered energy and chaotic stories that keep every episode completely unpredictable.",
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
  sarabjeet: {
    id: "sarabjeet",
    name: "Sarabjeet Singh",
    role: "Co-Host & Comeback King",
    image: "/hosts/sarabjeet.png",
    accentColor: "#7000E0",
    journey:
      "Sarabjeet is the anchor of reality—until he snaps with one-liners that shatter the room. Known for his sharp timing and hilarious comebacks.",
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
  sandeep: {
    id: "sandeep",
    name: "Sandeep Singh",
    role: "Co-Host & Cunning Strategist",
    image: "/hosts/sandeep.png",
    accentColor: "#FF4500",
    journey:
      "The quiet genius behind the craziest takes. Sandeep sits back, observes the chaos, and drops punchlines when you least expect it.",
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
};

export default function TeamMemberPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolvedParams = use(params);
  
  // Safe Fallback Resolution to avoid undefined `.toLowerCase()` errors during prerender
  const rawId = resolvedParams?.id ?? "harshdeep";
  const hostId = rawId.toLowerCase();
  const host = TEAM_DATA[hostId] || TEAM_DATA["harshdeep"];

  // Ask Question Drawer State
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
      alert(`Question sent to ${host.name}! They'll be notified.`);
    }, 1200);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-lg font-black tracking-tighter text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-lg font-light tracking-widest text-white">
              RADIO
            </span>
          </Link>
          <Link
            href="/team"
            className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800] hover:text-[#FFC800] transition-colors"
          >
            ← ALL HOSTS
          </Link>
        </header>

        {/* --- HOST PROFILE HERO --- */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181C] to-[#141417] border border-[#27272A] p-6 shadow-2xl flex flex-col items-center text-center">
          
          {/* Accent Glow */}
          <div
            className="absolute -top-12 inset-x-0 h-32 blur-3xl rounded-full opacity-25 pointer-events-none"
            style={{ backgroundColor: host.accentColor }}
          />

          {/* Host PNG Container */}
          <div className="relative w-36 h-36 mb-4 rounded-2xl bg-[#09090B] border-2 border-[#27272A] overflow-hidden flex items-center justify-center shadow-xl group">
            <div
              className="w-full h-full flex items-center justify-center font-black text-4xl text-white opacity-80"
              style={{ backgroundColor: host.accentColor }}
            >
              {host.name.charAt(0)}
            </div>
          </div>

          <h1 className="text-xl font-black text-white">{host.name}</h1>
          <span
            className="text-xs font-bold px-3 py-0.5 rounded-full mt-1 mb-3 border"
            style={{
              color: host.accentColor,
              backgroundColor: `${host.accentColor}15`,
              borderColor: `${host.accentColor}40`,
            }}
          >
            {host.role}
          </span>

          {/* Social Media Credentials */}
          <div className="flex items-center gap-3 mt-2">
            {host.socials.instagram && (
              <a
                href={host.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#FFC800] transition-colors"
              >
                Instagram
              </a>
            )}
            {host.socials.youtube && (
              <a
                href={host.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#FFC800] transition-colors"
              >
                YouTube
              </a>
            )}
          </div>
        </section>

        {/* --- JOURNEY PARAGRAPH & FUNNY QUOTE --- */}
        <section className="flex flex-col gap-4">
          <div className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-wider text-[#A1A1AA] uppercase">
              The Journey
            </span>
            <p className="text-xs text-[#D4D4D8] leading-relaxed">
              {host.journey}
            </p>
          </div>

          {/* Funny Quote Box */}
          <div
            className="p-5 rounded-2xl border-l-4 bg-[#141417] border-[#27272A] shadow-md"
            style={{ borderLeftColor: host.accentColor }}
          >
            <span className="text-[10px] font-bold tracking-wider text-[#A1A1AA] uppercase block mb-1">
              Signature Quote
            </span>
            <p className="text-sm font-bold text-white italic">
              {host.quote}
            </p>
          </div>
        </section>

        {/* --- ASK QUESTION BUTTON --- */}
        <section>
          <button
            onClick={() => setShowAskForm(true)}
            className="w-full py-3.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            💬 ASK {host.name.split(" ")[0].toUpperCase()} A QUESTION
          </button>
        </section>

        {/* --- ASK QUESTION MODAL / DRAWER --- */}
        {showAskForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#141417] border border-[#27272A] rounded-3xl p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">
                  Ask {host.name}
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
                  ⚡ Question submitted! Notifying {host.name}...
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
                    placeholder={`Ask ${host.name} anything funny or podcast-related...`}
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

        {/* --- CONVERSATION BUBBLES (Q&A FEED) --- */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#A1A1AA] tracking-wider">
            <span>FAN CONVERSATIONS</span>
            <span className="text-[#FFC800] text-[10px]">Q&A BUBBLES</span>
          </div>

          <div className="flex flex-col gap-3">
            {host.qnaBubbles.map((qna) => (
              <div
                key={qna.id}
                className="bg-[#141417] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2.5"
              >
                {/* Fan Question Bubble */}
                <div className="flex flex-col gap-1 bg-[#09090B] p-3 rounded-xl border border-white/5 self-start w-[90%]">
                  <span className="text-[9px] font-bold text-[#FFC800]">
                    👤 {qna.fanName} asked:
                  </span>
                  <p className="text-xs text-white font-medium">
                    "{qna.question}"
                  </p>
                </div>

                {/* Host Answer Bubble */}
                <div
                  className="flex flex-col gap-1 p-3 rounded-xl border self-end w-[90%]"
                  style={{
                    backgroundColor: `${host.accentColor}10`,
                    borderColor: `${host.accentColor}30`,
                  }}
                >
                  <span className="text-[9px] font-bold" style={{ color: host.accentColor }}>
                    💬 {host.name} replied:
                  </span>
                  <p className="text-xs text-white font-medium">
                    "{qna.answer}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}