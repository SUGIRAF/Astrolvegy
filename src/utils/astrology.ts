/**
 * Astrological calculations and synastry compatibility engine for Astrolovegy
 */

export interface ZodiacInfo {
  sign: string;
  name: string;
  symbol: string;
  element: 'Api' | 'Tanah' | 'Udara' | 'Air';
  quality: 'Kardinal' | 'Tetap' | 'Dapat Berubah';
  rulingPlanet: string;
  dateRange: string;
  traits: string[];
  romanticStyle: string;
  loveLanguageBias: string;
}

export const ZODIAC_SIGNS: Record<string, ZodiacInfo> = {
  Aries: {
    sign: 'Aries',
    name: 'Aries',
    symbol: '♈',
    element: 'Api',
    quality: 'Kardinal',
    rulingPlanet: 'Mars',
    dateRange: '21 Mar - 19 Apr',
    traits: ['Pemberani', 'Bergairah', 'Jujur', 'Spontan', 'Inisiatif Tinggi'],
    romanticStyle: 'Mencintai dengan kobaran semangat yang membara, protektif, dan suka kejutan spontan.',
    loveLanguageBias: 'Physical Touch & Words of Affirmation'
  },
  Taurus: {
    sign: 'Taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'Tanah',
    quality: 'Tetap',
    rulingPlanet: 'Venus',
    dateRange: '20 Apr - 20 Mei',
    traits: ['Setia', 'Penyabar', 'Sensual', 'Dapat Diandalkan', 'Penuh Kehangatan'],
    romanticStyle: 'Cinta yang kokoh seperti karang, mengutamakan kenyamanan, sentuhan lembut, dan kesetiaan mutlak.',
    loveLanguageBias: 'Physical Touch & Receiving Gifts'
  },
  Gemini: {
    sign: 'Gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'Udara',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Merkurius',
    dateRange: '21 Mei - 20 Jun',
    traits: ['Cerdas', 'Humoris', 'Komunikatif', 'Fleksibel', 'Penuh Rasa Ingin Tahu'],
    romanticStyle: 'Jatuh cinta lewat percakapan mendalam berjam-jam, lelucon cerdas, dan petualangan intelektual.',
    loveLanguageBias: 'Quality Time & Words of Affirmation'
  },
  Cancer: {
    sign: 'Cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'Air',
    quality: 'Kardinal',
    rulingPlanet: 'Bulan',
    dateRange: '21 Jun - 22 Jul',
    traits: ['Empatis', 'Penyayang', 'Intuitif', 'Protektif', 'Berhati Lembut'],
    romanticStyle: 'Mencintai dengan ketulusan jiwa, membangun rumah yang aman, dan sangat peka terhadap perasaan pasangan.',
    loveLanguageBias: 'Acts of Service & Quality Time'
  },
  Leo: {
    sign: 'Leo',
    name: 'Leo',
    symbol: '♌',
    element: 'Api',
    quality: 'Tetap',
    rulingPlanet: 'Matahari',
    dateRange: '23 Jul - 22 Agu',
    traits: ['Karismatik', 'Dermawan', 'Hangat', 'Setia', 'Ekspresif'],
    romanticStyle: 'Memperlakukan pasangannya bak ratu/raja dunia, bangga memperlihatkan cinta, dan penuh kehangatan magnetis.',
    loveLanguageBias: 'Words of Affirmation & Receiving Gifts'
  },
  Virgo: {
    sign: 'Virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'Tanah',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Merkurius',
    dateRange: '23 Agu - 22 Sep',
    traits: ['Perhatian', 'Setia', 'Pengamat Tajam', 'Tulus', 'Perfeksionis Positif'],
    romanticStyle: 'Menunjukkan kasih melalui tindakan nyata, memperhatikan detail terkecil kesukaanmu, dan selalu ada saat dibutuhkan.',
    loveLanguageBias: 'Acts of Service & Quality Time'
  },
  Libra: {
    sign: 'Libra',
    name: 'Libra',
    symbol: '♎',
    element: 'Udara',
    quality: 'Kardinal',
    rulingPlanet: 'Venus',
    dateRange: '23 Sep - 22 Okt',
    traits: ['Romantis', 'Mempesona', 'Harmonis', 'Penuh Empati', 'Elegan'],
    romanticStyle: 'Pencinta sejati yang mendambakan keharmonisan, kencan estetik, dan percakapan manis yang saling menghargai.',
    loveLanguageBias: 'Words of Affirmation & Quality Time'
  },
  Scorpio: {
    sign: 'Scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'Air',
    quality: 'Tetap',
    rulingPlanet: 'Pluto & Mars',
    dateRange: '23 Okt - 21 Nov',
    traits: ['Intens', 'Setia Total', 'Penuh Magnet', 'Misterius', 'Intuitif'],
    romanticStyle: 'Cinta yang sangat mendalam dan transformatif. Sekali jatuh cinta, kesetiaannya tak tertandingi.',
    loveLanguageBias: 'Physical Touch & Quality Time'
  },
  Sagittarius: {
    sign: 'Sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Api',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Jupiter',
    dateRange: '22 Nov - 21 Des',
    traits: ['Optimis', 'Berjiwa Bebas', 'Petualang', 'Jujur', 'Menyenangkan'],
    romanticStyle: 'Mencari pasangan yang juga sahabat berpetualang, membagikan tawa lepas dan impian menjelajahi dunia bersama.',
    loveLanguageBias: 'Quality Time & Physical Touch'
  },
  Capricorn: {
    sign: 'Capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'Tanah',
    quality: 'Kardinal',
    rulingPlanet: 'Saturnus',
    dateRange: '22 Des - 19 Jan',
    traits: ['Berkomitmen', 'Bijaksana', 'Protektif', 'Stabil', 'Berambisi Positif'],
    romanticStyle: 'Cinta jangka panjang yang solid, membuktikan komitmen lewat masa depan yang terencana dan rasa aman.',
    loveLanguageBias: 'Acts of Service & Words of Affirmation'
  },
  Aquarius: {
    sign: 'Aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'Udara',
    quality: 'Tetap',
    rulingPlanet: 'Uranus & Saturnus',
    dateRange: '20 Jan - 18 Feb',
    traits: ['Visioner', 'Unik', 'Setia Sebagai Sahabat', 'Mandiri', 'Terbuka'],
    romanticStyle: 'Mencintai dengan menghormati ruang pribadi, menyukai koneksi batin yang orisinal tanpa sandiwara.',
    loveLanguageBias: 'Quality Time & Acts of Service'
  },
  Pisces: {
    sign: 'Pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'Air',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Neptunus & Jupiter',
    dateRange: '19 Feb - 20 Mar',
    traits: ['Romantis Puitis', 'Empatis Tinggi', 'Lembut', 'Penuh Imajinasi', 'Penyayang'],
    romanticStyle: 'Cinta bak dongeng yang penuh keajaiban batin, getaran telepati emosional, dan kasih sayang tanpa syarat.',
    loveLanguageBias: 'Quality Time & Physical Touch'
  }
};

/**
 * Calculates Sun Sign from a date string (YYYY-MM-DD)
 */
export function calculateSunSign(dateString: string): ZodiacInfo {
  if (!dateString) return ZODIAC_SIGNS['Aries'];
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS['Aries'];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS['Taurus'];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS['Gemini'];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS['Cancer'];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS['Leo'];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS['Virgo'];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS['Libra'];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS['Scorpio'];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS['Sagittarius'];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS['Capricorn'];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS['Aquarius'];
  return ZODIAC_SIGNS['Pisces'];
}

/**
 * Approximate Moon Sign based on birth date and time offset
 */
export function calculateMoonSign(dateString: string, birthTime: string = '12:00'): ZodiacInfo {
  const signs = Object.values(ZODIAC_SIGNS);
  const date = new Date(dateString);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const [hour] = (birthTime || '12:00').split(':').map(Number);
  
  // The Moon travels through all 12 signs in ~27.3 days (roughly 2.25 days per sign)
  const moonIndex = Math.floor((dayOfYear * 12 / 27.3 + (hour || 12) / 24) % 12);
  return signs[Math.abs(moonIndex) % 12];
}

/**
 * Approximate Ascendant/Rising Sign based on Sun sign and hour of birth
 */
export function calculateRisingSign(sunSignName: string, birthTime: string = '07:00'): ZodiacInfo {
  const signs = Object.values(ZODIAC_SIGNS);
  const sunIndex = signs.findIndex(s => s.name === sunSignName);
  const [hour] = (birthTime || '07:00').split(':').map(Number);
  
  // At sunrise (~6am), rising sign is approximately identical to sun sign. Every 2 hours it shifts one sign forward.
  const hoursSinceSunrise = (hour - 6 + 24) % 24;
  const risingShift = Math.floor(hoursSinceSunrise / 2);
  const risingIndex = (sunIndex + risingShift) % 12;
  return signs[risingIndex];
}

/**
 * Determine Romantic Archetype title
 */
export function getLoveArchetype(sun: ZodiacInfo, element: string): string {
  if (element === 'Api') {
    return 'The Passionate Flame (Pencinta Penuh Gairah & Keberanian)';
  } else if (element === 'Air') {
    return 'The Empathetic Mystic (Pencari Jiwa yang Tulus & Mendalam)';
  } else if (element === 'Udara') {
    return 'The Charming Intellectual (Pesonawan Cerdas & Harmonis)';
  } else {
    return 'The Devoted Anchor (Penjaga Kesetiaan yang Kokoh & Hangat)';
  }
}

export interface SynastryResult {
  score: number;
  verdict: string;
  summary: string;
  emotionalScore: number;
  chemistryScore: number;
  communicationScore: number;
  longTermScore: number;
  strengths: string[];
  cosmicAdvice: string;
  elementMatch: string;
}

/**
 * Calculate deep astrological synastry compatibility between two profiles
 */
export function calculateSynastry(
  signA: ZodiacInfo,
  signB: ZodiacInfo,
  moonA?: ZodiacInfo,
  moonB?: ZodiacInfo
): SynastryResult {
  const elemA = signA.element;
  const elemB = signB.element;

  // Base compatibility matrix based on classical element harmonies
  let baseScore = 75;
  let elementMatchDesc = '';

  if (elemA === elemB) {
    baseScore = 88;
    elementMatchDesc = `Harmoni Unsur Sama (${elemA} & ${elemB}): Kalian memahami bahasa jiwa masing-masing secara intuitif.`;
  } else if ((elemA === 'Api' && elemB === 'Udara') || (elemA === 'Udara' && elemB === 'Api')) {
    baseScore = 94;
    elementMatchDesc = 'Sinergi Api & Udara: Udara mengobarkan kobaran api, menciptakan antusiasme dan inspirasi tanpa henti.';
  } else if ((elemA === 'Tanah' && elemB === 'Air') || (elemA === 'Air' && elemB === 'Tanah')) {
    baseScore = 93;
    elementMatchDesc = 'Sinergi Tanah & Air: Air menyuburkan tanah, menghasilkan hubungan yang lembut, stabil, dan subur akan kasih sayang.';
  } else if ((elemA === 'Api' && elemB === 'Tanah') || (elemA === 'Tanah' && elemB === 'Api')) {
    baseScore = 81;
    elementMatchDesc = 'Dinamika Api & Tanah: Api membawa gairah dan visi, Tanah memberikan rasa aman dan fondasi masa depan.';
  } else if ((elemA === 'Udara' && elemB === 'Air') || (elemA === 'Air' && elemB === 'Udara')) {
    baseScore = 83;
    elementMatchDesc = 'Pertemuan Rasa & Pikir: Sentuhan rasa Air yang mendalam diperkaya oleh kecerdasan komunikasi Udara.';
  } else {
    baseScore = 79;
    elementMatchDesc = 'Daya Tarik Kutub: Perbedaan cara pandang justru menjadi magnet misterius yang memperkuat rasa penasaran cinta.';
  }

  // Check specific high-affinity sign pairings
  const pairKey = [signA.name, signB.name].sort().join('-');
  const specialCosmicPairs: Record<string, number> = {
    'Cancer-Pisces': 98,
    'Cancer-Scorpio': 97,
    'Pisces-Scorpio': 99,
    'Aries-Leo': 96,
    'Leo-Sagittarius': 97,
    'Aries-Sagittarius': 95,
    'Gemini-Libra': 96,
    'Aquarius-Gemini': 95,
    'Aquarius-Libra': 96,
    'Capricorn-Taurus': 97,
    'Taurus-Virgo': 96,
    'Capricorn-Virgo': 98,
    'Leo-Libra': 94,
    'Aries-Gemini': 92,
    'Cancer-Taurus': 95,
    'Capricorn-Scorpio': 94,
    'Pisces-Taurus': 96
  };

  if (specialCosmicPairs[pairKey]) {
    baseScore = specialCosmicPairs[pairKey];
  }

  // Moon synergy bonus if available
  let moonBonus = 0;
  if (moonA && moonB) {
    if (moonA.element === moonB.element) moonBonus += 4;
    else if ((moonA.element === 'Air' && moonB.element === 'Tanah') || (moonA.element === 'Api' && moonB.element === 'Udara')) {
      moonBonus += 3;
    }
  }

  const finalScore = Math.min(99, Math.max(70, baseScore + moonBonus));

  // Granular scores
  const emotionalScore = Math.min(99, Math.round(finalScore * 0.96 + (elemA === 'Air' || elemB === 'Air' ? 4 : 0)));
  const chemistryScore = Math.min(99, Math.round(finalScore * 0.98 + (elemA === 'Api' || elemB === 'Api' ? 3 : 0)));
  const communicationScore = Math.min(99, Math.round(finalScore * 0.94 + (elemA === 'Udara' || elemB === 'Udara' ? 5 : 0)));
  const longTermScore = Math.min(99, Math.round(finalScore * 0.95 + (elemA === 'Tanah' || elemB === 'Tanah' ? 4 : 0)));

  let verdict = 'Kecocokan Sangat Harmonis';
  if (finalScore >= 94) verdict = 'Takdir Kosmik Sejati (Twin Flame Potential)';
  else if (finalScore >= 88) verdict = 'Ikatan Jiwa Romantis yang Kuat';
  else if (finalScore >= 80) verdict = 'Koneksi Menarik dengan Daya Tarik Magnetik';

  return {
    score: finalScore,
    verdict,
    summary: `${signA.name} dan ${signB.name} memiliki getaran astrologi yang memicu ketertarikan alami. ${elementMatchDesc}`,
    emotionalScore,
    chemistryScore,
    communicationScore,
    longTermScore,
    strengths: [
      `Resonansi ${signA.element} dan ${signB.element} menciptakan daya tarik batiniah`,
      `Saling melengkapi gaya mencintai (${signA.rulingPlanet} & ${signB.rulingPlanet})`,
      'Keseimbangan antara gairah kencan dan rasa aman berkomunikasi'
    ],
    cosmicAdvice: `Biarkan ${signA.name} mengekspresikan perhatian secara autentik, sementara ${signB.name} memberikan kehangatan penerimaan. Dengarkan intuisi hati Anda saat kencan pertama.`,
    elementMatch: elementMatchDesc
  };
}
