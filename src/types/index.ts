import { ZodiacInfo } from '../utils/astrology';

export type AuthProvider = 'google' | 'instagram' | 'tiktok' | 'email';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  gender: 'Pria' | 'Wanita' | 'Lainnya';
  interestedIn: 'Pria' | 'Wanita' | 'Semua';
  dateOfBirth: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthCity: string;
  sunSign: ZodiacInfo;
  moonSign: ZodiacInfo;
  risingSign: ZodiacInfo;
  loveArchetype: string;
  bio: string;
  loveLanguage: string;
  relationshipGoal: string;
  hobbies: string[];
  instagramUrl?: string;
  tiktokUrl?: string;
  customPhotos?: string[];
  registeredAt: string;
  authProvider: AuthProvider;
  likedProfileIds: string[];
  passedProfileIds: string[];
  superLikedProfileIds: string[];
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Pria' | 'Wanita';
  city: string;
  photo: string;
  sunSign: ZodiacInfo;
  moonSign: ZodiacInfo;
  risingSign: ZodiacInfo;
  element: 'Api' | 'Tanah' | 'Udara' | 'Air';
  bio: string;
  loveLanguage: string;
  relationshipGoal: string;
  hobbies: string[];
  distanceKm: number;
  verified: boolean;
  job: string;
  synastryHighlights: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  phoneNumber?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'user' or matchId
  text: string;
  timestamp: string;
  isIcebreaker?: boolean;
}

export interface Conversation {
  matchId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface DailyHoroscope {
  signName: string;
  date: string;
  headline: string;
  loveAdvice: string;
  luckyHours: string;
  energyVibe: string;
  compatibleSignToday: string;
}

export interface ZodiacRomanceData {
  sign: string;
  name: string;
  symbol: string;
  element: 'Api' | 'Tanah' | 'Udara' | 'Air';
  romanticTitle: string;
  quote: string;
  romancePersona: string;
  traits: string[];
  loveLanguage: {
    primary: string;
    secondary: string;
    explanation: string;
  };
  hobbies: string[];
  favoriteFoods: {
    name: string;
    category: 'Makan Malam' | 'Camilan Manis' | 'Minuman Kencan';
    description: string;
  }[];
  dreamDateSpot: {
    title: string;
    description: string;
    vibe: string;
  };
  howToAttract: string[];
  dealbreakers: string[];
  idealGift: {
    item: string;
    why: string;
  };
  bestSoulmates: {
    sign: string;
    symbol: string;
    compatibility: number; // e.g. 96
    reason: string;
  }[];
  flirtingStyle: string;
  communicationTip: string;
}
