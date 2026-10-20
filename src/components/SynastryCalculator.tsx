import React, { useState } from 'react';
import { ZODIAC_SIGNS, calculateSynastry } from '../utils/astrology';
import { Sparkles, Heart, Compass, ShieldCheck, Flame, Moon, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface SynastryCalculatorProps {
  currentUser?: UserProfile | null;
  initialSignB?: string;
}

export const SynastryCalculator: React.FC<SynastryCalculatorProps> = ({
  currentUser,
  initialSignB
}) => {
  const signs = Object.values(ZODIAC_SIGNS);
  const [signA, setSignA] = useState<string>(currentUser ? currentUser.sunSign.name : 'Cancer');
  const [signB, setSignB] = useState<string>(initialSignB || 'Pisces');

  const synastry = calculateSynastry(
    ZODIAC_SIGNS[signA],
    ZODIAC_SIGNS[signB],
    currentUser?.moonSign,
    ZODIAC_SIGNS[signB]
  );

  const handleSwap = () => {
    const temp = signA;
    setSignA(signB);
    setSignB(temp);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0c0914] text-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute top-10 left-1/4 h-80 w-80 rounded-full bg-rose-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">
            Laboratorium Astrologi
          </span>
          <h1 className="font-display text-3xl font-bold text-white mt-1">
            Kalkulator Sinastri & Kecocokan Cinta
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-2">
            Bandingkan aspek astrologi antara dua tanda zodiak untuk mengungkap rahasia ketertarikan, resonansi emosional, dan masa depan hubungan Anda.
          </p>
        </div>

        {/* Interactive Selector Card */}
        <div className="rounded-3xl border border-rose-900/50 bg-gradient-to-br from-[#160d24] via-[#12081c] to-[#0c0914] p-6 sm:p-8 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-6">
            
            {/* Sign A Card */}
            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-5 md:col-span-5">
              <label className="block text-xs font-semibold text-rose-300 mb-2">
                Zodiak Pertama (Kamu):
              </label>
              <select
                value={signA}
                onChange={(e) => setSignA(e.target.value)}
                className="w-full rounded-xl border border-rose-800/60 bg-[#160c23] px-3.5 py-3 text-sm font-semibold text-white focus:border-rose-400 focus:outline-none"
              >
                {signs.map(s => (
                  <option key={s.name} value={s.name} className="bg-[#160c23]">
                    {s.symbol} {s.name} ({s.element}) - {s.dateRange}
                  </option>
                ))}
              </select>

              <div className="mt-4 flex items-center justify-between text-xs text-rose-300">
                <span>Unsur: <strong className="text-white">{ZODIAC_SIGNS[signA].element}</strong></span>
                <span>Planet: <strong className="text-white">{ZODIAC_SIGNS[signA].rulingPlanet}</strong></span>
                <span>Karakter: <strong className="text-white">{ZODIAC_SIGNS[signA].quality}</strong></span>
              </div>
            </div>

            {/* Middle Action / Swap */}
            <div className="flex flex-col items-center justify-center md:col-span-1">
              <button
                onClick={handleSwap}
                title="Tukar Posisi Zodiak"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-800/60 bg-rose-950/30 text-rose-300 hover:text-white hover:border-rose-500 transition-transform active:rotate-180"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Sign B Card */}
            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-5 md:col-span-5">
              <label className="block text-xs font-semibold text-rose-300 mb-2">
                Zodiak Kedua (Pasangan):
              </label>
              <select
                value={signB}
                onChange={(e) => setSignB(e.target.value)}
                className="w-full rounded-xl border border-rose-800/60 bg-[#160c23] px-3.5 py-3 text-sm font-semibold text-white focus:border-rose-400 focus:outline-none"
              >
                {signs.map(s => (
                  <option key={s.name} value={s.name} className="bg-[#160c23]">
                    {s.symbol} {s.name} ({s.element}) - {s.dateRange}
                  </option>
                ))}
              </select>

              <div className="mt-4 flex items-center justify-between text-xs text-rose-300">
                <span>Unsur: <strong className="text-white">{ZODIAC_SIGNS[signB].element}</strong></span>
                <span>Planet: <strong className="text-white">{ZODIAC_SIGNS[signB].rulingPlanet}</strong></span>
                <span>Karakter: <strong className="text-white">{ZODIAC_SIGNS[signB].quality}</strong></span>
              </div>
            </div>

          </div>

          {/* Results Display */}
          <div className="mt-8 border-t border-rose-950/60 pt-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Hasil Kompatibilitas Sinastri
                </span>
                <h2 className="font-display text-2xl font-bold text-white mt-1">
                  {signA} {ZODIAC_SIGNS[signA].symbol} & {signB} {ZODIAC_SIGNS[signB].symbol}
                </h2>
                <div className="mt-1 text-xs text-rose-300/80">
                  {synastry.verdict}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-mono text-4xl font-extrabold text-amber-300 tabular-nums">
                    {synastry.score}%
                  </div>
                  <span className="text-[11px] text-rose-300 font-medium">Skor Keselarasan</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-rose-100/90 leading-relaxed bg-[#150a22] p-4 rounded-2xl border border-rose-900/40">
              {synastry.summary}
            </p>

            {/* 4 Pillars of Love Synastry */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="text-xs text-rose-400 font-semibold mb-1">Percikan Kimiawi</div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">{synastry.chemistryScore}%</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-rose-950 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500" style={{ width: `${synastry.chemistryScore}%` }} />
                </div>
                <p className="text-[11px] text-rose-300/70 mt-2">Daya tarik fisik & gairah romantis spontan</p>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="text-xs text-rose-400 font-semibold mb-1">Resonansi Emosi</div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">{synastry.emotionalScore}%</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-rose-950 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-purple-400" style={{ width: `${synastry.emotionalScore}%` }} />
                </div>
                <p className="text-[11px] text-rose-300/70 mt-2">Kedalaman rasa aman & keterbukaan batin</p>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="text-xs text-rose-400 font-semibold mb-1">Komunikasi & Logika</div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">{synastry.communicationScore}%</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-rose-950 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-rose-400" style={{ width: `${synastry.communicationScore}%` }} />
                </div>
                <p className="text-[11px] text-rose-300/70 mt-2">Kelancaran diskusi & penyelesaian konflik</p>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="text-xs text-rose-400 font-semibold mb-1">Masa Depan & Komitmen</div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">{synastry.longTermScore}%</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-rose-950 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500" style={{ width: `${synastry.longTermScore}%` }} />
                </div>
                <p className="text-[11px] text-rose-300/70 mt-2">Stabilitas jangka panjang & visi bersama</p>
              </div>

            </div>

            {/* Strengths & Cosmic Advice */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/25 p-5">
                <h3 className="font-semibold text-white text-sm flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Kekuatan Utama Pasangan Ini</span>
                </h3>
                <ul className="space-y-2 text-xs text-rose-200/80">
                  {synastry.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/25 p-5">
                <h3 className="font-semibold text-white text-sm flex items-center gap-2 mb-3">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span>Panduan & Kiat Cinta Kosmik</span>
                </h3>
                <p className="text-xs text-rose-200/85 leading-relaxed">
                  {synastry.cosmicAdvice}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
