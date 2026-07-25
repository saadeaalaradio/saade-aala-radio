"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface HostFighter {
  id: string;
  name: string;
  color: string;
  avatar: string;
}

const hosts: HostFighter[] = [
  { id: "harshdeep", name: "Harshdeep", color: "#FFC800", avatar: "H" },
  { id: "sarabjeet", name: "Sarabjeet", color: "#7000E0", avatar: "S" },
  { id: "sandeep", name: "Sandeep", color: "#FF4500", avatar: "S" },
];

export default function GamePage() {
  const [player, setPlayer] = useState<HostFighter | null>(null);
  const [opponent, setOpponent] = useState<HostFighter | null>(null);
  const [gameState, setGameState] = useState<"select" | "playing" | "gameover">("select");

  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [actionLog, setActionLog] = useState("Tap a move to attack!");

  const [isPlayerJumping, setIsPlayerJumping] = useState(false);
  const [isPlayerBlocking, setIsPlayerBlocking] = useState(false);

  // Start the fight
  const startGame = (p: HostFighter, o: HostFighter) => {
    setPlayer(p);
    setOpponent(o);
    setPlayerScore(0);
    setAiScore(0);
    setWinnerMessage("");
    setGameState("playing");
    setActionLog("Fight Started! First to 8 hits wins!");
  };

  // AI Attack Trigger
  const triggerAiCounter = (moveName: string, isJumpAttack = false) => {
    if (gameState !== "playing") return;

    // AI logic: 35% chance AI blocks if player isn't jumping, otherwise AI gets hit or hits back
    const aiRoll = Math.random();

    if (isPlayerBlocking) {
      setActionLog(`🛡️ You blocked ${opponent?.name}'s attack! No damage.`);
      setIsPlayerBlocking(false);
      return;
    }

    if (aiRoll < 0.3 && !isJumpAttack) {
      setActionLog(`🛡️ ${opponent?.name} blocked your ${moveName}!`);
    } else {
      // Player Lands Hit
      const nextPlayerScore = playerScore + 1;
      setPlayerScore(nextPlayerScore);
      setActionLog(`💥 You landed a ${moveName} on ${opponent?.name}!`);

      if (nextPlayerScore >= 8) {
        setWinnerMessage(`🎉 ${player?.name} KNOCKED OUT ${opponent?.name}!`);
        setGameState("gameover");
        return;
      }
    }

    // AI Counter Attack (50% chance AI hits back)
    setTimeout(() => {
      if (Math.random() > 0.45 && gameState === "playing") {
        setAiScore((prev) => {
          const newAiScore = prev + 1;
          if (newAiScore >= 8) {
            setWinnerMessage(`💀 ${opponent?.name} DEFEATED ${player?.name}!`);
            setGameState("gameover");
          } else {
            setActionLog(`⚠️ ${opponent?.name} hit you back with a counter!`);
          }
          return newAiScore;
        });
      }
    }, 400);
  };

  const handlePunch = () => triggerAiCounter("Punch");
  const handleKick = () => triggerAiCounter("Kick");
  
  const handleJump = () => {
    setIsPlayerJumping(true);
    setActionLog("🦘 You jumped high into the air!");
    setTimeout(() => setIsPlayerJumping(false), 800);
  };

  const handleJumpPunch = () => {
    if (!isPlayerJumping) setIsPlayerJumping(true);
    triggerAiCounter("Flying Jump Punch", true);
    setTimeout(() => setIsPlayerJumping(false), 800);
  };

  const handleJumpKick = () => {
    if (!isPlayerJumping) setIsPlayerJumping(true);
    triggerAiCounter("Flying Jump Kick", true);
    setTimeout(() => setIsPlayerJumping(false), 800);
  };

  const handleBlock = () => {
    setIsPlayerBlocking(true);
    setActionLog("🛡️ Guard Up! Blocking incoming attack...");
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-mono select-none">
      <main className="w-full max-w-[440px] flex flex-col gap-5">
        
        {/* Header */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <Link href="/" className="flex items-center gap-1.5 no-underline">
            <span className="text-base font-bold text-[#FFC800]">SAADE AALA</span>
            <span className="text-base text-white">MMA</span>
          </Link>
          <Link
            href="/"
            className="text-[10px] font-bold text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5"
          >
            ← EXIT GAME
          </Link>
        </header>

        {/* CHARACTER SELECTION SCREEN */}
        {gameState === "select" && (
          <section className="flex flex-col gap-4 bg-[#141417] border border-[#27272A] p-5 rounded-2xl text-center">
            <div className="inline-block mx-auto px-3 py-1 rounded-full text-[10px] font-bold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20">
              🎮 8-BIT MMA ARCADE
            </div>

            <h1 className="text-base font-bold text-white">Select Fighter & Opponent</h1>

            <div className="flex flex-col gap-3 my-2">
              <span className="text-xs text-[#A1A1AA]">Choose Your Host:</span>
              <div className="grid grid-cols-3 gap-2">
                {hosts.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setPlayer(h)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      player?.id === h.id
                        ? "border-[#FFC800] bg-[#FFC800]/20 scale-105"
                        : "border-[#27272A] bg-[#09090B]"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: h.color }}
                    >
                      {h.avatar}
                    </div>
                    <span className="text-[10px] font-bold text-white">{h.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {player && (
              <div className="flex flex-col gap-3 my-2">
                <span className="text-xs text-[#A1A1AA]">Choose AI Opponent:</span>
                <div className="grid grid-cols-3 gap-2">
                  {hosts
                    .filter((h) => h.id !== player.id)
                    .map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setOpponent(h)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          opponent?.id === h.id
                            ? "border-[#FF0000] bg-[#FF0000]/20 scale-105"
                            : "border-[#27272A] bg-[#09090B]"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                          style={{ backgroundColor: h.color }}
                        >
                          {h.avatar}
                        </div>
                        <span className="text-[10px] font-bold text-white">{h.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {player && opponent && (
              <button
                onClick={() => startGame(player, opponent)}
                className="mt-3 w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                ⚔️ START MMA FIGHT
              </button>
            )}
          </section>
        )}

        {/* FIGHTING ARENA SCREEN */}
        {(gameState === "playing" || gameState === "gameover") && (
          <div className="flex flex-col gap-4">
            
            {/* Scoreboard */}
            <div className="bg-[#141417] border border-[#27272A] rounded-2xl p-4 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#FFC800]">{player?.name}</span>
                <span className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] px-2 py-0.5 rounded-md font-bold">
                  {playerScore} / 8
                </span>
              </div>
              <span className="text-[10px] text-[#A1A1AA]">VS</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#FF0000]/20 border border-[#FF0000] text-[#FF0000] px-2 py-0.5 rounded-md font-bold">
                  {aiScore} / 8
                </span>
                <span className="font-bold text-[#FF0000]">{opponent?.name}</span>
              </div>
            </div>

            {/* 8-Bit Canvas Arena Stage */}
            <div className="relative w-full h-48 bg-gradient-to-b from-[#09090B] to-[#18181C] border-2 border-[#27272A] rounded-2xl overflow-hidden flex items-end justify-between px-8 pb-4 shadow-2xl">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-[#A1A1AA] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                OCTAGON ARENA
              </div>

              {/* Player Pixel Avatar */}
              <div
                className={`flex flex-col items-center transition-all duration-200 ${
                  isPlayerJumping ? "-translate-y-12" : "translate-y-0"
                }`}
              >
                <div
                  className="w-12 h-16 rounded-xl border-2 border-white flex flex-col items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: player?.color }}
                >
                  <span className="text-xs">👊</span>
                  <span className="text-xs">{player?.avatar}</span>
                </div>
                <span className="text-[9px] font-bold text-[#FFC800] mt-1">{player?.name}</span>
              </div>

              {/* AI Opponent Pixel Avatar */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-16 rounded-xl border-2 border-white flex flex-col items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: opponent?.color }}
                >
                  <span className="text-xs">🥊</span>
                  <span className="text-xs">{opponent?.avatar}</span>
                </div>
                <span className="text-[9px] font-bold text-[#FF0000] mt-1">{opponent?.name}</span>
              </div>
            </div>

            {/* Action Log Box */}
            <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-3 text-center text-xs text-[#FFC800] font-semibold min-h-[44px] flex items-center justify-center">
              {actionLog}
            </div>

            {/* Game Over Screen Overlay */}
            {gameState === "gameover" && (
              <div className="bg-[#141417] border-2 border-[#FFC800] p-5 rounded-2xl text-center flex flex-col gap-3">
                <h2 className="text-sm font-extrabold text-white leading-relaxed">
                  {winnerMessage}
                </h2>
                <button
                  onClick={() => setGameState("select")}
                  className="w-full py-2.5 bg-[#FFC800] text-black font-bold text-xs rounded-xl"
                >
                  🔄 PLAY AGAIN
                </button>
              </div>
            )}

            {/* Arcade Controls Grid */}
            {gameState === "playing" && (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handlePunch}
                  className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                >
                  👊 PUNCH
                </button>
                <button
                  onClick={handleKick}
                  className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                >
                  🦶 KICK
                </button>
                <button
                  onClick={handleJump}
                  className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                >
                  🦘 JUMP
                </button>
                <button
                  onClick={handleJumpPunch}
                  className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                >
                  💥 JUMP PUNCH
                </button>
                <button
                  onClick={handleJumpKick}
                  className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                >
                  💥 JUMP KICK
                </button>
                <button
                  onClick={handleBlock}
                  className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-[#FFC800] active:scale-95"
                >
                  🛡️ BLOCK
                </button>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}