import React, { useState } from 'react';
import { UserProfile, MatchProfile } from '../types';
import { INITIAL_MATCH_PROFILES } from '../data/mockProfiles';
import { calculateSynastry, SynastryResult } from '../utils/astrology';
import { recordSwipe } from '../services/storage';
import { 
  Heart, X, Star, Sparkles, MessageCircle, MapPin, Compass, 
  ShieldCheck, Flame, ArrowRight, RotateCcw, ExternalLink, 
  Instagram, Globe, Check, SlidersHorizontal, Coffee, Music, Eye, BookOpen
} from 'lucide-react';
import { sound } from '../utils/audio';

interface LoveMatchViewProps {
  currentUser: UserProfile;
  onOpenChatWithMatch: (matchId: string) => void;
  onOpenSynastryLab: (matchSign: string) => void;
  onRefreshUser: (user: UserProfile) => void;
  onGoToProfileSettings?: () => void;
  onGoToEducation?: () => void;
}

export const LoveMatchView: React.FC<LoveMatchViewProps> = ({
  currentUser,
  onOpenChatWithMatch,
  onOpenSynastryLab,
  onRefreshUser,
  onGoToProfileSettings,
  onGoToEducation
}) => {
  // Creative section navigation within Love Match
  const [activeSection, setActiveSection] = useState<'deck' | 'same_city' | 'top_matches' | 'grid'>('deck');

  // Filters
  const [elementFilter, setElementFilter] = useState<'Semua' | 'Api' | 'Tanah' | 'Udara' | 'Air'>('Semua');
  const [sameCityOnly, setSameCityOnly] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>(currentUser.birthCity || 'Semua Kota');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [matchedCandidate, setMatchedCandidate] = useState<{ profile: MatchProfile; synastry: SynastryResult } | null>(null);

  // Map & calculate synastry for all candidates
  const allCalculatedProfiles = INITIAL_MATCH_PROFILES.map(profile => {
    const synastry = calculateSynastry(
      currentUser.sunSign,
      profile.sunSign,
      currentUser.moonSign,
      profile.moonSign
    );
    return {
      profile,
      synastry
    };
  });

  // Filtered profiles for current view
  const candidateProfiles = allCalculatedProfiles.filter(item => {
    // Gender filter
    if (currentUser.interestedIn !== 'Semua' && item.profile.gender !== currentUser.interestedIn) {
      return false;
    }
    // Element filter
    if (elementFilter !== 'Semua' && item.profile.element !== elementFilter) {
      return false;
    }
    // Same city filter
    if (sameCityOnly) {
      const userCity = (currentUser.birthCity || '').toLowerCase();
      const matchCity = item.profile.city.toLowerCase();
      const isSame = matchCity.includes(userCity) || userCity.includes(matchCity);
      if (!isSame) return false;
    } else if (selectedCity !== 'Semua Kota') {
      if (!item.profile.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => b.synastry.score - a.synastry.score);

  // Same city candidates specifically
  const sameCityProfiles = allCalculatedProfiles.filter(item => {
    const userCity = (currentUser.birthCity || 'Jakarta Selatan').toLowerCase();
    const matchCity = item.profile.city.toLowerCase();
    return matchCity.includes(userCity) || userCity.includes(matchCity);
  });

  // Top 95%+ Soulmate profiles
  const topSoulmates = allCalculatedProfiles.filter(item => item.synastry.score >= 94);

  const currentItem = candidateProfiles[currentIndex] || null;

  const handleSwipeAction = (action: 'like' | 'pass' | 'superlike') => {
    if (!currentItem) return;

    if (action === 'like') sound.playMatch();
    else if (action === 'superlike') sound.playSparkle();
    else sound.playTap();

    const { isMatch, user } = recordSwipe(currentUser.id, currentItem.profile.id, action);
    onRefreshUser(user);

    if (isMatch) {
      setMatchedCandidate(currentItem);
    } else {
      if (currentIndex < candidateProfiles.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  const handleNextAfterMatch = () => {
    sound.playTap();
    setMatchedCandidate(null);
    if (currentIndex < candidateProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0c0914] text-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-pink-600/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        
        {/* Top Header & City Location Badge */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-rose-950/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
              <span>Sinergi Kosmik Anda</span>
              <span aria-hidden="true">·</span>
              <span>{currentUser.sunSign.name} {currentUser.sunSign.symbol} + Moon {currentUser.moonSign.name}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-white">
                <MapPin className="h-3 w-3 text-rose-400" />
                <span>{currentUser.birthCity}</span>
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Love Match: Temukan Belahan Jiwa Astrologi
            </h1>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Kecocokan astrologi akurat berdasarkan kalkulasi Sun, Moon, dan Rising sign Anda.
            </p>
          </div>

          {/* Quick city toggle indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSameCityOnly(!sameCityOnly); setCurrentIndex(0); }}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all border ${
                sameCityOnly
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-500 shadow-lg shadow-rose-950/50 scale-105'
                  : 'bg-rose-950/30 text-rose-300 border-rose-900/50 hover:border-rose-600 hover:text-white'
              }`}
            >
              <MapPin className="h-3.5 w-3.5 text-rose-400" />
              <span>Satu Kota Saja ({currentUser.birthCity})</span>
              {sameCityOnly && <Check className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Section Tabs Navigation Bar */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-rose-950/70">
          <button
            onClick={() => { setActiveSection('deck'); setCurrentIndex(0); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'deck'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Kartu Eksplorasi Cinta</span>
          </button>

          <button
            onClick={() => setActiveSection('same_city')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'same_city'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Jodoh Satu Kota ({sameCityProfiles.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('top_matches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'top_matches'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            <span>Harmoni Tertinggi 95%+ ({topSoulmates.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'grid'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Galeri Grid Lengkap</span>
          </button>

          {onGoToEducation && (
            <button
              onClick={() => { sound.playTap(); onGoToEducation(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 border border-rose-500/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500 hover:text-white"
            >
              <BookOpen className="h-3.5 w-3.5 text-pink-400" />
              <span>Edukasi Romansa Zodiak ✦</span>
            </button>
          )}
        </div>

        {/* Filter controls row for deck & grid */}
        {(activeSection === 'deck' || activeSection === 'grid') && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#130b20] p-3 rounded-2xl border border-rose-900/40 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-400 font-semibold mr-1">Filter Unsur:</span>
              {(['Semua', 'Api', 'Tanah', 'Udara', 'Air'] as const).map((elem) => (
                <button
                  key={elem}
                  onClick={() => { setElementFilter(elem); setCurrentIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    elementFilter === elem
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-rose-300 hover:text-white'
                  }`}
                >
                  {elem === 'Api' && '🔥 '}
                  {elem === 'Tanah' && '🌍 '}
                  {elem === 'Udara' && '💨 '}
                  {elem === 'Air' && '🌊 '}
                  {elem}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-rose-400 font-semibold">Domisili:</span>
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentIndex(0); }}
                className="rounded-lg border border-rose-900/60 bg-[#190e28] px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="Semua Kota">Semua Kota</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Jakarta Pusat">Jakarta Pusat</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
              </select>
            </div>
          </div>
        )}

        {/* ================= SECTION 1: INTERACTIVE CARD DECK ================= */}
        {activeSection === 'deck' && (
          candidateProfiles.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-rose-900/40 bg-[#140c22] p-8 text-center my-12">
              <Compass className="mx-auto h-12 w-12 text-rose-400 mb-3" />
              <h3 className="font-display text-xl font-bold text-white">Tidak Ada Profil Ditemukan</h3>
              <p className="mt-2 text-xs text-rose-200/70">
                Tidak ada pasangan yang memenuhi filter saat ini.
              </p>
              <button
                onClick={() => { setSameCityOnly(false); setElementFilter('Semua'); setSelectedCity('Semua Kota'); }}
                className="mt-4 rounded-full bg-rose-600 px-5 py-2 text-xs font-semibold text-white"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : currentItem && (
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Big Interactive Dating Card */}
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-3xl border border-rose-800/50 bg-[#160d24] shadow-2xl shadow-rose-950/80">
                    
                    {/* Photo with measured scrim */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-rose-950/50">
                      <img
                        src={currentItem.profile.photo}
                        alt={currentItem.profile.name}
                        className="h-full w-full object-cover select-none"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0914] via-[#0c0914]/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 rounded-full bg-[#0c0914]/85 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-rose-500/30">
                          <span className="text-rose-400 text-sm">{currentItem.profile.sunSign.symbol}</span>
                          <span>{currentItem.profile.sunSign.name}</span>
                          <span className="text-rose-400">·</span>
                          <span>{currentItem.profile.element}</span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-rose-950/80">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span className="tabular-nums">{currentItem.synastry.score}% Match</span>
                        </div>
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold text-white">
                            {currentItem.profile.name}, {currentItem.profile.age}
                          </h2>
                          {currentItem.profile.verified && (
                            <ShieldCheck className="h-5 w-5 text-rose-400" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-rose-200/90 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-rose-400" />
                          <span className="font-semibold text-amber-200">{currentItem.profile.city}</span>
                          <span>·</span>
                          <span>{currentItem.profile.job}</span>
                          <span>·</span>
                          <span className="tabular-nums">{currentItem.profile.distanceKm} km</span>
                        </div>

                        {/* Social Media Link Chips */}
                        <div className="mt-3 flex items-center gap-2">
                          {currentItem.profile.instagramUrl && (
                            <a
                              href={currentItem.profile.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full bg-pink-950/70 border border-pink-500/40 px-2.5 py-1 text-[11px] font-medium text-pink-200 hover:border-pink-300 transition-colors backdrop-blur-sm"
                            >
                              <Instagram className="h-3 w-3 text-pink-400" />
                              <span>@{currentItem.profile.instagramUrl.split('/').pop()}</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          )}

                          {currentItem.profile.tiktokUrl && (
                            <a
                              href={currentItem.profile.tiktokUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-1 text-[11px] font-medium text-cyan-200 hover:border-cyan-300 transition-colors backdrop-blur-sm"
                            >
                              <Globe className="h-3 w-3 text-cyan-400" />
                              <span>@{currentItem.profile.tiktokUrl.split('@').pop()}</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-6 p-5 border-t border-rose-950 bg-[#12081c]">
                      <button
                        onClick={() => handleSwipeAction('pass')}
                        title="Lewati (Pass)"
                        className="group flex h-14 w-14 items-center justify-center rounded-full border border-rose-900/60 bg-rose-950/20 text-rose-300 transition-all hover:scale-110 hover:border-rose-700 hover:bg-rose-950/60 hover:text-white active:scale-95 shadow-md"
                      >
                        <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
                      </button>

                      <button
                        onClick={() => handleSwipeAction('superlike')}
                        title="Super Cosmic Spark!"
                        className="group flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 transition-all hover:scale-110 hover:border-amber-400 hover:bg-amber-500/25 active:scale-95 shadow-md shadow-amber-950/30"
                      >
                        <Star className="h-6 w-6 transition-transform group-hover:rotate-12 fill-amber-300/30" />
                      </button>

                      <button
                        onClick={() => handleSwipeAction('like')}
                        title="Cocok & Love"
                        className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-500 text-white shadow-xl shadow-rose-900/50 transition-all hover:scale-110 active:scale-95"
                      >
                        <Heart className="h-8 w-8 fill-white transition-transform group-hover:scale-110" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right Column: Deep Synastry Report */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-rose-950 pb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                        Analisis Sinastri Astrologi
                      </span>
                      <span className="font-mono text-sm font-bold text-amber-300 tabular-nums">
                        {currentItem.synastry.score}% Kompatibel
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mt-3">
                      {currentItem.synastry.verdict}
                    </h3>

                    <p className="text-xs sm:text-sm text-rose-200/80 mt-2 leading-relaxed">
                      {currentItem.synastry.summary}
                    </p>

                    {/* Gauges */}
                    <div className="mt-5 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-rose-300 mb-1">
                          <span>Percikan Kimiawi (Chemistry)</span>
                          <span className="font-mono text-white tabular-nums">{currentItem.synastry.chemistryScore}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-rose-950/60 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400" style={{ width: `${currentItem.synastry.chemistryScore}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-rose-300 mb-1">
                          <span>Resonansi Emosional (Moon)</span>
                          <span className="font-mono text-white tabular-nums">{currentItem.synastry.emotionalScore}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-rose-950/60 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-400" style={{ width: `${currentItem.synastry.emotionalScore}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-rose-300 mb-1">
                          <span>Aliran Komunikasi (Mercury)</span>
                          <span className="font-mono text-white tabular-nums">{currentItem.synastry.communicationScore}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-rose-950/60 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-rose-400" style={{ width: `${currentItem.synastry.communicationScore}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-rose-900/40 bg-rose-950/30 p-4 text-xs text-rose-200">
                      <div className="flex items-center gap-2 text-rose-300 font-semibold mb-1">
                        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                        <span>Saran Kencan Kosmik:</span>
                      </div>
                      <p className="text-rose-200/85 leading-relaxed">
                        {currentItem.synastry.cosmicAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Bio Card */}
                  <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-6 shadow-xl space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                        Bio & Bahasa Cinta
                      </span>
                      <p className="text-xs sm:text-sm text-rose-100 mt-1 leading-relaxed">
                        "{currentItem.profile.bio}"
                      </p>
                    </div>

                    <div className="border-t border-rose-950 pt-3">
                      <span className="text-xs font-semibold text-rose-400">Love Language:</span>
                      <p className="text-xs text-rose-200 mt-0.5">{currentItem.profile.loveLanguage}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )
        )}

        {/* ================= SECTION 2: JODOH SATU KOTA ================= */}
        {activeSection === 'same_city' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-rose-900/50 bg-gradient-to-br from-[#160d26] via-[#12081c] to-[#0c0914] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Radar Pasangan Lokal</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white mt-1">
                    Jodoh Kosmik di {currentUser.birthCity}
                  </h2>
                  <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
                    Daftar calon pasangan yang tinggal di kota yang sama dengan Anda untuk mempermudah kencan tatap muka pertama.
                  </p>
                </div>

                {onGoToProfileSettings && (
                  <button
                    onClick={onGoToProfileSettings}
                    className="flex items-center gap-1.5 rounded-full border border-rose-800 bg-rose-950/40 px-4 py-2 text-xs font-semibold text-rose-300 hover:text-white shrink-0"
                  >
                    <span>Ubah Domisili Kota</span>
                  </button>
                )}
              </div>
            </div>

            {/* Same City Profiles Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sameCityProfiles.map(({ profile, synastry }) => (
                <div
                  key={profile.id}
                  className="group relative overflow-hidden rounded-3xl border border-rose-800/50 bg-[#140b22] shadow-xl transition-all hover:border-rose-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140b22] via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#0c0914]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-rose-500/20">
                      <MapPin className="h-3 w-3 text-rose-400" />
                      <span>{profile.city}</span>
                    </div>

                    <div className="absolute top-3 right-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow">
                      {synastry.score}% Match
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-bold text-white">{profile.name}, {profile.age}</h3>
                      <span className="text-xs font-semibold text-amber-300">{profile.distanceKm} km</span>
                    </div>

                    <p className="text-xs text-rose-200/80 line-clamp-2">
                      {profile.bio}
                    </p>

                    {/* Social Media Link */}
                    {profile.instagramUrl && (
                      <a
                        href={profile.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-pink-300 hover:text-pink-200 font-medium"
                      >
                        <Instagram className="h-3 w-3 text-pink-400" />
                        <span>@{profile.instagramUrl.split('/').pop()}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => onOpenChatWithMatch(profile.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-2.5 text-xs font-semibold text-white shadow-md hover:opacity-90"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Ajak Kencan Sekota</span>
                      </button>

                      <button
                        onClick={() => {
                          const { user } = recordSwipe(currentUser.id, profile.id, 'like');
                          onRefreshUser(user);
                          setMatchedCandidate({ profile, synastry });
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-800 bg-rose-950/40 text-rose-300 hover:text-white hover:border-rose-500"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 3: TOP SOULMATES (95%+) ================= */}
        {activeSection === 'top_matches' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-rose-900/50 bg-gradient-to-br from-[#1c0d2b] via-[#12081c] to-[#0c0914] p-6 sm:p-8 shadow-xl">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-300" />
                <span>Koneksi Jiwa Kembar (Twin Flame)</span>
              </span>
              <h2 className="font-display text-2xl font-bold text-white mt-1">
                Kecocokan Astrologi Tertinggi 95%+
              </h2>
              <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
                Profil dengan aspek planet harmonis dan keselarasan Sun-Moon paling ideal untuk Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSoulmates.map(({ profile, synastry }) => (
                <div
                  key={profile.id}
                  className="rounded-3xl border border-rose-700/60 bg-[#160d26] p-5 shadow-xl space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-rose-500 shadow-md">
                      <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-white">{profile.name}, {profile.age}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-rose-300">
                        <span>{profile.sunSign.symbol} {profile.sunSign.name}</span>
                        <span>·</span>
                        <span>{profile.city}</span>
                      </div>
                      <div className="font-mono text-sm font-bold text-amber-300 mt-0.5">
                        {synastry.score}% Kompatibel
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    "{profile.bio}"
                  </p>

                  <div className="rounded-xl border border-rose-900/40 bg-rose-950/30 p-2.5 text-xs text-rose-200">
                    <span className="font-semibold text-rose-300">Mengapa Cocok:</span> {synastry.verdict}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenChatWithMatch(profile.id)}
                      className="flex-1 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-2.5 text-xs font-semibold text-white text-center shadow hover:opacity-90"
                    >
                      Kirim Pesan
                    </button>
                    <button
                      onClick={() => onOpenSynastryLab(profile.sunSign.name)}
                      className="rounded-xl border border-rose-800 bg-rose-950/40 px-3 py-2.5 text-xs font-medium text-rose-200 hover:text-white"
                    >
                      Bagan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 4: FULL GRID ================= */}
        {activeSection === 'grid' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {candidateProfiles.map(({ profile, synastry }) => (
              <div
                key={profile.id}
                className="group relative overflow-hidden rounded-3xl border border-rose-900/50 bg-[#140b22] shadow-xl transition-all duration-300 hover:border-rose-600 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950/50">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140b22] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#0c0914]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-rose-500/20">
                    <span>{profile.sunSign.symbol}</span>
                    <span>{profile.sunSign.name}</span>
                  </div>

                  <div className="absolute top-3 right-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    {synastry.score}% Match
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-white">{profile.name}, {profile.age}</h3>
                    <span className="text-xs text-rose-400">{profile.city}</span>
                  </div>

                  <p className="text-xs text-rose-200/80 line-clamp-2">
                    {profile.bio}
                  </p>

                  {/* Social media direct links */}
                  <div className="flex items-center gap-2">
                    {profile.instagramUrl && (
                      <a
                        href={profile.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-pink-300 hover:text-pink-200 font-medium"
                      >
                        <Instagram className="h-3 w-3 text-pink-400" />
                        <span>@{profile.instagramUrl.split('/').pop()}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => onOpenChatWithMatch(profile.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-2.5 text-xs font-semibold text-white hover:opacity-90 shadow-md"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Kirim Pesan</span>
                    </button>

                    <button
                      onClick={() => {
                        const { user } = recordSwipe(currentUser.id, profile.id, 'like');
                        onRefreshUser(user);
                        setMatchedCandidate({ profile, synastry });
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-800 bg-rose-950/40 text-rose-300 hover:text-white hover:border-rose-500"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================= CELEBRATION MODAL: IT'S A MATCH! ================= */}
      {matchedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-rose-500/50 bg-gradient-to-b from-[#1c0d2b] to-[#0d0716] p-8 text-center text-rose-50 shadow-2xl shadow-rose-950 overflow-hidden">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-rose-500/25 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/40 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Koneksi Kosmik Terjalin!</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
                It's a Cosmic Match!
              </h2>

              <p className="text-xs text-rose-200/80 mt-1">
                Bintang merestui pertemuan Anda dengan {matchedCandidate.profile.name} di {matchedCandidate.profile.city}
              </p>

              {/* Overlapping profile avatars */}
              <div className="my-6 flex items-center justify-center">
                <div className="relative -mr-3 h-20 w-20 overflow-hidden rounded-full ring-4 ring-rose-500 shadow-xl z-10">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] font-bold text-white py-0.5">
                    {currentUser.sunSign.symbol}
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg z-20">
                  <Heart className="h-5 w-5 fill-white animate-pulse" />
                </div>

                <div className="relative -ml-3 h-20 w-20 overflow-hidden rounded-full ring-4 ring-pink-500 shadow-xl z-10">
                  <img
                    src={matchedCandidate.profile.photo}
                    alt={matchedCandidate.profile.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] font-bold text-white py-0.5">
                    {matchedCandidate.profile.sunSign.symbol}
                  </div>
                </div>
              </div>

              {/* Score highlight */}
              <div className="rounded-2xl border border-rose-800/40 bg-rose-950/40 p-3.5 text-xs">
                <div className="font-semibold text-white">
                  Skor Harmoni: <strong className="text-amber-300 text-sm font-mono tabular-nums">{matchedCandidate.synastry.score}%</strong>
                </div>
                <div className="text-rose-300/80 mt-1">
                  "{matchedCandidate.synastry.verdict}"
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => {
                    const id = matchedCandidate.profile.id;
                    setMatchedCandidate(null);
                    onOpenChatWithMatch(id);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 py-3.5 text-xs font-bold text-white shadow-lg shadow-rose-900/60 hover:opacity-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Kirim Pesan Kosmik Sekarang</span>
                </button>

                <button
                  onClick={handleNextAfterMatch}
                  className="w-full py-2.5 text-xs font-semibold text-rose-300 hover:text-white"
                >
                  Lanjut Lihat Profil Lain
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
