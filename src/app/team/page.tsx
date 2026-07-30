"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function TeamPage() {
  const [selectedHost, setSelectedHost] = useState("harshdeep");
  const [showAskModal, setShowAskModal] = useState(false);
  const [fanName, setFanName] = useState("");
  const [fanQuestion, setFanQuestion] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanQuestion.trim()) return;

    // Load existing config or create fallback
    const saved = localStorage.getItem("saade_aala_cms_config");
    let config = saved ? JSON.parse(saved) : { questions: [] };

    const newQ = {
      id: `q-${Date.now()}`,
      hostId: selectedHost,
      fanName: fanName.trim() || "Anonymous Listener",
      question: fanQuestion.trim(),
      answer: "",
      timestamp: "Just now",
      isApproved: false,
    };

    config.questions = [newQ, ...(config.questions || [])];
    localStorage.setItem("saade_aala_cms_config", JSON.stringify(config));

    setSubmittedMessage("✨ Your question was sent directly to the hosts! Check back soon once they reply.");
    setFanName("");
    setFanQuestion("");
    setTimeout(() => {
      setSubmittedMessage("");
      setShowAskModal(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090B]/80 border-b border-[#27272A] px-6 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-[#FFC800]">
            SAADE AALA RADIO
          </Link>
          <nav className="flex items-center gap-6 text-sm font-bold text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#FFC800]">Home</Link>
            <Link href="/team" className="text-[#FFC800]">Meet The Team</Link>
            <Link href="/stories" className="hover:text-[#FFC800]">Short Stories</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl font-black text-white">Meet The Voices</h1>
          <p className="text-xs text-[#A1A1AA]">Select a host to read their bio, signature quotes, and ask them a question directly!</p>
        </div>

        {/* Host Selector */}
        <div className="grid grid-cols-3 gap-3 bg-[#141417] p-2 rounded-2xl border border-[#27272A]">
          {[
            { id: "harshdeep", name: "Harshdeep Singh" },
            { id: "sarabjeet", name: "Sarabjeet Singh" },
            { id: "sandeep", name: "Sandeep Singh" },
          ].map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHost(h.id)}
              className={`py-3 text-xs font-extrabold rounded-xl transition-all ${
                selectedHost === h.id ? "bg-[#FFC800] text-black shadow-lg" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>

        {/* Host Details & Ask Button */}
        <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#FFC800] uppercase">HOST PROFILE</span>
              <h2 className="text-xl font-black text-white capitalize">{selectedHost}</h2>
            </div>
            <button
              onClick={() => setShowAskModal(true)}
              className="px-4 py-2 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl hover:scale-105 transition-transform"
            >
              💬 ASK {selectedHost.toUpperCase()} A QUESTION
            </button>
          </div>
        </div>

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#141417] border border-[#27272A] rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Ask {selectedHost}</h3>
                <button onClick={() => setShowAskModal(false)} className="text-xs text-[#A1A1AA]">✕ CLOSE</button>
              </div>

              {submittedMessage ? (
                <div className="bg-green-500/20 text-green-400 text-xs font-bold p-3 rounded-xl border border-green-500/30">
                  {submittedMessage}
                </div>
              ) : (
                <form onSubmit={handleAskQuestion} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your Name / Handle"
                    value={fanName}
                    onChange={(e) => setFanName(e.target.value)}
                    className="bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#FFC800]"
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder={`Ask ${selectedHost} anything...`}
                    value={fanQuestion}
                    onChange={(e) => setFanQuestion(e.target.value)}
                    className="bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#FFC800] resize-none"
                  />
                  <button
                    type="submit"
                    className="py-2.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-md"
                  >
                    SEND QUESTION 🚀
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}