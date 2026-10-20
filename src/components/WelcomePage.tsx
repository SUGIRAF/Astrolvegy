import React, { useState } from 'react';
import { Sparkles, Heart, Compass, ShieldCheck, Flame, Moon, ArrowRight, Star, MapPin, Music, Volume2, Globe, Check, BookOpen, Utensils, Gift } from 'lucide-react';
import { ZODIAC_SIGNS, calculateSynastry } from '../utils/astrology';
import { HERO_IMAGE, INITIAL_MATCH_PROFILES } from '../data/mockProfiles';
import { sound } from '../utils/audio';

interface WelcomePageProps {
  onStartSignUp: () => void;
  onStartSignIn: () => void;
  onExploreDemo: () => void;
  onGoToEducation?: () => void;
}

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onStartSignUp,
  onStartSignIn,
  onExploreDemo,
  onGoToEducation
}) => {
  const [selectedZodiacA, setSelectedZodiacA] = useState<string>('Cancer');
  const [selectedZodiacB, setSelectedZodiacB] = useState<string>('Pisces');
  const [selectedCity, setSelectedCity] = useState<string>('Jakarta Selatan');

  const liveCompatibility = calculateSynastry(
    ZODIAC_SIGNS[selectedZodiacA],
    ZODIAC_SIGNS[selectedZodiacB]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0713] text-rose-50">
      
      {/* Background celestial glow elements */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-rose-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-pink-500/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-400/10 blur-[130px]" />

      {/* Floating Constellation Zodiac ticker banner (Aesthetic Gen-Z styling) */}
      <div className="w-full border-b border-rose-950/60 bg-[#12081f]/60 py-2 overflow-hidden backdrop-blur-sm">
        <div className="flex items-center justify-around text-xs font-mono text-rose-300/80 tracking-widest uppercase">
          {ZODIAC_SYMBOLS.map((sym, i) => (
            <span key={i} className="hover:text-rose-200 transition-colors cursor-default">
              {sym}
            </span>
          ))}
          <span className="text-[10px] text-amber-300 font-bold hidden sm:inline">
            ✦ GEN-Z ZODIAC SOULMATES ✦
          </span>
          {ZODIAC_SYMBOLS.slice(0, 6).map((sym, i) => (
            <span key={i} className="hover:text-rose-200 transition-colors cursor-default hidden md:inline">
              {sym}
            </span>
          ))}
        </div>
      </div>

      {/* ================= SECTION 1: HERO KOSMIK GEN-Z ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          
          {/* Left Column: Visual Headline */}
          <div className="flex flex-col justify-center lg:col-span-7">
            
            {/* Gen-Z aesthetic badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-950/50 px-4 py-1.5 text-xs font-bold text-rose-300 backdrop-blur-md w-fit shadow-md">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>Aplikasi Kencan Zodiak #1 di Indonesia</span>
              <span className="text-amber-300">✦</span>
              <span className="text-rose-200">Anti Gagal Frekuensi</span>
            </div>

            {/* Gen-Z Logo & Display Title */}
            <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              temukan jiwa yang{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
                sefrekuensi bintang.
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-rose-200/80 leading-relaxed max-w-xl">
              Cari pasangan satu kota berdasarkan peta kelahiran asli (Sun, Moon, Rising) dan sinastri akurat 99.4%. Langsung isi biodata, kenalan via WhatsApp, dan dengarkan lagu romantis favoritmu.
            </p>

            {/* Direct Biodata Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => { sound.playSparkle(); onStartSignUp(); }}
                className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="h-4 w-4 text-amber-200 group-hover:rotate-180 transition-transform duration-500" />
                <span>Isi Biodata & Cari Jodoh Sekotamu</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => { sound.playTap(); onStartSignIn(); }}
                className="rounded-full border border-rose-800/80 bg-rose-950/40 px-6 py-4 text-xs font-bold text-rose-200 hover:border-rose-400 hover:text-white transition-colors"
              >
                Masuk Akun Saya
              </button>
            </div>

            {/* Audio vibe pill */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playTap();
                  sound.toggleMusic();
                }}
                className="flex items-center gap-2 rounded-full border border-rose-500/30 bg-[#160c28] px-3.5 py-1.5 text-xs text-rose-300 hover:text-white transition-colors"
              >
                <Music className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
                <span>Play Vibe: NIKI, Taylor Swift, Ed Sheeran</span>
              </button>

              <button
                onClick={() => { sound.playTap(); onExploreDemo(); }}
                className="text-xs text-rose-400/80 hover:text-rose-200 underline underline-offset-4"
              >
                Lihat Demo Langsung →
              </button>
            </div>

            {/* Trust points chips */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-rose-300/80">
              <span className="flex items-center gap-1 rounded-full bg-rose-950/30 border border-rose-900/40 px-3 py-1">
                📍 Seluruh Kota Indonesia
              </span>
              <span className="flex items-center gap-1 rounded-full bg-rose-950/30 border border-rose-900/40 px-3 py-1">
                💬 Chat WhatsApp & Simpan Kontak
              </span>
              <span className="flex items-center gap-1 rounded-full bg-rose-950/30 border border-rose-900/40 px-3 py-1">
                📸 Akses Galeri Foto & Medsos
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Card Showcase */}
          <div className="relative lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl border border-rose-800/60 bg-gradient-to-b from-rose-950/60 to-[#12081f] p-3 shadow-2xl shadow-rose-950/90">
              
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-rose-950">
                <img
                  src={HERO_IMAGE}
                  alt="Astrolovegy Love Match"
                  className="h-full w-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0914] via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 rounded-full bg-[#0c0914]/80 px-3 py-1 text-xs font-bold text-white border border-rose-500/30 backdrop-blur-md">
                    <span>♋ Cancer</span>
                    <span className="text-rose-400">×</span>
                    <span>♓ Pisces</span>
                  </div>

                  <div className="rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1 text-xs font-black text-white shadow-lg">
                    99.4% Match
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-rose-500/40 bg-[#0c0914]/90 p-4 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">Clarissa & Rizky</div>
                      <div className="text-[11px] text-rose-300">📍 Jakarta Selatan · 2.8 km</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <span>✓ 1 Kota</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-rose-200/80 italic">
                    "Sinergi Bulan dan Venus kalian sempurna untuk kencan sore di kedai kopi."
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2: JODOH LOKAL DI KOTAMU ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-rose-950/40">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-wider text-rose-400 uppercase flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span>Jangkauan Kota Se-Indonesia</span>
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Pasangan Khas Asia & Indonesia yang Siap Bertemu
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Jomblo berkualitas dengan paras khas Asia dan selera kencan sefrekuensi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-rose-300 font-semibold">Pilih Kota:</span>
            <select
              value={selectedCity}
              onChange={(e) => { sound.playTap(); setSelectedCity(e.target.value); }}
              className="rounded-xl border border-rose-800/80 bg-[#160c28] px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Denpasar">Denpasar / Bali</option>
            </select>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_MATCH_PROFILES.slice(0, 3).map((match) => (
            <div
              key={match.id}
              className="group relative overflow-hidden rounded-3xl border border-rose-800/50 bg-[#140b22] shadow-xl hover:border-rose-500 hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950">
                <img
                  src={match.photo}
                  alt={match.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b22] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-[#0c0914]/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-rose-500/30">
                  <MapPin className="h-3 w-3 text-rose-400" />
                  <span>{match.city}</span>
                </div>

                <div className="absolute top-3 right-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow">
                  {match.sunSign.symbol} {match.sunSign.name}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-white">{match.name}, {match.age}</h3>
                  <span className="text-xs text-rose-400 font-semibold">{match.job}</span>
                </div>

                <p className="text-xs text-rose-200/80 line-clamp-2">
                  {match.bio}
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => { sound.playTap(); onStartSignUp(); }}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-xs font-bold text-white shadow hover:opacity-95 transition-opacity"
                  >
                    Cocokkan Biodata Saya
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION: EDUKASI ROMANTISME ZODIAK (Astro Romance Academy) ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-rose-950/40">
        <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-[#1c0d28] via-[#140a20] to-[#0d0716] p-6 sm:p-10 shadow-2xl">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300">
                <BookOpen className="h-3.5 w-3.5 text-pink-400" />
                <span>Fitur Baru: Astro Romance Academy</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Edukasi Romantisme <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200">12 Zodiak</span>
              </h2>

              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light">
                Kupas tuntas rahasia asmara zodiak gebetanmu! Pelajari hobi kencan favorit, makanan & minuman romantis kesukaan, cara memikat hatinya secara jitu, hingga hal yang pantang kamu lakukan saat PDKT.
              </p>

              {/* Quick Feature Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-2xl border border-rose-900/50 bg-[#190d28]/70 p-3 space-y-1">
                  <Utensils className="h-4 w-4 text-amber-300" />
                  <p className="text-xs font-bold text-white">Kuliner Kencan</p>
                  <p className="text-[10px] text-rose-300/70">Menu & dessert favorit</p>
                </div>

                <div className="rounded-2xl border border-rose-900/50 bg-[#190d28]/70 p-3 space-y-1">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <p className="text-xs font-bold text-white">Sifat Asmara</p>
                  <p className="text-[10px] text-rose-300/70">Gaya romantis & flirting</p>
                </div>

                <div className="rounded-2xl border border-rose-900/50 bg-[#190d28]/70 p-3 space-y-1">
                  <Compass className="h-4 w-4 text-sky-400" />
                  <p className="text-xs font-bold text-white">Hobi & Spot</p>
                  <p className="text-[10px] text-rose-300/70">Tempat kencan impian</p>
                </div>

                <div className="rounded-2xl border border-rose-900/50 bg-[#190d28]/70 p-3 space-y-1">
                  <Gift className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs font-bold text-white">Kado & Green Flag</p>
                  <p className="text-[10px] text-rose-300/70">Cara memikat hatinya</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col items-center sm:items-start lg:items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  sound.playSparkle();
                  if (onGoToEducation) onGoToEducation();
                }}
                className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="h-4 w-4 text-amber-200 group-hover:rotate-180 transition-transform duration-500" />
                <span>Buka Edukasi Romansa Lengkap</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-[11px] text-rose-300/70 font-mono">
                Tersedia gratis untuk semua 12 tanda zodiak
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: QUICK SYNASTRY TESTER ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-rose-950/40">
        <div className="rounded-3xl border border-rose-900/50 bg-[#160d26] p-6 sm:p-8 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Uji Cepat Frekuensi Kosmik
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Cek Getaran Dua Zodiak Pilihanmu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4">
            
            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4 md:col-span-4">
              <label className="block text-xs font-bold text-rose-300 mb-2">Zodiak Kamu:</label>
              <select
                value={selectedZodiacA}
                onChange={(e) => { sound.playTap(); setSelectedZodiacA(e.target.value); }}
                className="w-full rounded-xl border border-rose-800/60 bg-[#140b20] px-3 py-2 text-xs font-semibold text-white focus:outline-none"
              >
                {Object.values(ZODIAC_SIGNS).map(z => (
                  <option key={z.name} value={z.name}>
                    {z.symbol} {z.name} ({z.element})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center justify-center md:col-span-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-lg animate-pulse">
                <Heart className="h-6 w-6 fill-white" />
              </div>
              <div className="font-mono text-2xl font-black text-amber-300 mt-1">
                {liveCompatibility.score}%
              </div>
              <span className="text-[10px] text-rose-300 font-medium">{liveCompatibility.verdict}</span>
            </div>

            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4 md:col-span-4">
              <label className="block text-xs font-bold text-rose-300 mb-2">Zodiak Gebetan:</label>
              <select
                value={selectedZodiacB}
                onChange={(e) => { sound.playTap(); setSelectedZodiacB(e.target.value); }}
                className="w-full rounded-xl border border-rose-800/60 bg-[#140b20] px-3 py-2 text-xs font-semibold text-white focus:outline-none"
              >
                {Object.values(ZODIAC_SIGNS).map(z => (
                  <option key={z.name} value={z.name}>
                    {z.symbol} {z.name} ({z.element})
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-950/40 py-8 text-center text-xs text-rose-300/60">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-rose-200">astrolovegy ✦</span>
            <span>·</span>
            <span>Aplikasi Kencan Zodiak Romantis Indonesia</span>
          </div>
          <p>© {new Date().getFullYear()} Astrolovegy. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};
