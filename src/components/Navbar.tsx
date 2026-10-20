import React from 'react';
import { UserProfile } from '../types';
import { Sparkles, Heart, Compass, MessageCircle, Moon, User, LogIn, LogOut, Navigation, MapPin, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentUser: UserProfile | null;
  activeTab: 'welcome' | 'match' | 'radar' | 'education' | 'synastry' | 'horoscope' | 'chat' | 'profile';
  setActiveTab: (tab: 'welcome' | 'match' | 'radar' | 'education' | 'synastry' | 'horoscope' | 'chat' | 'profile') => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onLogout: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLogout,
  unreadCount = 0
}) => {
  const handleNav = (tab: any) => {
    sound.playTap();
    setActiveTab(tab);
  };

  return (
    <>
      {/* Top Bar for Desktop & Mobile Header */}
      <header className="sticky top-0 z-40 w-full border-b border-rose-950/40 bg-[#0c0914]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Zone 1: Modern Aesthetic Gen-Z Logo */}
          <button
            onClick={() => handleNav(currentUser ? 'match' : 'welcome')}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-300 p-0.5 shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0c0914]">
                <Sparkles className="h-4 w-4 text-rose-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100">
                  astrolovegy
                </span>
                <span className="text-rose-500 text-xs">✦</span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-rose-400/80 uppercase -mt-1 hidden sm:block">
                cosmic match id
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-semibold text-rose-200/80">
            {!currentUser ? (
              <>
                <button
                  onClick={() => handleNav('welcome')}
                  className={`transition-colors hover:text-white ${activeTab === 'welcome' ? 'text-rose-400 font-bold' : ''}`}
                >
                  Beranda
                </button>
                <button
                  onClick={() => handleNav('education')}
                  className={`flex items-center gap-1.5 transition-colors hover:text-white ${activeTab === 'education' ? 'text-rose-400 font-bold' : ''}`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-pink-400" />
                  <span>Edukasi Cinta</span>
                </button>
                <button
                  onClick={() => handleNav('synastry')}
                  className={`transition-colors hover:text-white ${activeTab === 'synastry' ? 'text-rose-400 font-bold' : ''}`}
                >
                  Kalkulator Sinastri
                </button>
                <button
                  onClick={() => handleNav('horoscope')}
                  className={`transition-colors hover:text-white ${activeTab === 'horoscope' ? 'text-rose-400 font-bold' : ''}`}
                >
                  Horoskop Harian
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('match')}
                  className={`flex items-center gap-1.5 transition-colors hover:text-white ${activeTab === 'match' ? 'text-rose-400 font-bold' : ''}`}
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>Love Match</span>
                </button>

                <button
                  onClick={() => handleNav('radar')}
                  className={`flex items-center gap-1.5 transition-colors hover:text-white ${activeTab === 'radar' ? 'text-rose-400 font-bold' : ''}`}
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Peta Radar</span>
                </button>

                <button
                  onClick={() => handleNav('education')}
                  className={`flex items-center gap-1.5 transition-colors hover:text-white ${activeTab === 'education' ? 'text-rose-400 font-bold' : ''}`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-pink-400" />
                  <span>Edukasi Romansa</span>
                </button>

                <button
                  onClick={() => handleNav('synastry')}
                  className={`flex items-center gap-1.5 transition-colors hover:text-white ${activeTab === 'synastry' ? 'text-rose-400 font-bold' : ''}`}
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Sinastri</span>
                </button>

                <button
                  onClick={() => handleNav('chat')}
                  className={`relative flex items-center gap-1.5 transition-colors hover:text-white ${activeTab === 'chat' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                  {unreadCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Action & Profile */}
          <div className="flex items-center gap-2.5 shrink-0">
            {!currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { sound.playTap(); onOpenAuth('signin'); }}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-200 hover:text-white transition-colors"
                >
                  Masuk
                </button>
                <button
                  onClick={() => { sound.playTap(); onOpenAuth('signup'); }}
                  className="rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-950/60 hover:opacity-95 transition-transform active:scale-95"
                >
                  Isi Biodata
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('profile')}
                  className={`flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
                    activeTab === 'profile'
                      ? 'border-rose-400 bg-rose-950/60 text-white'
                      : 'border-rose-900/60 bg-rose-950/20 text-rose-200 hover:text-white'
                  }`}
                >
                  <div className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-rose-500">
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
                  <span className="text-rose-400 font-bold text-xs">{currentUser.sunSign.symbol}</span>
                </button>

                <button
                  onClick={() => { sound.playTap(); onLogout(); }}
                  title="Keluar"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-900/40 text-rose-300 hover:bg-rose-950 hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Ergonomic Thumb Reach Zone) */}
      {currentUser && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0716]/95 backdrop-blur-lg border-t border-rose-950/80 px-1 py-1">
          <div className="grid grid-cols-6 items-center justify-around text-center">
            
            <button
              onClick={() => handleNav('match')}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                activeTab === 'match' ? 'text-rose-400 font-bold' : 'text-rose-300/60'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="text-[8px] mt-0.5">Match</span>
            </button>

            <button
              onClick={() => handleNav('radar')}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                activeTab === 'radar' ? 'text-rose-400 font-bold' : 'text-rose-300/60'
              }`}
            >
              <Navigation className="h-4 w-4" />
              <span className="text-[8px] mt-0.5">Peta</span>
            </button>

            <button
              onClick={() => handleNav('education')}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                activeTab === 'education' ? 'text-rose-400 font-bold' : 'text-rose-300/60'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-[8px] mt-0.5">Edukasi</span>
            </button>

            <button
              onClick={() => handleNav('synastry')}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                activeTab === 'synastry' ? 'text-rose-400 font-bold' : 'text-rose-300/60'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span className="text-[8px] mt-0.5">Sinastri</span>
            </button>

            <button
              onClick={() => handleNav('chat')}
              className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                activeTab === 'chat' ? 'text-emerald-400 font-bold' : 'text-rose-300/60'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-[8px] mt-0.5">Chat</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-emerald-500" />
              )}
            </button>

            <button
              onClick={() => handleNav('profile')}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                activeTab === 'profile' ? 'text-rose-400 font-bold' : 'text-rose-300/60'
              }`}
            >
              <div className="relative h-4 w-4 rounded-full overflow-hidden ring-1 ring-current">
                <img src={currentUser.avatar} alt="Me" className="h-full w-full object-cover" />
              </div>
              <span className="text-[8px] mt-0.5">Profil</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
};
