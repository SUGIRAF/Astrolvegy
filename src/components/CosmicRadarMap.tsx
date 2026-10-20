import React, { useState, useEffect } from 'react';
import { UserProfile, MatchProfile } from '../types';
import { INDONESIAN_REGIONS, IndonesianCity, calculateDistanceKm, findNearestCity } from '../data/indonesianRegions';
import { MapPin, Navigation, Compass, Sparkles, Heart, MessageCircle, Sliders, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface CosmicRadarMapProps {
  currentUser: UserProfile;
  matches: { profile: MatchProfile; synastryScore: number }[];
  onSelectCity: (cityName: string) => void;
  onOpenChat: (matchId: string) => void;
  onLikeProfile: (matchId: string) => void;
}

export const CosmicRadarMap: React.FC<CosmicRadarMapProps> = ({
  currentUser,
  matches,
  onSelectCity,
  onOpenChat,
  onLikeProfile
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; cityName: string } | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<string>('Semua');
  const [detectingGps, setDetectingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(50);

  // Initialize with current user's city
  useEffect(() => {
    const found = INDONESIAN_REGIONS.find(c => c.name.toLowerCase() === (currentUser.birthCity || 'Jakarta Selatan').toLowerCase());
    if (found) {
      setUserLocation({ lat: found.lat, lng: found.lng, cityName: found.name });
    } else {
      const def = INDONESIAN_REGIONS[0];
      setUserLocation({ lat: def.lat, lng: def.lng, cityName: def.name });
    }
  }, [currentUser.birthCity]);

  // Real GPS detection
  const handleDetectGPS = () => {
    sound.playTap();
    if (!navigator.geolocation) {
      setGpsError('Geolocation tidak didukung oleh browser ini.');
      return;
    }

    setDetectingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestCity(latitude, longitude);
        setUserLocation({ lat: latitude, lng: longitude, cityName: nearest.name });
        onSelectCity(nearest.name);
        setDetectingGps(false);
        sound.playSparkle();
      },
      (err) => {
        // If GPS permission denied in sandbox, fallback graciously to nearest selected city
        setDetectingGps(false);
        const cityObj = INDONESIAN_REGIONS.find(c => c.name === currentUser.birthCity) || INDONESIAN_REGIONS[0];
        setUserLocation({ lat: cityObj.lat, lng: cityObj.lng, cityName: cityObj.name });
        setGpsError('Izin GPS tidak aktif. Menggunakan lokasi kota profil: ' + cityObj.name);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Filter regions by island
  const filteredCities = selectedIsland === 'Semua' 
    ? INDONESIAN_REGIONS 
    : INDONESIAN_REGIONS.filter(c => c.island === selectedIsland);

  // Calculate distance for all candidates from user's current coordinates
  const localizedMatches = matches.map(m => {
    const candidateCity = INDONESIAN_REGIONS.find(c => c.name.toLowerCase() === m.profile.city.toLowerCase()) || INDONESIAN_REGIONS[0];
    const dist = userLocation 
      ? calculateDistanceKm(userLocation.lat, userLocation.lng, candidateCity.lat, candidateCity.lng)
      : m.profile.distanceKm;

    return {
      ...m,
      realDistanceKm: dist,
      isSameCity: (userLocation?.cityName || currentUser.birthCity).toLowerCase() === m.profile.city.toLowerCase()
    };
  }).sort((a, b) => a.realDistanceKm - b.realDistanceKm);

  return (
    <div className="rounded-3xl border border-rose-900/50 bg-[#140b22] p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header and GPS button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rose-950 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <Compass className="h-4 w-4" />
            <span>Peta Radar Lokasi Nyata Indonesia</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
            Jangkauan Kencan Satu Kota & Sekitar Anda
          </h2>
          <p className="text-xs text-rose-200/70 mt-1">
            Titik koordinat Anda saat ini: <strong className="text-amber-300 font-mono">{userLocation?.cityName}</strong> ({userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)})
          </p>
        </div>

        <button
          onClick={handleDetectGPS}
          disabled={detectingGps}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-950/60 hover:opacity-95 transition-all active:scale-95 shrink-0"
        >
          <Navigation className={`h-4 w-4 ${detectingGps ? 'animate-spin' : ''}`} />
          <span>{detectingGps ? 'Mendeteksi GPS...' : 'Aktifkan GPS Saya'}</span>
        </button>
      </div>

      {gpsError && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 px-3.5 py-2 text-xs text-amber-300">
          {gpsError}
        </div>
      )}

      {/* Island & City Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-rose-300 font-semibold mb-1">Pilih Wilayah / Pulau:</label>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {['Semua', 'Jawa', 'Sumatera', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'].map((island) => (
              <button
                key={island}
                onClick={() => { sound.playTap(); setSelectedIsland(island); }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedIsland === island
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-950/30 text-rose-300 hover:text-white'
                }`}
              >
                {island}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-rose-300 font-semibold mb-1">Ganti Lokasi Kota Manual:</label>
          <select
            value={userLocation?.cityName || currentUser.birthCity}
            onChange={(e) => {
              const selected = INDONESIAN_REGIONS.find(c => c.name === e.target.value);
              if (selected) {
                sound.playTap();
                setUserLocation({ lat: selected.lat, lng: selected.lng, cityName: selected.name });
                onSelectCity(selected.name);
              }
            }}
            className="w-full rounded-xl border border-rose-900/60 bg-[#160c23] px-3.5 py-2 text-xs text-white focus:outline-none"
          >
            {filteredCities.map((city) => (
              <option key={city.id} value={city.name} className="bg-[#160c23]">
                📍 {city.name} ({city.province})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Interactive Map / Radar Canvas */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl border border-rose-800/40 bg-[#0d0716] overflow-hidden p-4 flex flex-col justify-between">
        
        {/* Subtle grid and radar rings */}
        <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full border border-rose-500/20 animate-ping opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full border border-rose-500/30 pointer-events-none" />
        
        {/* Map Legend & Radius Pill */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-rose-200">
          <div className="flex items-center gap-2 rounded-full bg-[#0c0914]/80 px-3 py-1 border border-rose-900/50 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pusat Radar: <strong>{userLocation?.cityName}</strong></span>
          </div>

          <div className="rounded-full bg-[#0c0914]/80 px-3 py-1 border border-rose-900/50 backdrop-blur-sm">
            <span>Radius: <strong>{maxRadiusKm} km</strong></span>
          </div>
        </div>

        {/* Center pin (User) */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="relative h-12 w-12 rounded-full ring-4 ring-rose-500 overflow-hidden shadow-xl z-20">
              <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
            </div>
            <span className="mt-1 rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold text-white shadow">
              Kamu di {userLocation?.cityName}
            </span>
          </div>
        </div>

        {/* Surrounding Indonesian singles badges */}
        <div className="relative z-10 flex items-center justify-around flex-wrap gap-2">
          {localizedMatches.slice(0, 4).map(({ profile, realDistanceKm, isSameCity }) => (
            <div
              key={profile.id}
              onClick={() => { sound.playTap(); onOpenChat(profile.id); }}
              className={`group cursor-pointer flex items-center gap-2 rounded-full p-1 pr-3 transition-all backdrop-blur-md ${
                isSameCity
                  ? 'bg-rose-950/80 border border-rose-500/80 ring-2 ring-rose-500/40 scale-105'
                  : 'bg-[#180e28]/80 border border-rose-900/40 hover:border-rose-600'
              }`}
            >
              <div className="relative h-7 w-7 rounded-full overflow-hidden shrink-0">
                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
              </div>
              <div className="text-left text-[10px]">
                <div className="font-bold text-white flex items-center gap-1">
                  <span>{profile.name}</span>
                  {isSameCity && <span className="text-emerald-400 font-normal">● 1 Kota</span>}
                </div>
                <div className="text-rose-300 font-mono">{realDistanceKm} km</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Localized Candidates Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-rose-300">
          <span className="font-semibold text-rose-400">Daftar Pasangan Terdekat dari Posisi Anda:</span>
          <span>{localizedMatches.filter(m => m.isSameCity).length} orang di kota yang sama persis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {localizedMatches.map(({ profile, synastryScore, realDistanceKm, isSameCity }) => (
            <div
              key={profile.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isSameCity
                  ? 'border-rose-500 bg-rose-950/30 ring-1 ring-rose-500/30'
                  : 'border-rose-900/40 bg-rose-950/15 hover:border-rose-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 ring-2 ring-rose-500/30">
                  <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-white truncate flex items-center gap-1">
                    <span>{profile.name}</span>
                    <span className="text-[10px] text-rose-400">{profile.sunSign.symbol}</span>
                  </div>
                  <div className="text-[11px] text-rose-300/80 truncate">
                    {profile.city} · <strong className="text-amber-300 font-mono">{realDistanceKm} km</strong>
                  </div>
                  {isSameCity && (
                    <span className="inline-block text-[9px] font-bold text-emerald-400 mt-0.5">
                      ✓ Pasangan Satu Kota
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => { sound.playTap(); onOpenChat(profile.id); }}
                  className="p-2 rounded-xl bg-rose-600/30 text-rose-200 hover:bg-rose-600 hover:text-white transition-colors"
                  title="Chat WhatsApp Style"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => { sound.playSparkle(); onLikeProfile(profile.id); }}
                  className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow"
                  title="Cocok & Love"
                >
                  <Heart className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
