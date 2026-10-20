import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { saveAccount } from '../services/storage';
import { 
  User, Sparkles, Moon, Compass, Heart, Shield, LogOut, Check, 
  Upload, Camera, Trash2, ExternalLink, Globe, MapPin, Instagram, Sliders, BookOpen 
} from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';
import { sound } from '../utils/audio';

interface ProfileViewProps {
  currentUser: UserProfile;
  onRefreshUser: (user: UserProfile) => void;
  onLogout: () => void;
  onSwitchAccount: () => void;
  onGoToLocalMatches?: () => void;
  onGoToEducation?: () => void;
}

const INDONESIAN_CITIES = [
  'Jakarta Selatan',
  'Jakarta Pusat',
  'Jakarta Barat',
  'Jakarta Utara',
  'Jakarta Timur',
  'Bandung',
  'Surabaya',
  'Tangerang Selatan',
  'Yogyakarta',
  'Semarang',
  'Medan',
  'Bali / Denpasar'
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onRefreshUser,
  onLogout,
  onSwitchAccount,
  onGoToLocalMatches,
  onGoToEducation
}) => {
  // Navigation inside Settings / Profile (creative modern sections)
  const [activeSection, setActiveSection] = useState<'gallery' | 'social' | 'astrology' | 'preferences'>('gallery');

  // Edit states
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [birthCity, setBirthCity] = useState(currentUser.birthCity || 'Jakarta Selatan');
  const [instagramUrl, setInstagramUrl] = useState(currentUser.instagramUrl || '');
  const [tiktokUrl, setTiktokUrl] = useState(currentUser.tiktokUrl || '');
  const [loveLanguage, setLoveLanguage] = useState(currentUser.loveLanguage);
  const [relationshipGoal, setRelationshipGoal] = useState(currentUser.relationshipGoal);
  const [customPhotos, setCustomPhotos] = useState<string[]>(
    currentUser.customPhotos && currentUser.customPhotos.length > 0
      ? currentUser.customPhotos
      : [currentUser.avatar]
  );
  const [currentAvatar, setCurrentAvatar] = useState(currentUser.avatar);
  const [savedNotice, setSavedNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery File Upload Handler with lightweight compression
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    sound.playTap();
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 480, 0.75);
        const updatedList = [compressed, ...customPhotos];
        setCustomPhotos(updatedList);
        setCurrentAvatar(compressed);

        const updated: UserProfile = {
          ...currentUser,
          avatar: compressed,
          customPhotos: updatedList
        };
        saveAccount(updated);
        onRefreshUser(updated);
        sound.playSparkle();
        triggerSaveFeedback();
      } catch (err) {
        console.error('Gagal memproses foto dari galeri:', err);
      }
    }
  };

  const handleSetAvatar = (photoUrl: string) => {
    setCurrentAvatar(photoUrl);
    const updated: UserProfile = {
      ...currentUser,
      avatar: photoUrl
    };
    saveAccount(updated);
    onRefreshUser(updated);
    triggerSaveFeedback();
  };

  const handleDeletePhoto = (photoUrl: string) => {
    if (customPhotos.length <= 1) return;
    const remaining = customPhotos.filter(p => p !== photoUrl);
    setCustomPhotos(remaining);
    const newAvatar = currentAvatar === photoUrl ? remaining[0] : currentAvatar;
    setCurrentAvatar(newAvatar);

    const updated: UserProfile = {
      ...currentUser,
      avatar: newAvatar,
      customPhotos: remaining
    };
    saveAccount(updated);
    onRefreshUser(updated);
    triggerSaveFeedback();
  };

  const triggerSaveFeedback = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleSaveAll = () => {
    // Clean URLs
    let cleanIg = instagramUrl.trim();
    if (cleanIg && !cleanIg.startsWith('http')) {
      cleanIg = `https://instagram.com/${cleanIg.replace(/^@/, '')}`;
    }

    let cleanTt = tiktokUrl.trim();
    if (cleanTt && !cleanTt.startsWith('http')) {
      cleanTt = `https://tiktok.com/@${cleanTt.replace(/^@/, '')}`;
    }

    const updated: UserProfile = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      bio: bio.trim() || currentUser.bio,
      birthCity,
      instagramUrl: cleanIg || undefined,
      tiktokUrl: cleanTt || undefined,
      loveLanguage,
      relationshipGoal,
      avatar: currentAvatar,
      customPhotos
    };

    saveAccount(updated);
    onRefreshUser(updated);
    triggerSaveFeedback();
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0c0914] text-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />

      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Top Header Card */}
        <div className="rounded-3xl border border-rose-900/50 bg-gradient-to-br from-[#180d26] via-[#12081c] to-[#0c0914] p-6 sm:p-8 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Main Avatar with quick upload trigger */}
            <div className="relative group">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-rose-500/50 shadow-2xl bg-rose-950">
                <img
                  src={currentAvatar}
                  alt={currentUser.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-rose-950/85 py-1 text-center text-[10px] font-bold text-rose-200">
                  {currentUser.sunSign.symbol} {currentUser.sunSign.name}
                </div>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                title="Ganti Foto Profil dari Galeri"
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg border-2 border-[#12081c] hover:bg-rose-500 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    <span>{currentUser.name}</span>
                    <span className="text-sm font-normal text-rose-300">({currentUser.gender})</span>
                  </h1>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-rose-300/80 mt-1">
                    <span className="flex items-center gap-1 font-medium text-rose-200">
                      <MapPin className="h-3.5 w-3.5 text-rose-400" />
                      <span>{currentUser.birthCity}</span>
                    </span>
                    <span>·</span>
                    <span>Lahir {currentUser.dateOfBirth} ({currentUser.birthTime || '12:00'})</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={handleSaveAll}
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-95"
                  >
                    <Check className="h-4 w-4" />
                    <span>Simpan Pengaturan</span>
                  </button>

                  <button
                    onClick={onSwitchAccount}
                    className="flex items-center gap-1.5 rounded-full border border-rose-900/60 bg-rose-950/20 px-3.5 py-2 text-xs font-medium text-rose-300 hover:text-white"
                  >
                    <span>Ganti Akun</span>
                  </button>
                </div>
              </div>

              {/* Connected Social Badges (Clickable Live Links) */}
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                {currentUser.instagramUrl ? (
                  <a
                    href={currentUser.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-rose-900/40 border border-pink-500/40 px-3 py-1 text-xs text-pink-200 hover:border-pink-400 transition-colors"
                  >
                    <Instagram className="h-3.5 w-3.5 text-pink-400" />
                    <span>Instagram: <strong>@{currentUser.instagramUrl.split('/').pop()}</strong></span>
                    <ExternalLink className="h-3 w-3 text-pink-400/80 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-[11px] text-rose-300/60 italic">Instagram belum ditautkan</span>
                )}

                {currentUser.tiktokUrl ? (
                  <a
                    href={currentUser.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 px-3 py-1 text-xs text-cyan-200 hover:border-cyan-400 transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-cyan-400" />
                    <span>TikTok: <strong>@{currentUser.tiktokUrl.split('@').pop()}</strong></span>
                    <ExternalLink className="h-3 w-3 text-cyan-400/80 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-[11px] text-rose-300/60 italic">TikTok belum ditautkan</span>
                )}
              </div>

              {savedNotice && (
                <div className="mt-3 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-emerald-400">
                  <Check className="h-4 w-4" />
                  <span>Pengaturan profil dan foto galeri berhasil diperbarui!</span>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-rose-950">
          <button
            onClick={() => setActiveSection('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'gallery'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <Camera className="h-4 w-4" />
            <span>Foto Profil & Galeri</span>
          </button>

          <button
            onClick={() => setActiveSection('social')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'social'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Media Sosial & Bio</span>
          </button>

          <button
            onClick={() => setActiveSection('astrology')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'astrology'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Trinitas Zodiak & Domisili</span>
          </button>

          <button
            onClick={() => setActiveSection('preferences')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeSection === 'preferences'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:text-white'
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>Bahasa Cinta & Hubungan</span>
          </button>
        </div>

        {/* Hidden File Input for Gallery */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {/* ================= SECTION 1: PHOTO GALLERY & UPLOAD ================= */}
        {activeSection === 'gallery' && (
          <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rose-950 pb-4">
              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Koleksi Foto Anda
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Galeri Foto Kencan & Ganti Foto Profil
                </h2>
                <p className="text-xs text-rose-300/80 mt-1">
                  Unggah foto favorit dari album galeri HP atau laptop Anda. Calon pasangan akan melihat foto ini di Love Match.
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 shrink-0"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Foto dari Galeri</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {customPhotos.map((photo, index) => {
                const isCurrentAvatar = photo === currentAvatar;
                return (
                  <div
                    key={index}
                    className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${
                      isCurrentAvatar ? 'border-rose-500 shadow-xl shadow-rose-950/60 ring-2 ring-rose-500/50' : 'border-rose-900/40'
                    }`}
                  >
                    <img src={photo} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
                    
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                      <div className="flex justify-end">
                        {customPhotos.length > 1 && (
                          <button
                            onClick={() => handleDeletePhoto(photo)}
                            title="Hapus foto ini"
                            className="p-1.5 rounded-full bg-rose-950/80 text-rose-300 hover:text-white hover:bg-rose-600 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        {isCurrentAvatar ? (
                          <span className="block text-center py-1 rounded-lg bg-rose-600 text-[10px] font-bold text-white shadow">
                            Foto Profil Utama
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetAvatar(photo)}
                            className="w-full py-1 rounded-lg bg-black/70 hover:bg-rose-600 text-[10px] font-semibold text-white transition-colors"
                          >
                            Jadikan Foto Profil
                          </button>
                        )}
                      </div>
                    </div>

                    {isCurrentAvatar && (
                      <div className="absolute top-2 left-2 rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold text-white shadow">
                        Utama
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add Photo Card Trigger */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[3/4] rounded-2xl border-2 border-dashed border-rose-800/60 bg-rose-950/10 flex flex-col items-center justify-center p-4 text-center hover:border-rose-500 hover:bg-rose-950/30 transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-900/30 text-rose-400 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all mb-2">
                  <Upload className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-rose-200">Tambah Foto</span>
                <span className="text-[10px] text-rose-300/70 mt-0.5">Buka galeri perangkat</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: SOCIAL LINKS & BIO ================= */}
        {activeSection === 'social' && (
          <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-rose-950 pb-4">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Koneksi Media Sosial
              </span>
              <h2 className="font-display text-xl font-bold text-white mt-1">
                Tautkan Instagram & TikTok ke Bio
              </h2>
              <p className="text-xs text-rose-300/80 mt-1">
                Pasangan yang cocok di Love Match dapat langsung mengunjungi profil Instagram dan TikTok Anda untuk melihat vibe asli Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Instagram URL Card */}
              <div className="rounded-2xl border border-rose-900/40 bg-gradient-to-br from-rose-950/30 to-purple-950/20 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white font-bold text-xs shadow">
                      IG
                    </div>
                    <span className="font-bold text-sm text-white">Instagram Profile URL</span>
                  </div>
                  {instagramUrl && (
                    <a
                      href={instagramUrl.startsWith('http') ? instagramUrl : `https://instagram.com/${instagramUrl.replace(/^@/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-pink-400 hover:text-pink-300 underline underline-offset-2"
                    >
                      <span>Uji Tautan</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-rose-400">@</span>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="username_instagram (atau URL lengkap)"
                    className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] pl-7 pr-3 py-2 text-xs text-white focus:border-pink-400 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-rose-300/70">
                  Tautan otomatis dibuat: https://instagram.com/{instagramUrl.replace(/^@/, '').replace(/https?:\/\/instagram\.com\//, '')}
                </p>
              </div>

              {/* TikTok URL Card */}
              <div className="rounded-2xl border border-rose-900/40 bg-gradient-to-br from-rose-950/30 to-cyan-950/20 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black border border-white/20 text-white font-bold text-xs shadow">
                      TT
                    </div>
                    <span className="font-bold text-sm text-white">TikTok Profile URL</span>
                  </div>
                  {tiktokUrl && (
                    <a
                      href={tiktokUrl.startsWith('http') ? tiktokUrl : `https://tiktok.com/@${tiktokUrl.replace(/^@/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                    >
                      <span>Uji Tautan</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-cyan-400">@</span>
                  <input
                    type="text"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    placeholder="username_tiktok (atau URL lengkap)"
                    className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] pl-7 pr-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-rose-300/70">
                  Tautan otomatis dibuat: https://tiktok.com/@{tiktokUrl.replace(/^@/, '').replace(/https?:\/\/tiktok\.com\/@?/, '')}
                </p>
              </div>

            </div>

            {/* Bio Editor */}
            <div className="border-t border-rose-950 pt-4">
              <label className="block text-xs font-semibold text-rose-300 mb-1.5">
                Bio Romantis & Mantra Kencan Anda:
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ceritakan tentang hobi, kopi kesukaan, dan topik zodiak yang kamu sukai..."
                className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-4 py-3 text-xs text-white focus:border-rose-400 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveAll}
                className="rounded-full bg-rose-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-rose-500 shadow-md"
              >
                Simpan Perubahan Bio & Sosmed
              </button>
            </div>
          </div>
        )}

        {/* ================= SECTION 3: ASTROLOGY TRINITY & CITY ================= */}
        {activeSection === 'astrology' && (
          <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rose-950 pb-4">
              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Trinitas Kosmik & Domisili
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Bagan Kelahiran & Filter Kota Pasangan
                </h2>
                <p className="text-xs text-rose-300/80 mt-1">
                  Ubah domisili kota untuk mencocokkan Anda dengan calon pasangan di kota yang sama secara instan.
                </p>
              </div>

              {onGoToLocalMatches && (
                <button
                  onClick={onGoToLocalMatches}
                  className="flex items-center gap-2 rounded-full border border-rose-700 bg-rose-950/40 px-4 py-2 text-xs font-semibold text-rose-300 hover:text-white hover:border-rose-500 transition-colors shrink-0"
                >
                  <MapPin className="h-3.5 w-3.5 text-rose-400" />
                  <span>Lihat Jodoh di {birthCity} →</span>
                </button>
              )}
            </div>

            {/* City change selector */}
            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-5">
              <label className="block text-xs font-semibold text-rose-300 mb-2">
                Pilih Kota Domisili Anda:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={birthCity}
                  onChange={(e) => setBirthCity(e.target.value)}
                  className="flex-1 rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                >
                  {INDONESIAN_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#160c23]">
                      📍 {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleSaveAll}
                  className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500 shadow shrink-0"
                >
                  Terapkan Kota
                </button>
              </div>
              <p className="text-[11px] text-rose-300/70 mt-2">
                Domisili saat ini: <strong className="text-white">{currentUser.birthCity}</strong>. Mengubah kota akan menyesuaikan filter "Pasangan Satu Kota" di Love Match.
              </p>
            </div>

            {/* Trinity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-rose-800/50 bg-gradient-to-b from-rose-950/30 to-transparent p-5">
                <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
                  <span>Matahari (Sun)</span>
                  <span className="text-base">{currentUser.sunSign.symbol}</span>
                </div>
                <div className="font-display text-xl font-bold text-white">{currentUser.sunSign.name}</div>
                <div className="text-[11px] text-rose-300/80 mt-1">
                  Unsur {currentUser.sunSign.element} · {currentUser.sunSign.dateRange}
                </div>
                <p className="text-xs text-rose-200/70 mt-3 leading-relaxed">
                  Menentukan esensi ego, ketertarikan sadar, dan kompas cinta utama.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-800/50 bg-gradient-to-b from-rose-950/30 to-transparent p-5">
                <div className="flex items-center justify-between text-xs text-pink-400 font-semibold mb-2">
                  <span>Bulan (Moon)</span>
                  <span className="text-base">{currentUser.moonSign.symbol}</span>
                </div>
                <div className="font-display text-xl font-bold text-white">{currentUser.moonSign.name}</div>
                <div className="text-[11px] text-rose-300/80 mt-1">
                  Unsur {currentUser.moonSign.element} · Batin & Rasa Aman
                </div>
                <p className="text-xs text-rose-200/70 mt-3 leading-relaxed">
                  Menentukan rasa aman, empati, dan bagaimana Anda membuka hati pada pasangan.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-800/50 bg-gradient-to-b from-rose-950/30 to-transparent p-5">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-2">
                  <span>Ascendant (Rising)</span>
                  <span className="text-base">{currentUser.risingSign.symbol}</span>
                </div>
                <div className="font-display text-xl font-bold text-white">{currentUser.risingSign.name}</div>
                <div className="text-[11px] text-rose-300/80 mt-1">
                  Aura Daya Tarik Pertama
                </div>
                <p className="text-xs text-rose-200/70 mt-3 leading-relaxed">
                  Kesan pertama yang terpancar saat kencan tatap muka pertama kali.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-rose-900/40 bg-[#160c26] p-4 text-xs text-rose-200">
              <span className="font-semibold text-rose-300">Arketipe Cinta:</span>
              <span className="ml-1 text-white font-medium">{currentUser.loveArchetype}</span>
            </div>

            {/* Direct link to Romance Education */}
            {onGoToEducation && (
              <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[#180a24] to-rose-950/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Edukasi Romantisme Zodiak</h4>
                    <p className="text-[11px] text-rose-300/80">Ketahui hobi kencan, makanan favorit, dan tips memikat untuk zodiakmu!</p>
                  </div>
                </div>
                <button
                  onClick={() => { sound.playTap(); onGoToEducation(); }}
                  className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shrink-0"
                >
                  Buka Panduan Cinta →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION 4: PREFERENCES & LOVE LANGUAGE ================= */}
        {activeSection === 'preferences' && (
          <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-rose-950 pb-4">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Preferensi & Harapan Kencan
              </span>
              <h2 className="font-display text-xl font-bold text-white mt-1">
                Bahasa Cinta & Ekspektasi Hubungan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Bahasa Cinta Utama (Love Language):
                </label>
                <select
                  value={loveLanguage}
                  onChange={(e) => setLoveLanguage(e.target.value)}
                  className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                >
                  <option value="Quality Time & Words of Affirmation">Quality Time & Words of Affirmation</option>
                  <option value="Physical Touch & Quality Time">Physical Touch & Quality Time</option>
                  <option value="Acts of Service & Physical Touch">Acts of Service & Physical Touch</option>
                  <option value="Words of Affirmation & Receiving Gifts">Words of Affirmation & Receiving Gifts</option>
                  <option value="Acts of Service & Quality Time">Acts of Service & Quality Time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Harapan / Tujuan Hubungan:
                </label>
                <input
                  type="text"
                  value={relationshipGoal}
                  onChange={(e) => setRelationshipGoal(e.target.value)}
                  className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-rose-950">
              <button
                onClick={handleSaveAll}
                className="rounded-full bg-rose-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-rose-500 shadow-md"
              >
                Simpan Preferensi
              </button>
            </div>
          </div>
        )}

        {/* Footer Session Controls */}
        <div className="flex items-center justify-between border-t border-rose-950 pt-4">
          <div className="text-xs text-rose-300/60">
            Terhubung via {currentUser.authProvider.toUpperCase()} · Sejak {new Date(currentUser.registeredAt).toLocaleDateString()}
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-full border border-rose-800 bg-rose-950/40 px-4 py-2 text-xs font-semibold text-rose-300 hover:border-rose-600 hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar Akun</span>
          </button>
        </div>

      </div>
    </div>
  );
};
