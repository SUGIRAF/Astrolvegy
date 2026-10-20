import { UserProfile, MatchProfile, Conversation, ChatMessage } from '../types';
import { INITIAL_MATCH_PROFILES, ASTRO_ICEBREAKERS } from '../data/mockProfiles';
import { calculateSunSign, calculateMoonSign, calculateRisingSign, getLoveArchetype } from '../utils/astrology';

const ACCOUNTS_KEY = 'astrolovegy_accounts_v1';
const CURRENT_USER_KEY = 'astrolovegy_current_user_v1';
const CHATS_PREFIX = 'astrolovegy_chats_';

// Default initial demo user if needed
export function createDefaultUser(): UserProfile {
  const dob = '2001-07-14';
  const time = '14:30';
  const sun = calculateSunSign(dob);
  const moon = calculateMoonSign(dob, time);
  const rising = calculateRisingSign(sun.name, time);

  return {
    id: 'user_default_aurora',
    name: 'Aurora Kasih',
    email: 'aurora.kasih@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    gender: 'Wanita',
    interestedIn: 'Pria',
    dateOfBirth: dob,
    birthTime: time,
    birthCity: 'Jakarta Selatan',
    sunSign: sun,
    moonSign: moon,
    risingSign: rising,
    loveArchetype: getLoveArchetype(sun, sun.element),
    bio: 'Pencari ketenangan, pecinta senja dan secangkir teh melati. Percaya bahwa semesta selalu punya cara mempertemukan dua jiwa yang sefrekuensi.',
    loveLanguage: 'Quality Time & Words of Affirmation',
    relationshipGoal: 'Hubungan yang hangat, saling mendukung, dan bertumbuh bersama.',
    hobbies: ['Stargazing', 'Reading Books', 'Ceramic Workshop', 'Specialty Coffee'],
    instagramUrl: 'https://instagram.com/aurora.kasih',
    tiktokUrl: 'https://tiktok.com/@aurora.stargazer',
    customPhotos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
    ],
    registeredAt: new Date().toISOString(),
    authProvider: 'google',
    likedProfileIds: ['match-leo', 'match-aditya'],
    passedProfileIds: [],
    superLikedProfileIds: ['match-maya']
  };
}

let inMemoryAccounts: UserProfile[] = [];
let inMemoryCurrentUserId: string | null = null;

export function getSavedAccounts(): UserProfile[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      if (inMemoryAccounts.length > 0) return inMemoryAccounts;
      const defaultUser = createDefaultUser();
      try {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([defaultUser]));
      } catch {
        // quota full, keep in memory
      }
      inMemoryAccounts = [defaultUser];
      return inMemoryAccounts;
    }
    const accounts = JSON.parse(raw);
    if (!Array.isArray(accounts) || accounts.length === 0) {
      const defaultUser = createDefaultUser();
      inMemoryAccounts = [defaultUser];
      return inMemoryAccounts;
    }
    inMemoryAccounts = accounts;
    return accounts;
  } catch {
    if (inMemoryAccounts.length === 0) {
      inMemoryAccounts = [createDefaultUser()];
    }
    return inMemoryAccounts;
  }
}

export function saveAccount(profile: UserProfile): void {
  const accounts = getSavedAccounts();
  const existingIdx = accounts.findIndex(a => a.id === profile.id || a.email.toLowerCase() === profile.email.toLowerCase());
  if (existingIdx >= 0) {
    accounts[existingIdx] = profile;
  } else {
    accounts.unshift(profile);
  }

  // Always update in-memory cache first
  inMemoryAccounts = [...accounts];
  inMemoryCurrentUserId = profile.id;

  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setCurrentUser(profile.id);
  } catch (err) {
    console.warn('Storage quota warning: attempting lightweight fallback pruning', err);
    try {
      // Prune custom photos in accounts to keep payload small
      const lightweightAccounts = accounts.slice(0, 3).map(acc => ({
        ...acc,
        customPhotos: (acc.customPhotos || []).slice(0, 2)
      }));
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(lightweightAccounts));
      setCurrentUser(profile.id);
    } catch {
      // Keep running in memory smoothly without breaking
      console.warn('localStorage full: active session maintained in memory');
      try {
        localStorage.setItem(CURRENT_USER_KEY, profile.id);
      } catch {
        // silent
      }
    }
  }
}

export function getCurrentUser(): UserProfile | null {
  try {
    const currentId = localStorage.getItem(CURRENT_USER_KEY) || inMemoryCurrentUserId;
    const accounts = getSavedAccounts();
    if (!currentId && accounts.length > 0) {
      return null;
    }
    const found = accounts.find(a => a.id === currentId);
    return found || null;
  } catch {
    return inMemoryAccounts.find(a => a.id === inMemoryCurrentUserId) || inMemoryAccounts[0] || null;
  }
}

export function setCurrentUser(userId: string | null): void {
  inMemoryCurrentUserId = userId;
  try {
    if (userId) {
      localStorage.setItem(CURRENT_USER_KEY, userId);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch {
    // ignore
  }
}

export function recordSwipe(
  userId: string,
  matchId: string,
  action: 'like' | 'pass' | 'superlike'
): { isMatch: boolean; user: UserProfile } {
  const accounts = getSavedAccounts();
  const user = accounts.find(a => a.id === userId) || createDefaultUser();

  if (action === 'like') {
    if (!user.likedProfileIds.includes(matchId)) user.likedProfileIds.push(matchId);
  } else if (action === 'superlike') {
    if (!user.superLikedProfileIds.includes(matchId)) user.superLikedProfileIds.push(matchId);
    if (!user.likedProfileIds.includes(matchId)) user.likedProfileIds.push(matchId);
  } else if (action === 'pass') {
    if (!user.passedProfileIds.includes(matchId)) user.passedProfileIds.push(matchId);
  }

  saveAccount(user);

  // In Astrolovegy, like or superlike with any mock profile results in a mutual astrological match!
  const isMatch = action === 'like' || action === 'superlike';
  if (isMatch) {
    initConversationIfNew(userId, matchId);
  }

  return { isMatch, user };
}

export function getConversations(userId: string): Record<string, Conversation> {
  try {
    const raw = localStorage.getItem(`${CHATS_PREFIX}${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  
  // Seed initial conversation for Leo Pratama
  const initialChats: Record<string, Conversation> = {
    'match-leo': {
      matchId: 'match-leo',
      lastMessage: 'Hai! Energi astrologi kita cocok banget nih. Kamu suka ngobrolin zodiak?',
      lastMessageTime: '10:42',
      unreadCount: 1,
      messages: [
        {
          id: 'msg-1',
          senderId: 'match-leo',
          text: 'Halo! Sinergi Matahari Leo dan baganmu sangat menarik 🌟',
          timestamp: '10:30'
        },
        {
          id: 'msg-2',
          senderId: 'user',
          text: 'Halo Leo! Salam kenal, senang banget lihat skor kompatibilitas kita tinggi!',
          timestamp: '10:35'
        },
        {
          id: 'msg-3',
          senderId: 'match-leo',
          text: 'Hai! Energi astrologi kita cocok banget nih. Kamu suka ngobrolin zodiak?',
          timestamp: '10:42'
        }
      ]
    }
  };

  localStorage.setItem(`${CHATS_PREFIX}${userId}`, JSON.stringify(initialChats));
  return initialChats;
}

export function initConversationIfNew(userId: string, matchId: string): void {
  const chats = getConversations(userId);
  if (!chats[matchId]) {
    const match = INITIAL_MATCH_PROFILES.find(m => m.id === matchId);
    const greeting = match 
      ? `Hai! Astrologi semesta mempertemukan kita dengan kecocokan ${match.sunSign.name}! Senang berkenalan denganmu ✨`
      : 'Hai! Senang kita berjodoh di Astrolovegy ✨';

    chats[matchId] = {
      matchId,
      lastMessage: greeting,
      lastMessageTime: 'Baru saja',
      unreadCount: 1,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: matchId,
          text: greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    localStorage.setItem(`${CHATS_PREFIX}${userId}`, JSON.stringify(chats));
  }
}

export function sendChatMessage(
  userId: string,
  matchId: string,
  text: string,
  isIcebreaker: boolean = false
): Conversation {
  const chats = getConversations(userId);
  if (!chats[matchId]) {
    initConversationIfNew(userId, matchId);
  }

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const userMsg: ChatMessage = {
    id: `msg-${Date.now()}`,
    senderId: 'user',
    text,
    timestamp: now,
    isIcebreaker
  };

  chats[matchId].messages.push(userMsg);
  chats[matchId].lastMessage = text;
  chats[matchId].lastMessageTime = now;
  chats[matchId].unreadCount = 0;

  localStorage.setItem(`${CHATS_PREFIX}${userId}`, JSON.stringify(chats));

  // Trigger simulated cosmic reply after a short delay
  setTimeout(() => {
    try {
      const currentChats = getConversations(userId);
      if (currentChats[matchId]) {
        const replies = [
          'Aku suka banget cara pandang zodiakmu! Benar-benar sesuai dengan prediksinya ❤️',
          'Haha iya bener banget! Rasanya seperti kita sudah lama saling kenal.',
          'Wah menarik sekali! Kira-kira kapan kita bisa ngobrol santai sambil minum kopi?',
          'Energi kamu beneran bikin nyaman banget. Ceritain lagi dong tentang hari kamu!',
          'Tepat seperti yang kubayangkan dari sinastri kita, obrolan ini hangat banget ✨'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        currentChats[matchId].messages.push({
          id: `reply-${Date.now()}`,
          senderId: matchId,
          text: randomReply,
          timestamp: replyTime
        });
        currentChats[matchId].lastMessage = randomReply;
        currentChats[matchId].lastMessageTime = replyTime;
        localStorage.setItem(`${CHATS_PREFIX}${userId}`, JSON.stringify(currentChats));
        window.dispatchEvent(new CustomEvent('astrolovegy_chat_updated'));
      }
    } catch {
      // silent
    }
  }, 1200);

  return chats[matchId];
}
