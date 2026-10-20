import React, { useState } from 'react';
import { UserProfile, DailyHoroscope } from '../types';
import { ZODIAC_SIGNS } from '../utils/astrology';
import { Moon, Sparkles, Clock, Heart, Compass, Star } from 'lucide-react';

interface DailyHoroscopeViewProps {
  currentUser?: UserProfile | null;
}

const HOROSCOPES: Record<string, DailyHoroscope> = {
  Aries: {
    signName: 'Aries',
    date: 'Hari Ini',
    headline: 'Gairah Spontan Membuka Percakapan Manis',
    loveAdvice: 'Inisiatif kecil Anda untuk menyapa duluan akan disambut dengan antusiasme hangat. Jangan ragu membagikan tawa lepas.',
    luckyHours: '19:00 - 21:30',
    energyVibe: 'Bersemangat & Memikat',
    compatibleSignToday: 'Leo & Sagitarius'
  },
  Taurus: {
    signName: 'Taurus',
    date: 'Hari Ini',
    headline: 'Sentuhan Kehangatan dan Kenyamanan Emosi',
    loveAdvice: 'Cinta hari ini terasa tenang dan menenangkan. Kencan santai dengan santapan lezat akan mempererat ikatan batin.',
    luckyHours: '18:30 - 20:45',
    energyVibe: 'Sensual & Setia',
    compatibleSignToday: 'Cancer & Capricorn'
  },
  Gemini: {
    signName: 'Gemini',
    date: 'Hari Ini',
    headline: 'Obrolan Intelektual Memantik Ketertarikan',
    loveAdvice: 'Humor cerdas Anda sedang di puncaknya. Jadikan topik favorit Anda sebagai bahan obrolan untuk melihat seberapa nyambung kalian.',
    luckyHours: '14:00 - 17:00',
    energyVibe: 'Komunikatif & Segar',
    compatibleSignToday: 'Libra & Aquarius'
  },
  Cancer: {
    signName: 'Cancer',
    date: 'Hari Ini',
    headline: 'Intuisi Hati Berbisik Sangat Akurat',
    loveAdvice: 'Perasaan Anda terhadap seseorang bukan sekadar ilusi; getaran kosmik mengonfirmasi keterhubungan emosi yang tulus.',
    luckyHours: '20:00 - 22:30',
    energyVibe: 'Empatis & Romantis Lembut',
    compatibleSignToday: 'Pisces & Scorpio'
  },
  Leo: {
    signName: 'Leo',
    date: 'Hari Ini',
    headline: 'Pesona Karismatis Menarik Perhatian Si Dia',
    loveAdvice: 'Kepercayaan diri alami Anda bersinar terang. Berikan apresiasi tulus kepada orang yang Anda sukai, mereka akan sangat tersanjung.',
    luckyHours: '16:00 - 19:00',
    energyVibe: 'Hangat & Magnetis',
    compatibleSignToday: 'Aries & Gemini'
  },
  Virgo: {
    signName: 'Virgo',
    date: 'Hari Ini',
    headline: 'Perhatian pada Detail Membuka Pintu Hati',
    loveAdvice: 'Tindakan nyata lebih berarti daripada kata-kata manis. Menanyakan kabar dan mendengarkan keluh kesahnya adalah kunci.',
    luckyHours: '11:00 - 13:30',
    energyVibe: 'Penuh Perhatian & Tulus',
    compatibleSignToday: 'Taurus & Capricorn'
  },
  Libra: {
    signName: 'Libra',
    date: 'Hari Ini',
    headline: 'Harmoni Estetik dan Kencan Penuh Senyuman',
    loveAdvice: 'Energi Venus memberikan aura mempesona pada penampilan dan gaya bicara Anda. Waktu yang sempurna untuk kencan pertama.',
    luckyHours: '17:30 - 20:00',
    energyVibe: 'Anggun & Romantis',
    compatibleSignToday: 'Gemini & Leo'
  },
  Scorpio: {
    signName: 'Scorpio',
    date: 'Hari Ini',
    headline: 'Koneksi Jiwa Mendalam Tanpa Perlu Banyak Kata',
    loveAdvice: 'Tatap mata dan kejujuran emosional akan menyingkap perasaan yang selama ini terpendam. Jangan takut menunjukkan sisi rapuhmu.',
    luckyHours: '21:00 - 23:30',
    energyVibe: 'Intens & Memikat Batin',
    compatibleSignToday: 'Cancer & Pisces'
  },
  Sagittarius: {
    signName: 'Sagittarius',
    date: 'Hari Ini',
    headline: 'Petualangan Baru Membawa Percikan Asmara',
    loveAdvice: 'Ajak calon pasangan mencoba hal baru bersama—bisa mencicipi cafe baru atau sekadar berjalan sore di tempat belum terjamah.',
    luckyHours: '15:30 - 18:00',
    energyVibe: 'Optimis & Penuh Tawa',
    compatibleSignToday: 'Aries & Libra'
  },
  Capricorn: {
    signName: 'Capricorn',
    date: 'Hari Ini',
    headline: 'Kepastian dan Masa Depan Mulai Tampak Jelas',
    loveAdvice: 'Keseriusan dan kedewasaan Anda dalam menjalin relasi adalah daya tarik terbesar Anda saat ini. Pasangan mendambakan rasa aman.',
    luckyHours: '12:00 - 14:00',
    energyVibe: 'Stabil & Berkomitmen',
    compatibleSignToday: 'Virgo & Taurus'
  },
  Aquarius: {
    signName: 'Aquarius',
    date: 'Hari Ini',
    headline: 'Pertemanan Unik Berkembang Menjadi Rasa Kasih',
    loveAdvice: 'Koneksi terbaik sering berawal dari percakapan santai sebagai teman yang saling mengerti keanehan masing-masing.',
    luckyHours: '16:00 - 18:30',
    energyVibe: 'Orisinal & Terbuka',
    compatibleSignToday: 'Gemini & Sagitarius'
  },
  Pisces: {
    signName: 'Pisces',
    date: 'Hari Ini',
    headline: 'Momen Puitis dan Kasih Sayang Tanpa Syarat',
    loveAdvice: 'Bagi Anda, cinta adalah seni spiritual. Biarkan imajinasi dan kelembutan kata-kata Anda menyentuh hatinya malam ini.',
    luckyHours: '20:30 - 22:45',
    energyVibe: 'Puitis & Penuh Cinta',
    compatibleSignToday: 'Cancer & Scorpio'
  }
};

export const DailyHoroscopeView: React.FC<DailyHoroscopeViewProps> = ({ currentUser }) => {
  const signs = Object.values(ZODIAC_SIGNS);
  const [activeSign, setActiveSign] = useState<string>(currentUser ? currentUser.sunSign.name : 'Pisces');

  const currentHoro = HOROSCOPES[activeSign] || HOROSCOPES['Pisces'];
  const signInfo = ZODIAC_SIGNS[activeSign];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0c0914] text-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute top-10 right-1/4 h-80 w-80 rounded-full bg-pink-600/10 blur-[100px]" />
      
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">
            Peta Transit Bintang Harian
          </span>
          <h1 className="font-display text-3xl font-bold text-white mt-1">
            Horoskop Cinta & Asmara Hari Ini
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-2">
            Panduan harian energi kosmik untuk menavigasi kencan, percakapan hati, dan ketertarikan romantis.
          </p>
        </div>

        {/* Horizontal Zodiac Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {signs.map((s) => {
            const isUserSign = currentUser?.sunSign.name === s.name;
            const isSelected = activeSign === s.name;
            return (
              <button
                key={s.name}
                onClick={() => setActiveSign(s.name)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/60 scale-105'
                    : 'border border-rose-900/40 bg-rose-950/20 text-rose-300 hover:border-rose-700 hover:text-white'
                }`}
              >
                <span className="text-base">{s.symbol}</span>
                <span>{s.name}</span>
                {isUserSign && (
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
                    Kamu
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Horoscope Spotlight Card */}
        <div className="rounded-3xl border border-rose-900/50 bg-gradient-to-br from-[#160d24] via-[#12081c] to-[#0c0914] p-6 sm:p-10 shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-rose-950/60 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-3xl text-white shadow-lg shadow-rose-950/60">
                {signInfo.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-rose-300">
                  <span className="font-semibold text-rose-400">{signInfo.name}</span>
                  <span>·</span>
                  <span>Unsur {signInfo.element}</span>
                  <span>·</span>
                  <span>{signInfo.dateRange}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mt-1">
                  {currentHoro.headline}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto rounded-full bg-rose-950/40 px-3.5 py-1.5 text-xs text-rose-300 border border-rose-900/50">
              <Moon className="h-3.5 w-3.5 text-amber-300" />
              <span>Energi: <strong className="text-white">{currentHoro.energyVibe}</strong></span>
            </div>
          </div>

          {/* Horoscope Content */}
          <div className="mt-8 space-y-6">
            
            <div>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Nasihat Cinta Semesta Hari Ini
              </span>
              <p className="mt-2 text-sm sm:text-base text-rose-100 leading-relaxed bg-[#150a22] p-5 rounded-2xl border border-rose-900/40">
                "{currentHoro.loveAdvice}"
              </p>
            </div>

            {/* Daily Cosmic Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-1">
                  <Clock className="h-4 w-4 text-amber-300" />
                  <span>Jam Keberuntungan Kencan</span>
                </div>
                <div className="font-mono text-lg font-bold text-white mt-1 tabular-nums">
                  {currentHoro.luckyHours}
                </div>
                <p className="text-[11px] text-rose-300/70 mt-1">Waktu paling harmonis untuk membalas pesan atau bertemu</p>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-1">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span>Zodiak Paling Klop Hari Ini</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {currentHoro.compatibleSignToday}
                </div>
                <p className="text-[11px] text-rose-300/70 mt-1">Resonansi getaran bintang saling menguatkan</p>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
                <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-1">
                  <Sparkles className="h-4 w-4 text-pink-400" />
                  <span>Gaya Romantis Bawaan</span>
                </div>
                <div className="text-xs text-white font-medium mt-1 leading-relaxed">
                  {signInfo.loveLanguageBias}
                </div>
                <p className="text-[11px] text-rose-300/70 mt-1">Bahasa kasih yang paling mudah meluluhkan hati</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
