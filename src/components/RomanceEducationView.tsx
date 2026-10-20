import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ZODIAC_ROMANCE_EDUCATION } from '../data/zodiacRomanceEducation';
import { sound } from '../utils/audio';
import { 
  Sparkles, Heart, Utensils, Compass, Flame, ShieldAlert, 
  Gift, MessageCircle, Star, Search, CheckCircle2, 
  Smile, Coffee, MapPin, Feather, ArrowRight, Eye, Music
} from 'lucide-react';

interface RomanceEducationViewProps {
  currentUser: UserProfile | null;
  onOpenSynastryWithSign?: (sign: string) => void;
  onGoToLoveMatch?: () => void;
}

export const RomanceEducationView: React.FC<RomanceEducationViewProps> = ({
  currentUser,
  onOpenSynastryWithSign,
  onGoToLoveMatch
}) => {
  // Default to user's sun sign if available, otherwise Aries
  const initialSign = currentUser?.sunSign?.name && ZODIAC_ROMANCE_EDUCATION[currentUser.sunSign.name]
    ? currentUser.sunSign.name
    : 'Aries';

  const [selectedSign, setSelectedSign] = useState<string>(initialSign);
  const [selectedElement, setSelectedElement] = useState<'Semua' | 'Api' | 'Tanah' | 'Udara' | 'Air'>('Semua');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'dates' | 'culinary' | 'tips' | 'soulmates'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const zodiacList = Object.values(ZODIAC_ROMANCE_EDUCATION);

  // Filtered signs by element and search query
  const filteredSigns = zodiacList.filter((item) => {
    const matchesElement = selectedElement === 'Semua' || item.element === selectedElement;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.traits.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.hobbies.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.favoriteFoods.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesElement && matchesSearch;
  });

  const activeData = ZODIAC_ROMANCE_EDUCATION[selectedSign] || ZODIAC_ROMANCE_EDUCATION.Aries;

  const handleSelectSign = (sign: string) => {
    sound.playTap();
    setSelectedSign(sign);
  };

  const handleElementFilter = (el: 'Semua' | 'Api' | 'Tanah' | 'Udara' | 'Air') => {
    sound.playTap();
    setSelectedElement(el);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Api':
        return 'from-rose-500/20 to-amber-500/20 border-rose-500/40 text-amber-300';
      case 'Tanah':
        return 'from-emerald-500/20 to-lime-500/20 border-emerald-500/40 text-emerald-300';
      case 'Udara':
        return 'from-sky-500/20 to-indigo-500/20 border-sky-500/40 text-sky-300';
      case 'Air':
        return 'from-blue-500/20 to-purple-500/20 border-blue-500/40 text-purple-300';
      default:
        return 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-300';
    }
  };

  const getElementBadge = (element: string) => {
    switch (element) {
      case 'Api':
        return 'bg-gradient-to-r from-red-500/30 to-amber-500/30 border-amber-500/50 text-amber-300';
      case 'Tanah':
        return 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-500/50 text-emerald-300';
      case 'Udara':
        return 'bg-gradient-to-r from-cyan-500/30 to-sky-500/30 border-sky-500/50 text-sky-300';
      case 'Air':
        return 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-purple-500/50 text-purple-300';
      default:
        return 'bg-rose-500/20 border-rose-500/40 text-rose-300';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-fadeIn">
      
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-[#1b0d28] via-[#140b20] to-[#0c0715] p-6 sm:p-10 shadow-2xl shadow-rose-950/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
              <span>Astro Romance Academy & Encyclopedia</span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Edukasi Romantisme <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200">12 Zodiak</span>
            </h1>

            <p className="text-sm sm:text-base text-rose-200/80 leading-relaxed font-light">
              Pelajari rahasia asmara paling intim untuk setiap zodiak: mulai dari hobi kencan favorit, kuliner romantis yang bikin luluh, cara memikat hatinya, hingga hal yang wajib dihindari.
            </p>
          </div>

          {/* Quick Stat / Active User's Sign indicator */}
          {currentUser && (
            <div className="shrink-0 flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-2xl shadow-md text-white font-bold">
                {currentUser.sunSign.symbol}
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-rose-300 uppercase">Zodiak Utamamu</p>
                <p className="font-bold text-white text-base">{currentUser.sunSign.name}</p>
                <button
                  onClick={() => handleSelectSign(currentUser.sunSign.name)}
                  className="text-xs text-rose-400 hover:text-rose-200 underline mt-0.5"
                >
                  Lihat Panduan Cintaku →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 pt-6 border-t border-rose-900/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Element Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {(['Semua', 'Api', 'Tanah', 'Udara', 'Air'] as const).map((elem) => (
              <button
                key={elem}
                onClick={() => handleElementFilter(elem)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  selectedElement === elem
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-900/50'
                    : 'border border-rose-900/50 bg-[#160d24]/60 text-rose-200 hover:border-rose-400 hover:text-white'
                }`}
              >
                {elem === 'Api' && '🔥 '}
                {elem === 'Tanah' && '🌿 '}
                {elem === 'Udara' && '💨 '}
                {elem === 'Air' && '💧 '}
                {elem}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-400/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari hobi, makanan, zodiak..."
              className="w-full rounded-full border border-rose-900/60 bg-[#120a1c]/90 py-2 pl-9 pr-4 text-xs text-rose-100 placeholder-rose-400/50 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400 transition-all"
            />
          </div>

        </div>
      </div>

      {/* Zodiac Cards Horizontal Selector Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-300/80">Pilih Zodiak untuk Dibedah</span>
          <span className="text-xs text-rose-400/70">{filteredSigns.length} Zodiak Tersedia</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-rose-900 scrollbar-track-transparent">
          {filteredSigns.map((z) => {
            const isSelected = selectedSign === z.name;
            return (
              <button
                key={z.name}
                onClick={() => handleSelectSign(z.name)}
                className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'border-rose-400 bg-gradient-to-r from-rose-500/30 to-pink-500/20 text-white shadow-lg shadow-rose-950/60 ring-1 ring-rose-400'
                    : 'border-rose-950/80 bg-[#150c22]/70 text-rose-200/80 hover:border-rose-800/80 hover:text-white'
                }`}
              >
                <span className="text-2xl">{z.symbol}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold">{z.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full border ${getElementBadge(z.element)}`}>
                      {z.element}
                    </span>
                  </div>
                  <span className="text-[10px] text-rose-300/70 font-mono block">
                    {z.romanticTitle.split(' ')[1] || 'Asmara'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Zodiac Deep Romance Profile */}
      <div className="space-y-6">
        
        {/* Zodiac Showcase Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-[#180e25] via-[#12081d] to-[#0d0716] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start gap-5">
              {/* Big Zodiac Symbol Badge */}
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-amber-300 p-1 shadow-lg shadow-rose-950">
                <div className="flex h-full w-full items-center justify-center rounded-[20px] bg-[#140b20]">
                  <span className="text-4xl sm:text-5xl text-rose-200 select-none">{activeData.symbol}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-white">
                    {activeData.name}
                  </h2>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getElementBadge(activeData.element)}`}>
                    Elemen {activeData.element}
                  </span>
                </div>

                <p className="font-medium text-rose-300 text-sm sm:text-base">
                  {activeData.romanticTitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-rose-300/80 pt-1 font-mono">
                  <span>💌 Love Language: <strong className="text-rose-100">{activeData.loveLanguage.primary}</strong></span>
                  <span>•</span>
                  <span>✨ Flirting: <strong className="text-rose-100">{activeData.flirtingStyle.split(',')[0]}</strong></span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:self-end lg:self-center">
              {onOpenSynastryWithSign && (
                <button
                  onClick={() => {
                    sound.playTap();
                    onOpenSynastryWithSign(activeData.name);
                  }}
                  className="flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-950/40 px-4 py-2.5 text-xs font-semibold text-rose-200 hover:bg-rose-900/60 hover:text-white transition-all shadow-md active:scale-95"
                >
                  <Compass className="h-3.5 w-3.5 text-rose-400" />
                  <span>Uji Sinastri dengan {activeData.name}</span>
                </button>
              )}

              {onGoToLoveMatch && (
                <button
                  onClick={() => {
                    sound.playTap();
                    onGoToLoveMatch();
                  }}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-950/60 hover:opacity-95 transition-all active:scale-95"
                >
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  <span>Cari Jodoh {activeData.name}</span>
                </button>
              )}
            </div>

          </div>

          {/* Romantic Quote Banner */}
          <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-950/20 p-4 sm:p-5 text-center sm:text-left relative">
            <Feather className="hidden sm:block absolute right-4 top-4 h-6 w-6 text-rose-500/30" />
            <p className="font-serif italic text-sm sm:text-base text-rose-200/90 leading-relaxed">
              {activeData.quote}
            </p>
          </div>

          {/* Romance Persona Deep Paragraph */}
          <div className="mt-5 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400/90">
              Psikologi & Filosofi Cinta {activeData.name}
            </h4>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              {activeData.romancePersona}
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Sub-Tabs */}
        <div className="flex border-b border-rose-950/80 gap-2 sm:gap-4 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'overview', label: 'Karakter & Love Language', icon: Heart },
            { id: 'dates', label: 'Hobi & Kencan Impian', icon: MapPin },
            { id: 'culinary', label: 'Makanan & Minuman Cinta', icon: Utensils },
            { id: 'tips', label: 'Cara Memikat & Hadiah', icon: Gift },
            { id: 'soulmates', label: 'Pasangan Klop / Sinastri', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTap();
                  setActiveSubTab(tab.id as any);
                }}
                className={`flex items-center gap-2 whitespace-nowrap px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-[2px] ${
                  isActive
                    ? 'border-rose-400 text-rose-300 font-bold'
                    : 'border-transparent text-rose-300/60 hover:text-rose-200 hover:border-rose-800'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-rose-400' : 'text-rose-400/60'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Karakter & Love Language */}
        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            
            {/* Sifat & Karakter Asmara */}
            <div className="rounded-3xl border border-rose-900/40 bg-[#140a1e]/80 p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <Smile className="h-4 w-4 text-rose-400" />
                <span>Ciri Khas & Sifat Romantis {activeData.name}</span>
              </div>

              <div className="space-y-2.5">
                {activeData.traits.map((trait, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-rose-950/80 bg-[#190d26]/60 p-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-rose-100">{trait}</span>
                  </div>
                ))}
              </div>

              {/* Gaya Flirting */}
              <div className="mt-4 pt-4 border-t border-rose-900/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Gaya Flirting & Menggoda</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-200/90 bg-[#1c0f2d]/80 rounded-xl p-3 border border-rose-900/40">
                  {activeData.flirtingStyle}
                </p>
              </div>
            </div>

            {/* Love Language Breakdown */}
            <div className="rounded-3xl border border-rose-900/40 bg-[#140a1e]/80 p-6 space-y-5 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <Heart className="h-4 w-4 text-rose-400 fill-current" />
                  <span>Bahasa Cinta (Love Language) {activeData.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/20 to-transparent p-4">
                    <span className="text-[10px] font-mono text-rose-300 uppercase tracking-widest block mb-1">Utama (Primary)</span>
                    <span className="font-bold text-white text-sm sm:text-base">{activeData.loveLanguage.primary}</span>
                  </div>

                  <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-transparent p-4">
                    <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest block mb-1">Sekunder (Secondary)</span>
                    <span className="font-bold text-white text-sm sm:text-base">{activeData.loveLanguage.secondary}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-900/50 bg-[#180d26] p-4 text-xs sm:text-sm text-rose-200 leading-relaxed space-y-1.5">
                  <span className="font-semibold text-rose-300 block">Mengapa mereka menyukainya:</span>
                  <p>{activeData.loveLanguage.explanation}</p>
                </div>
              </div>

              {/* Tips Komunikasi Saat Konflik */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2 mt-4">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Kunci Komunikasi & Resolusi Konflik</span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  {activeData.communicationTip}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Hobi & Kencan Impian */}
        {activeSubTab === 'dates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            
            {/* Hobi Romantis & Aktivitas Kencan */}
            <div className="rounded-3xl border border-rose-900/40 bg-[#140a1e]/80 p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <Music className="h-4 w-4 text-rose-400" />
                <span>4 Hobi Kencan Romantis Favorit {activeData.name}</span>
              </div>

              <p className="text-xs text-rose-300/80">
                Aktivitas seru yang paling mereka sukai saat menghabiskan waktu berdua dengan pasangan:
              </p>

              <div className="space-y-3">
                {activeData.hobbies.map((hobby, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl border border-rose-900/50 bg-[#180d26]/80 p-3.5 transition-all hover:border-rose-500/40">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500/30 to-pink-500/20 text-rose-300 text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-white font-medium">{hobby}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tempat Kencan Impian (Dream Date Spot) */}
            <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-[#1a0c28] to-[#12081d] p-6 space-y-5 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <MapPin className="h-4 w-4 text-rose-400" />
                  <span>Tempat Kencan Impian (Dream Date Location)</span>
                </div>

                <div className="rounded-2xl border border-rose-500/30 bg-rose-950/30 p-5 space-y-3">
                  <span className="inline-block rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-mono text-rose-300 border border-rose-500/30">
                    Ambience: {activeData.dreamDateSpot.vibe}
                  </span>
                  
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {activeData.dreamDateSpot.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                    {activeData.dreamDateSpot.description}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-[#160c22] p-4 text-xs text-rose-300/80 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
                <span>Tips Kencan: Ajak {activeData.name} ke tempat ini untuk menciptakan momen magis tak terlupakan!</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Makanan & Minuman Romantis Kesukaan */}
        {activeSubTab === 'culinary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-rose-400" />
                  <span>Menu Kencan Romantis Favorit {activeData.name}</span>
                </h3>
                <p className="text-xs text-rose-300/80 mt-1">
                  Pilihan hidangan, camilan manis, dan minuman yang dijamin membuat lidah dan hatinya meleleh saat berkencan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeData.favoriteFoods.map((food, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-rose-900/50 bg-[#140a1e]/90 p-5 space-y-3 transition-all hover:border-rose-400/50 hover:shadow-lg hover:shadow-rose-950/40 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-rose-500/40 bg-rose-500/10 text-rose-300">
                        {food.category}
                      </span>
                      <span className="text-xs text-rose-400/80">#0{idx + 1}</span>
                    </div>

                    <h4 className="font-bold text-white text-base leading-snug">
                      {food.name}
                    </h4>

                    <p className="text-xs text-rose-200/80 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-950 flex items-center gap-2 text-[11px] text-amber-300/90 font-medium">
                    <Coffee className="h-3.5 w-3.5 text-amber-400" />
                    <span>Cocok dinikmati saat kencan berdua</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Romantic Culinary Cheat Sheet note */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-950/30 p-4 text-xs text-rose-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-400" />
                Ingin mengajak {activeData.name} dinner? Rekomendasi terbaik: reservasi tempat yang menyediakan menu di atas minimal 1 hari sebelumnya!
              </span>
              <span className="font-mono text-[10px] text-rose-300 uppercase shrink-0">Astro Culinary Guide</span>
            </div>
          </div>
        )}

        {/* TAB 4: Cara Memikat & Hadiah */}
        {activeSubTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            
            {/* Cara Memikat Hatinya (Green Flags) */}
            <div className="rounded-3xl border border-emerald-500/40 bg-[#0d1618]/80 p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Kunci Memikat Hati {activeData.name} (Green Flags)</span>
              </div>

              <div className="space-y-2.5">
                {activeData.howToAttract.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-emerald-950/80 bg-emerald-950/20 p-3">
                    <span className="text-emerald-400 text-sm font-bold mt-0.5">✓</span>
                    <span className="text-xs sm:text-sm text-emerald-100/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hal yang Wajib Dihindari (Dealbreakers) & Hadiah Impian */}
            <div className="space-y-6">
              
              {/* Dealbreakers */}
              <div className="rounded-3xl border border-rose-500/40 bg-[#1c0d16]/80 p-6 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <ShieldAlert className="h-4 w-4 text-rose-400" />
                  <span>Hal yang Wajib Dihindari (Dealbreakers)</span>
                </div>

                <div className="space-y-2">
                  {activeData.dealbreakers.map((db, idx) => (
                    <div key={idx} className="flex items-start gap-2 rounded-xl border border-rose-950 bg-rose-950/20 p-2.5 text-xs text-rose-200">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{db}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hadiah Romantis Terbaik */}
              <div className="rounded-3xl border border-amber-500/40 bg-[#1c130d]/80 p-6 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Gift className="h-4 w-4 text-amber-400" />
                  <span>Ide Hadiah Romantis Terbaik</span>
                </div>

                <div className="space-y-1.5">
                  <p className="font-bold text-white text-sm">{activeData.idealGift.item}</p>
                  <p className="text-xs text-amber-200/80 leading-relaxed">{activeData.idealGift.why}</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: Soulmate & Sinastri */}
        {activeSubTab === 'soulmates' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                <span>Pasangan Belahan Jiwa Paling Klop untuk {activeData.name}</span>
              </h3>
              <p className="text-xs text-rose-300/80 mt-1">
                Kecocokan sinastri tertinggi berdasarkan keharmonisan elemen dan energi kosmik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeData.bestSoulmates.map((soulmate, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-rose-900/50 bg-[#150a20]/90 p-6 space-y-4 shadow-xl transition-all hover:border-rose-400/50 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{soulmate.symbol}</span>
                        <div>
                          <h4 className="font-bold text-white text-lg">{soulmate.sign}</h4>
                          <span className="text-[10px] font-mono text-rose-300/70">Tingkat Klop</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-mono text-xl font-black text-rose-400">{soulmate.compatibility}%</span>
                        <div className="w-16 h-1.5 bg-rose-950 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full"
                            style={{ width: `${soulmate.compatibility}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-rose-200/90 leading-relaxed pt-2 border-t border-rose-900/30">
                      {soulmate.reason}
                    </p>
                  </div>

                  {onOpenSynastryWithSign && (
                    <button
                      onClick={() => {
                        sound.playTap();
                        onOpenSynastryWithSign(soulmate.sign);
                      }}
                      className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                    >
                      <span>Cek Sinastri Lengkap</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Direct match finder promo */}
            {onGoToLoveMatch && (
              <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-r from-rose-950/60 via-[#180b22] to-rose-950/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">Siap Menemukan Pasangan Zodiak Impianmu?</h4>
                  <p className="text-xs text-rose-200/80">
                    Jelajahi profil ribuan pengguna di kotamu dengan filter kecocokan zodiak akurat sekarang.
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playTap();
                    onGoToLoveMatch();
                  }}
                  className="rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-950/80 hover:scale-105 transition-all shrink-0 active:scale-95"
                >
                  Buka Love Match Sekarang ✨
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
