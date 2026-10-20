import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, MatchProfile, Conversation, ChatMessage } from '../types';
import { INITIAL_MATCH_PROFILES, ASTRO_ICEBREAKERS } from '../data/mockProfiles';
import { getConversations, sendChatMessage, initConversationIfNew } from '../services/storage';
import { calculateSynastry } from '../utils/astrology';
import { MessageCircle, Send, Sparkles, Heart, ArrowLeft, ShieldCheck, Compass, Smile } from 'lucide-react';

interface ChatViewProps {
  currentUser: UserProfile;
  selectedMatchId?: string | null;
  onSelectMatch: (matchId: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentUser,
  selectedMatchId,
  onSelectMatch
}) => {
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [activeId, setActiveId] = useState<string>(selectedMatchId || 'match-leo');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations
  const refreshChats = () => {
    const chats = getConversations(currentUser.id);
    setConversations(chats);
  };

  useEffect(() => {
    refreshChats();
    const handleUpdate = () => refreshChats();
    window.addEventListener('astrolovegy_chat_updated', handleUpdate);
    return () => window.removeEventListener('astrolovegy_chat_updated', handleUpdate);
  }, [currentUser.id]);

  useEffect(() => {
    if (selectedMatchId) {
      setActiveId(selectedMatchId);
      initConversationIfNew(currentUser.id, selectedMatchId);
      refreshChats();
    }
  }, [selectedMatchId, currentUser.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeId]);

  const activeMatch = INITIAL_MATCH_PROFILES.find(m => m.id === activeId) || INITIAL_MATCH_PROFILES[0];
  const activeConversation = conversations[activeId] || {
    matchId: activeId,
    lastMessage: '',
    lastMessageTime: '',
    unreadCount: 0,
    messages: []
  };

  const activeSynastry = calculateSynastry(
    currentUser.sunSign,
    activeMatch.sunSign,
    currentUser.moonSign,
    activeMatch.moonSign
  );

  const handleSendMessage = (textToSend?: string, isIcebreaker: boolean = false) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sendChatMessage(currentUser.id, activeId, text.trim(), isIcebreaker);
    setInputText('');
    refreshChats();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0c0914] text-rose-50 px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute top-10 right-1/4 h-80 w-80 rounded-full bg-rose-600/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        
        {/* Main Messenger Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl border border-rose-900/50 bg-[#140b22] shadow-2xl overflow-hidden h-[78vh]">
          
          {/* ================= LEFT COLUMN: CONVERSATION LIST ================= */}
          <div className={`md:col-span-5 lg:col-span-4 border-r border-rose-950 flex flex-col h-full ${activeId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* List Header */}
            <div className="p-4 border-b border-rose-950 bg-[#160c26]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-rose-400" />
                  <span>Jodoh Kosmik Anda</span>
                </h2>
                <span className="text-xs font-semibold text-rose-300 font-mono tabular-nums">
                  {INITIAL_MATCH_PROFILES.length} Cocok
                </span>
              </div>
              <p className="text-[11px] text-rose-300/70 mt-1">
                Koneksi yang telah terhubung via sinastri zodiak
              </p>
            </div>

            {/* Contacts Scrollable List */}
            <div className="overflow-y-auto flex-1 divide-y divide-rose-950/50">
              {INITIAL_MATCH_PROFILES.map((profile) => {
                const conv = conversations[profile.id];
                const isSelected = activeId === profile.id;
                const syn = calculateSynastry(currentUser.sunSign, profile.sunSign);

                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setActiveId(profile.id);
                      initConversationIfNew(currentUser.id, profile.id);
                      refreshChats();
                    }}
                    className={`flex w-full items-center gap-3.5 p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-rose-950/60 border-l-2 border-rose-500'
                        : 'hover:bg-rose-950/30'
                    }`}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-rose-500/30">
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0c0914]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-bold text-sm text-white truncate">{profile.name}</span>
                          <span className="text-xs text-rose-400">{profile.sunSign.symbol}</span>
                        </div>
                        <span className="font-mono text-[10px] text-amber-300 font-semibold tabular-nums shrink-0">
                          {syn.score}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-rose-300/80 mt-1">
                        <span className="truncate max-w-[160px] text-[11px]">
                          {conv?.lastMessage || `Kecocokan ${profile.sunSign.name}`}
                        </span>
                        <span className="text-[10px] text-rose-400/70 shrink-0">
                          {conv?.lastMessageTime || 'Baru'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* ================= RIGHT COLUMN: CHAT ROOM ================= */}
          <div className={`md:col-span-7 lg:col-span-8 flex flex-col h-full bg-[#11081e] ${!activeId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Chat Room Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-rose-950 bg-[#160c26]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectMatch('')}
                  className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-rose-300 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-rose-500/40">
                  <img
                    src={activeMatch.photo}
                    alt={activeMatch.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{activeMatch.name}, {activeMatch.age}</h3>
                    <span className="text-xs text-rose-400 font-semibold">{activeMatch.sunSign.symbol} {activeMatch.sunSign.name}</span>
                  </div>
                  <div className="text-[11px] text-rose-300/80">
                    Sinergi Kosmik: <strong className="text-amber-300">{activeSynastry.score}% ({activeSynastry.verdict})</strong>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-rose-950/50 px-3 py-1 text-xs text-rose-300 border border-rose-900/40">
                <Heart className="h-3.5 w-3.5 text-rose-400" />
                <span>{activeMatch.loveLanguage}</span>
              </div>
            </div>

            {/* Astrological Icebreakers Bar */}
            <div className="border-b border-rose-950 bg-[#130920] px-4 py-2.5">
              <div className="flex items-center gap-2 text-[11px] text-rose-300 mb-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Pemicu Obrolan Astrologi Cepat:</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {ASTRO_ICEBREAKERS.slice(0, 3).map((ice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(ice.replace(/["✨🌙🔥💫☕]/g, '').trim(), true)}
                    className="shrink-0 rounded-full border border-rose-900/50 bg-rose-950/30 px-3 py-1 text-[11px] text-rose-200 hover:border-rose-500 hover:bg-rose-950/70 hover:text-white transition-colors max-w-[280px] truncate"
                  >
                    {ice}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              
              {/* Astrological Connection Banner */}
              <div className="rounded-2xl border border-rose-900/40 bg-gradient-to-r from-rose-950/40 via-[#180a29] to-rose-950/40 p-3.5 text-center text-xs text-rose-200 mb-4">
                <div className="font-semibold text-white">
                  ✨ Kalian memiliki kompatibilitas {activeSynastry.score}% ({activeSynastry.verdict})
                </div>
                <p className="mt-1 text-[11px] text-rose-300/80">
                  {activeSynastry.summary}
                </p>
              </div>

              {activeConversation.messages.map((msg) => {
                const isUser = msg.senderId === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                          : 'border border-rose-900/50 bg-[#1d1030] text-rose-100 shadow-sm'
                      }`}
                    >
                      {msg.isIcebreaker && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-200 font-semibold mb-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Pesan Bintang</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-rose-400/60 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-rose-950 bg-[#160c26]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ketik pesan romantis untuk ${activeMatch.name}...`}
                  className="flex-1 rounded-2xl border border-rose-900/60 bg-[#12081c] px-4 py-3 text-xs text-white placeholder-rose-400/50 focus:border-rose-400 focus:outline-none"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 text-white shadow-md hover:opacity-95 disabled:opacity-40 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
