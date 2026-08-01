"use client";

import { useState, useEffect } from "react";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  journey: string;
  quote: string;
  socials: SocialLink[];
}

export interface FanQuestion {
  id: string;
  hostId: string;
  fanName: string;
  question: string;
  answer: string;
  timestamp: string;
  isApproved: boolean;
}

const DEFAULT_HOSTS: Record<string, HostProfile> = {
  harshdeep: {
    id: "harshdeep",
    name: "Harshdeep Singh",
    role: "Lead Anchor & Chaos Director",
    photoUrl: "/hosts/harshdeep.png",
    journey:
      "From running wild production sets to co-founding Saade Aala Radio, Harshdeep brings unfiltered energy and chaotic stories to every episode.",
    quote: "Tension nahi leni, story poori sun ke jaani aa!",
    socials: [
      { platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
      { platform: "YouTube", url: "https://www.youtube.com/@SaadeAalaRadio" },
    ],
  },
  sarabjeet: {
    id: "sarabjeet",
    name: "Sarabjeet Singh",
    role: "Co-Host & Comeback King",
    photoUrl: "/hosts/sarabjeet.png",
    journey:
      "Sarabjeet is the anchor of reality—until he snaps with legendary one-liners that shatter the entire room into laughter.",
    quote: "Ehne gall shuru kiti si, khatam main karunga!",
    socials: [
      { platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
    ],
  },
  sandeep: {
    id: "sandeep",
    name: "Sandeep Singh",
    role: "Co-Host & Cunning Strategist",
    photoUrl: "/hosts/sandeep.png",
    journey:
      "The quiet genius behind the craziest takes. Sandeep sits back, observes the chaos, and drops punchlines when least expected.",
    quote: "Dimaag thoda ghumaya karo, mazaa fir hi aaunda.",
    socials: [
      { platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
    ],
  },
};

const DEFAULT_QUESTIONS: FanQuestion[] = [
  {
    id: "q-1",
    hostId: "harshdeep",
    fanName: "Aman_Mohali",
    question: "Harshdeep bhaji, next live comedy episode kadon aavega?",
    answer: "Agle Friday sharp 8 PM! Full chaotic lineup ready aa!",
    timestamp: "2 hours ago",
    isApproved: true,
  },
  {
    id: "q-2",
    hostId: "sarabjeet",
    fanName: "Simran_Kaur",
    question: "Sarabjeet, Sirsa waale trip da sach ki si?",
    answer: "Ehna ne shortcut lita si, main taan bus 'Sandeep' nu dekh reha si!",
    timestamp: "1 day ago",
    isApproved: true,
  },
];

export default function TeamPage() {
  const [hosts, setHosts] = useState<Record<string, HostProfile>>(DEFAULT_HOSTS);
  const [questions, setQuestions] = useState<FanQuestion[]>(DEFAULT_QUESTIONS);
  const [selectedMobileHost, setSelectedMobileHost] = useState<string>("harshdeep");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Q&A Modal State
  const [activeAskHost, setActiveAskHost] = useState<string | null>(null);
  const [fanName, setFanName] = useState("");
  const [fanQuestion, setFanQuestion] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  // Load latest CMS data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_cms_config");
      if (saved) {
        try {
          const config = JSON.parse(saved);
          if (config.hosts) setHosts(config.hosts);
          if (config.questions && Array.isArray(config.questions)) setQuestions(config.questions);
        } catch (e) {
          console.error("Failed to parse config", e);
        }
      }
    }
  }, []);

  const handleImageError = (hostId: string) => {
    setFailedImages((prev) => ({ ...prev, [hostId]: true }));
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanQuestion.trim() || !activeAskHost) return;

    const saved = localStorage.getItem("saade_aala_cms_config");
    const config = saved ? JSON.parse(saved) : {};

    const newQuestion: FanQuestion = {
      id: `q-${Date.now()}`,
      hostId: activeAskHost,
      fanName: fanName.trim() || "Anonymous Listener",
      question: fanQuestion.trim(),
      answer: "",
      timestamp: "Just now",
      isApproved: false,
    };

    const updatedQuestions = [newQuestion, ...(config.questions || questions)];
    config.questions = updatedQuestions;
    localStorage.setItem("saade_aala_cms_config", JSON.stringify(config));
    setQuestions(updatedQuestions);

    setSubmitMessage("✨ Sent directly to the host! It will appear here once approved in Admin.");
    setFanName("");
    setFanQuestion("");
    setTimeout(() => {
      setSubmitMessage("");
      setActiveAskHost(null);
    }, 2500);
  };

  const activeHostObj = hosts[selectedMobileHost] || DEFAULT_HOSTS.harshdeep;
  const approvedQuestions = questions.filter((q) => q.isApproved);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      {/* HERO TITLE */}
      <section className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8 md:pt-12 text-center flex flex-col items-center gap-3">
        <span className="text-[10px] md:text-xs font-black text-[#FFC800] uppercase tracking-widest bg-[#FFC800]/10 border border-[#FFC800]/20 px-3 py-1 rounded-full">
          THE VOICES BEHIND THE MIC
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white">Meet The Chaos Crew</h1>
        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-[550px] leading-relaxed">
          Unfiltered banter, raw comedy, and crazy stories. Get to know the hosts and ask them a question directly!
        </p>
      </section>

      {/* 📱 MOBILE HOST DISPLAY (Tabbed Switcher) */}
      <div className="md:hidden max-w-[1100px] mx-auto px-4 pt-6 flex flex-col gap-5">
        {/* Mobile Host Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#141417] p-1.5 rounded-2xl border border-[#27272A] text-center">
          {Object.keys(hosts).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedMobileHost(key)}
              className={`py-2.5 text-[11px] font-black uppercase rounded-xl transition-all ${
                selectedMobileHost === key ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA]"
              }`}
            >
              {hosts[key].name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Featured Mobile Host Card */}
        <div className="bg-[#141417] border border-[#27272A] p-5 rounded-3xl flex flex-col gap-4 shadow-xl">
          {/* Photo Container */}
          <div className="aspect-square w-full bg-[#09090B] border border-[#27272A] rounded-2xl overflow-hidden relative flex items-center justify-center">
            {!failedImages[activeHostObj.id] ? (
              <img
                src={activeHostObj.photoUrl}
                alt={activeHostObj.name}
                className="w-full h-full object-cover"
                onError={() => handleImageError(activeHostObj.id)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl mb-1">🎙️</span>
                <span className="text-xs font-black text-[#A1A1AA]">PHOTO PLACEHOLDER</span>
              </div>
            )}
          </div>

          <div>
            <span className="text-[10px] font-extrabold text-[#FFC800] uppercase tracking-wider">
              {activeHostObj.role}
            </span>
            <h2 className="text-xl font-black text-white">{activeHostObj.name}</h2>
          </div>

          <p className="text-xs text-[#A1A1AA] leading-relaxed">{activeHostObj.journey}</p>

          <blockquote className="bg-[#09090B] border-l-2 border-[#FFC800] p-3 rounded-r-xl text-xs text-white italic">
            "{activeHostObj.quote}"
          </blockquote>

          <button
            onClick={() => setActiveAskHost(activeHostObj.id)}
            className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg active:scale-95 transition-all mt-1"
          >
            💬 ASK {activeHostObj.name.toUpperCase()} A QUESTION
          </button>
        </div>
      </div>

      {/* 💻 DESKTOP HOST DISPLAY (3-Column Side-by-Side Grid) */}
      <div className="hidden md:grid max-w-[1100px] mx-auto px-8 pt-10 grid-cols-3 gap-6">
        {Object.keys(hosts).map((key) => {
          const host = hosts[key];
          const isFailed = failedImages[host.id];

          return (
            <div
              key={key}
              className="bg-[#141417] border border-[#27272A] hover:border-[#FFC800]/60 p-6 rounded-3xl flex flex-col justify-between gap-5 transition-all hover:-translate-y-1 shadow-xl group"
            >
              <div className="flex flex-col gap-4">
                {/* Photo Container */}
                <div className="aspect-square w-full bg-[#09090B] border border-[#27272A] group-hover:border-[#FFC800]/40 rounded-2xl overflow-hidden relative flex items-center justify-center transition-colors">
                  {!isFailed ? (
                    <img
                      src={host.photoUrl}
                      alt={host.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(host.id)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <span className="text-4xl mb-1">🎙️</span>
                      <span className="text-xs font-black text-[#A1A1AA]">PHOTO PLACEHOLDER</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-[#FFC800] uppercase tracking-wider">
                    {host.role}
                  </span>
                  <h2 className="text-xl font-black text-white">{host.name}</h2>
                </div>

                <p className="text-xs text-[#A1A1AA] leading-relaxed">{host.journey}</p>

                <blockquote className="bg-[#09090B] border-l-2 border-[#FFC800] p-3 rounded-r-xl text-xs text-white italic">
                  "{host.quote}"
                </blockquote>
              </div>

              <button
                onClick={() => setActiveAskHost(host.id)}
                className="w-full py-2.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl hover:scale-105 transition-transform shadow-md mt-2"
              >
                💬 ASK A QUESTION
              </button>
            </div>
          );
        })}
      </div>

      {/* COMMUNITY Q&A FEED */}
      <section className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
          <div>
            <span className="text-[10px] font-black text-[#FFC800] uppercase tracking-widest">
              COMMUNITY HUB
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white">Answered Fan Questions</h2>
          </div>
          <span className="text-xs text-[#A1A1AA] font-bold">{approvedQuestions.length} Approved Replies</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvedQuestions.map((q) => (
            <div key={q.id} className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-[#FFC800]">👤 {q.fanName}</span>
                <span className="text-[10px] text-[#71717A]">{q.timestamp}</span>
              </div>

              <p className="text-xs text-white bg-[#09090B] p-3 rounded-xl border border-[#27272A]">
                "{q.question}"
              </p>

              <div className="flex flex-col gap-1 pl-2 border-l-2 border-[#FFC800]">
                <span className="text-[10px] font-black text-[#FFC800] uppercase">
                  {hosts[q.hostId]?.name || q.hostId} Replied:
                </span>
                <p className="text-xs text-[#D4D4D8] italic">{q.answer || "Drafting reply..."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ASK QUESTION MODAL DRAWER */}
      {activeAskHost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[420px] bg-[#141417] border border-[#27272A] rounded-3xl p-6 flex flex-col gap-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-[#27272A] pb-3">
              <h3 className="text-sm font-black text-white uppercase">
                Ask {hosts[activeAskHost]?.name}
              </h3>
              <button
                onClick={() => setActiveAskHost(null)}
                className="text-xs font-bold text-[#A1A1AA] bg-[#09090B] border border-[#27272A] px-2 py-1 rounded-lg"
              >
                ✕ CLOSE
              </button>
            </div>

            {submitMessage ? (
              <div className="bg-green-500/20 text-green-400 text-xs font-bold p-4 rounded-2xl border border-green-500/30 text-center">
                {submitMessage}
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Name or Handle"
                  value={fanName}
                  onChange={(e) => setFanName(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#FFC800]"
                />
                <textarea
                  rows={4}
                  required
                  placeholder={`What do you want to ask ${hosts[activeAskHost]?.name.split(" ")[0]}?`}
                  value={fanQuestion}
                  onChange={(e) => setFanQuestion(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#FFC800] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg active:scale-95 transition-all"
                >
                  SUBMIT QUESTION 🚀
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}