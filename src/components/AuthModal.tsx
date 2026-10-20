import React, { useState } from 'react';
import { UserProfile } from '../types';
import { getSavedAccounts, saveAccount, setCurrentUser } from '../services/storage';
import { calculateSunSign, calculateMoonSign, calculateRisingSign, getLoveArchetype } from '../utils/astrology';
import { INDONESIAN_REGIONS, findNearestCity } from '../data/indonesianRegions';
import { sound } from '../utils/audio';
import { compressImageFile } from '../utils/imageCompressor';
import { 
  X, Sparkles, Check, ArrowRight, ArrowLeft, Heart, Moon, 
  MapPin, Upload, Instagram, Globe, Camera, Navigation, User 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

const AVATAR_PRESETS = [
  '/src/assets/images/dating_profile_clarissa_1792496473437.jpg',
  '/src/assets/images/dating_profile_rizky_1792496472687.jpg',
  '/src/assets/images/dating_profile_putri_1792496472994.jpg',
  '/src/assets/images/dating_profile_maya_1792494223385.jpg',
  '/src/assets/images/dating_profile_leo_1792494222118.jpg',
  '/src/assets/images/dating_profile_aditya_1792494223879.jpg'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [step, setStep] = useState<number>(1);
  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>([]);

  // Direct Biodata fields
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Pria' | 'Wanita' | 'Lainnya'>('Wanita');
  const [interestedIn, setInterestedIn] = useState<'Pria' | 'Wanita' | 'Semua'>('Pria');
  const [birthCity, setBirthCity] = useState('Jakarta Selatan');
  const [dateOfBirth, setDateOfBirth] = useState('2001-08-15');
  const [birthTime, setBirthTime] = useState('14:30');
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [bio, setBio] = useState('Pencinta senja, astrologi, dan percakapan batin yang menenangkan.');
  const [loveLanguage, setLoveLanguage] = useState('Quality Time & Words of Affirmation');
  const [relationshipGoal, setRelationshipGoal] = useState('Hubungan berkomitmen jangka panjang');
  const [gpsDetecting, setGpsDetecting] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const accounts = getSavedAccounts();
      setSavedAccounts(accounts);
      setMode(initialMode);
      setStep(1);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Real-time astrological calculation
  const calculatedSun = calculateSunSign(dateOfBirth);
  const calculatedMoon = calculateMoonSign(dateOfBirth, birthTime);
  const calculatedRising = calculateRisingSign(calculatedSun.name, birthTime);
  const calculatedArchetype = getLoveArchetype(calculatedSun, calculatedSun.element);

  const handleSelectExistingAccount = (account: UserProfile) => {
    sound.playTap();
    setCurrentUser(account.id);
    onSuccess(account);
    onClose();
  };

  const handleDetectGPS = () => {
    sound.playTap();
    if (!navigator.geolocation) return;
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        setBirthCity(nearest.name);
        setGpsDetecting(false);
        sound.playSparkle();
      },
      () => {
        setGpsDetecting(false);
      },
      { timeout: 6000 }
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    sound.playTap();
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 480, 0.75);
        setAvatar(compressed);
        sound.playSparkle();
      } catch (err) {
        console.error('Gagal kompresi foto:', err);
      }
    }
  };

  const handleFinishSignUp = () => {
    sound.playMatch();
    const newId = `user_${Date.now()}`;
    const cleanIg = instagramHandle.trim().replace(/^@/, '');
    const cleanTt = tiktokHandle.trim().replace(/^@/, '');

    const newProfile: UserProfile = {
      id: newId,
      name: name.trim() || 'Pencari Cinta Kosmik',
      email: `${newId}@astrolovegy.com`,
      avatar,
      gender,
      interestedIn,
      dateOfBirth,
      birthTime,
      birthCity: birthCity.trim() || 'Jakarta Selatan',
      sunSign: calculatedSun,
      moonSign: calculatedMoon,
      risingSign: calculatedRising,
      loveArchetype: calculatedArchetype,
      bio: bio.trim() || 'Siap menemukan pasangan sejati di bawah naungan bintang.',
      loveLanguage,
      relationshipGoal,
      hobbies: ['Stargazing', 'Astrology', 'Deep Conversations', 'Travel'],
      instagramUrl: cleanIg ? `https://instagram.com/${cleanIg}` : undefined,
      tiktokUrl: cleanTt ? `https://tiktok.com/@${cleanTt}` : undefined,
      customPhotos: [avatar],
      registeredAt: new Date().toISOString(),
      authProvider: 'email',
      likedProfileIds: [],
      passedProfileIds: [],
      superLikedProfileIds: []
    };

    saveAccount(newProfile);
    onSuccess(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-rose-900/60 bg-[#120a1c] p-5 sm:p-7 text-rose-50 shadow-2xl shadow-rose-950/90 overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-rose-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-pink-600/20 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-950 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              {mode === 'signin' ? 'Masuk ke Astrolovegy' : 'Daftar Biodata Zodiak'}
            </span>
          </div>

          <button
            onClick={() => { sound.playTap(); onClose(); }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-rose-300 hover:bg-rose-950/60 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex items-center gap-1 rounded-xl bg-rose-950/40 p-1 mb-4 border border-rose-900/30 shrink-0">
          <button
            onClick={() => { sound.playTap(); setMode('signin'); }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              mode === 'signin' ? 'bg-rose-600 text-white shadow-sm' : 'text-rose-300 hover:text-white'
            }`}
          >
            Masuk Akun Tersimpan
          </button>
          <button
            onClick={() => { sound.playTap(); setMode('signup'); setStep(1); }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              mode === 'signup' ? 'bg-rose-600 text-white shadow-sm' : 'text-rose-300 hover:text-white'
            }`}
          >
            Isi Biodata Baru
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-1 flex-1">
          
          {/* ================= SIGN IN ================= */}
          {mode === 'signin' && (
            <div className="space-y-4">
              <p className="text-xs text-rose-200/80">
                Pilih akun biodata Anda yang telah tersimpan di perangkat ini:
              </p>

              {savedAccounts.length > 0 ? (
                <div className="space-y-2.5">
                  {savedAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => handleSelectExistingAccount(account)}
                      className="group flex w-full items-center justify-between rounded-2xl border border-rose-900/50 bg-rose-950/20 p-3.5 text-left transition-all hover:border-rose-500 hover:bg-rose-950/50 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-rose-500/40 shrink-0">
                          <img src={account.avatar} alt={account.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white group-hover:text-rose-200 truncate">
                            {account.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-rose-300/80">
                            <span>{account.sunSign.symbol} {account.sunSign.name}</span>
                            <span>·</span>
                            <span>📍 {account.birthCity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform shrink-0">
                        <span>Masuk</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-rose-900/30 bg-rose-950/10 p-6 text-center">
                  <p className="text-sm text-rose-300/80">
                    Belum ada akun tersimpan. Silakan isi biodata langsung dalam 1 menit!
                  </p>
                  <button
                    onClick={() => { sound.playTap(); setMode('signup'); setStep(1); }}
                    className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500"
                  >
                    Isi Biodata Baru
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= SIGN UP: DIRECT BIODATA WIZARD ================= */}
          {mode === 'signup' && (
            <div>
              
              {/* Step indicator */}
              <div className="mb-4 flex items-center justify-between text-xs text-rose-300">
                <span className="font-semibold text-rose-400">
                  Langkah {step} dari 3
                </span>
                <span className="text-[11px] text-rose-300/70">
                  {step === 1 && 'Biodata & Lokasi Kota'}
                  {step === 2 && 'Tanggal Lahir & Bagan Zodiak'}
                  {step === 3 && 'Foto Galeri & Medsos di Bio'}
                </span>
              </div>

              {/* STEP 1: Biodata & Location */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1">
                      Nama Panggilan / Lengkap:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Rania Pramesti"
                      className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Gender Anda:
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                      >
                        <option value="Wanita">Wanita</option>
                        <option value="Pria">Pria</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Tertarik Pada:
                      </label>
                      <select
                        value={interestedIn}
                        onChange={(e) => setInterestedIn(e.target.value as any)}
                        className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                      >
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                        <option value="Semua">Semua Pasangan</option>
                      </select>
                    </div>
                  </div>

                  {/* Indonesian Cities with GPS detection button */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-rose-300">
                        Domisili Kota (Seluruh Indonesia):
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectGPS}
                        disabled={gpsDetecting}
                        className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-white"
                      >
                        <Navigation className={`h-3 w-3 ${gpsDetecting ? 'animate-spin' : ''}`} />
                        <span>{gpsDetecting ? 'Mencari...' : 'Gunakan GPS 📍'}</span>
                      </button>
                    </div>

                    <select
                      value={birthCity}
                      onChange={(e) => setBirthCity(e.target.value)}
                      className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                    >
                      {INDONESIAN_REGIONS.map((city) => (
                        <option key={city.id} value={city.name} className="bg-[#160c23]">
                          📍 {city.name} ({city.province} - {city.island})
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-rose-300/70 mt-1">
                      Menentukan kecocokan pasangan yang tinggal satu kota dengan Anda.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => { sound.playTap(); setStep(2); }}
                      className="flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-rose-500 shadow-md"
                    >
                      <span>Lanjut ke Tanggal Lahir</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Birth Date & Astrological Calculation */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Tanggal Lahir:
                      </label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Jam Lahir (Opsional):
                      </label>
                      <input
                        type="time"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Instant Cosmic Calculation Preview */}
                  <div className="rounded-2xl border border-rose-700/50 bg-gradient-to-br from-rose-950/40 via-[#180d26] to-[#0d0716] p-4 text-center">
                    <span className="text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
                      Bagan Astrologi Anda
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      {calculatedSun.name} {calculatedSun.symbol}
                    </h3>
                    <p className="text-xs text-rose-300/80 mt-0.5">
                      Unsur {calculatedSun.element} · Dipimpin Planet {calculatedSun.rulingPlanet}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-xl border border-rose-900/40 bg-rose-950/30 p-2">
                        <div className="text-[9px] text-rose-300">Sun Sign</div>
                        <div className="font-bold text-white">{calculatedSun.name}</div>
                      </div>
                      <div className="rounded-xl border border-rose-900/40 bg-rose-950/30 p-2">
                        <div className="text-[9px] text-rose-300">Moon Sign</div>
                        <div className="font-bold text-white">{calculatedMoon.name}</div>
                      </div>
                      <div className="rounded-xl border border-rose-900/40 bg-rose-950/30 p-2">
                        <div className="text-[9px] text-rose-300">Rising Sign</div>
                        <div className="font-bold text-white">{calculatedRising.name}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => { sound.playTap(); setStep(1); }}
                      className="flex items-center gap-1.5 text-xs font-medium text-rose-300 hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Kembali</span>
                    </button>

                    <button
                      onClick={() => { sound.playTap(); setStep(3); }}
                      className="flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-rose-500 shadow-md"
                    >
                      <span>Lanjut ke Foto & Medsos</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Gallery Photo & Social Links in Bio */}
              {step === 3 && (
                <div className="space-y-4">
                  
                  {/* Photo picker & Gallery upload */}
                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1.5">
                      Foto Profil (Bisa Unggah dari Galeri HP/Laptop):
                    </label>

                    <div className="flex items-center gap-3 p-3 rounded-2xl border border-rose-900/50 bg-[#160c23]">
                      <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden ring-2 ring-rose-500 shadow-md">
                        <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                      </div>

                      <div className="flex-1">
                        <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:opacity-90 transition-opacity">
                          <Upload className="h-3 w-3" />
                          <span>Pilih Foto dari Galeri</span>
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <p className="text-[10px] text-rose-300/70 mt-1">
                          Foto asli dari album galeri Anda
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Handles in Bio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-rose-950 pt-3">
                    <div>
                      <label className="block text-xs font-semibold text-pink-300 mb-1">
                        Instagram di Bio:
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs text-rose-400">@</span>
                        <input
                          type="text"
                          value={instagramHandle}
                          onChange={(e) => setInstagramHandle(e.target.value)}
                          placeholder="username_ig"
                          className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] pl-7 pr-3 py-1.5 text-xs text-white focus:border-pink-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-cyan-300 mb-1">
                        TikTok di Bio:
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs text-cyan-400">@</span>
                        <input
                          type="text"
                          value={tiktokHandle}
                          onChange={(e) => setTiktokHandle(e.target.value)}
                          placeholder="username_tiktok"
                          className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] pl-7 pr-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1">
                      Bio Romantis Singkat:
                    </label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Ceritakan minat dan vibe kencan idamanmu..."
                      className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-rose-950">
                    <button
                      onClick={() => { sound.playTap(); setStep(2); }}
                      className="flex items-center gap-1.5 text-xs font-medium text-rose-300 hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Kembali</span>
                    </button>

                    <button
                      onClick={handleFinishSignUp}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-900/60 hover:opacity-95"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Simpan & Mulai Cari Jodoh</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
