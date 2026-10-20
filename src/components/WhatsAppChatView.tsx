import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, MatchProfile, Conversation, ChatMessage } from '../types';
import { INITIAL_MATCH_PROFILES, ASTRO_ICEBREAKERS } from '../data/mockProfiles';
import { getConversations, sendChatMessage, initConversationIfNew } from '../services/storage';
import { calculateSynastry } from '../utils/astrology';
import { sound } from '../utils/audio';
import { 
  Send, Phone, Video, MoreVertical, Paperclip, Smile, Mic, 
  CheckCheck, Download, ExternalLink, ArrowLeft, Heart, Sparkles, 
  Instagram, MapPin, Share2, ShieldCheck, Check
} from 'lucide-react';

interface WhatsAppChatViewProps {
  currentUser: UserProfile;
  selectedMatchId?: string | null;
  onSelectMatch: (matchId: string) => void;
  onBackToMatch?: () => void;
}

export const WhatsAppChatView: React.FC<WhatsAppChatViewProps> = ({
  currentUser,
  selectedMatchId,
  onSelectMatch,
  onBackToMatch
}) => {
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [activeId, setActiveId] = useState<string>(selectedMatchId || 'match-clarissa');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSaveContactModal, setShowSaveContactModal] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const refreshChats = () => {
    const chats = getConversations(currentUser.id);
    setConversations(chats);
  };

  useEffect(() => {
    refreshChats();
    const handleUpdate = () => {
      refreshChats();
      setIsTyping(false);
    };
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
  }, [conversations, activeId, isTyping]);

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

    sound.playMessageSent();
    sendChatMessage(currentUser.id, activeId, text.trim(), isIcebreaker);
    setInputText('');
    refreshChats();

    // Trigger typing indicator for simulated match reply
    setTimeout(() => {
      setIsTyping(true);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate & Download vCard (.vcf) contact file for real phone contact saving
  const handleDownloadVCard = () => {
    sound.playSparkle();
    const phone = activeMatch.phoneNumber || '+6281234567890';
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${activeMatch.name} (Astrolovegy)`,
      `N:${activeMatch.name};;;;`,
      `TEL;TYPE=CELL:${phone}`,
      `NOTE:Zodiak: ${activeMatch.sunSign.name} (${activeMatch.element}) | Skor Kecocokan: ${activeSynastry.score}% | Kota: ${activeMatch.city}`,
      activeMatch.instagramUrl ? `URL:${activeMatch.instagramUrl}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeMatch.name.replace(/\s+/g, '_')}_Astrolovegy.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSavedSuccessToast(true);
    setTimeout(() => setSavedSuccessToast(false), 3000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0c0914] text-rose-50 px-2 sm:px-6 py-4">
      
      <div className="mx-auto max-w-6xl">
        
        {/* Main WhatsApp Window Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl border border-rose-900/40 bg-[#12081d] shadow-2xl overflow-hidden h-[82vh]">
          
          {/* ================= LEFT CONTACTS SIDEBAR (WHATSAPP STYLE) ================= */}
          <div className={`md:col-span-5 lg:col-span-4 border-r border-rose-950/80 flex flex-col h-full bg-[#140a24] ${activeId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Sidebar Header */}
            <div className="p-3.5 border-b border-rose-950 bg-[#180d2c] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-rose-500/40">
                  <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-rose-300">Obrolan WhatsApp Kosmik</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5">
                  WA Ready
                </span>
              </div>
            </div>

            {/* Contacts list */}
            <div className="overflow-y-auto flex-1 divide-y divide-rose-950/40">
              {INITIAL_MATCH_PROFILES.map((profile) => {
                const isSelected = activeId === profile.id;
                const conv = conversations[profile.id];
                const syn = calculateSynastry(currentUser.sunSign, profile.sunSign);

                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      sound.playTap();
                      setActiveId(profile.id);
                      initConversationIfNew(currentUser.id, profile.id);
                      refreshChats();
                    }}
                    className={`flex w-full items-center gap-3 p-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-rose-950/60 border-l-4 border-emerald-500'
                        : 'hover:bg-rose-950/30'
                    }`}
                  >
                    <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden ring-2 ring-rose-500/30">
                      <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#12081d]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white truncate flex items-center gap-1">
                          <span>{profile.name}</span>
                          <span className="text-[10px] text-rose-400">{profile.sunSign.symbol}</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">
                          {syn.score}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-rose-300/80 mt-1">
                        <span className="truncate max-w-[170px] text-[11px]">
                          {conv?.lastMessage || 'Hai! Senang kita berjodoh ✨'}
                        </span>
                        <span className="text-[10px] text-rose-400/60 shrink-0">
                          {conv?.lastMessageTime || '12:00'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* ================= RIGHT CHAT ROOM (WHATSAPP STYLE) ================= */}
          <div className={`md:col-span-7 lg:col-span-8 flex flex-col h-full bg-[#0e0717] relative ${!activeId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* WhatsApp Header */}
            <div className="p-3 border-b border-rose-950 bg-[#160c29] flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => { sound.playTap(); onSelectMatch(''); }}
                  className="md:hidden p-1 text-rose-300 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-emerald-500/50 shrink-0">
                  <img src={activeMatch.photo} alt={activeMatch.name} className="h-full w-full object-cover" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <h3 className="font-bold text-sm text-white truncate">{activeMatch.name}</h3>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isTyping ? 'sedang mengetik...' : 'online'}</span>
                    <span className="text-rose-400/70">· {activeMatch.city}</span>
                  </div>
                </div>
              </div>

              {/* Actions & WhatsApp Contact Saver Button */}
              <div className="flex items-center gap-2 shrink-0">
                
                {/* Save contact button */}
                <button
                  onClick={() => { sound.playTap(); setShowSaveContactModal(true); }}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white shadow transition-all active:scale-95"
                  title="Simpan nomor kontak pasangan ke HP"
                >
                  <Download className="h-3 w-3" />
                  <span className="hidden sm:inline">Simpan Kontak</span>
                </button>

                {/* External WhatsApp button */}
                <a
                  href={`https://wa.me/${(activeMatch.phoneNumber || '6281234567890').replace(/\+/g, '')}?text=Halo%20${encodeURIComponent(activeMatch.name)},%20aku%20dari%20Astrolovegy!%20Senang%20berkenalan%20denganmu`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-rose-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                  title="Buka Chat di Aplikasi WhatsApp Asli"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <button
                  onClick={() => { sound.playTap(); alert(`Memulai panggilan suara romantis dengan ${activeMatch.name}...`); }}
                  className="p-2 rounded-full text-rose-300 hover:text-white hover:bg-rose-950/60"
                  title="Panggilan Suara"
                >
                  <Phone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* WhatsApp Wallpaper Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ec4899_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            {/* Astrological Icebreaker Suggestion Strip */}
            <div className="z-10 bg-[#140b22]/95 border-b border-rose-950/60 px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-amber-300 font-bold shrink-0 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Pemicu Topik:</span>
              </span>
              {ASTRO_ICEBREAKERS.slice(0, 3).map((ice, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(ice.replace(/["✨🌙🔥💫☕]/g, '').trim(), true)}
                  className="shrink-0 rounded-full border border-rose-900/60 bg-rose-950/40 px-2.5 py-1 text-[10px] text-rose-200 hover:bg-rose-600 hover:text-white transition-colors max-w-[220px] truncate"
                >
                  {ice}
                </button>
              ))}
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 z-10">
              
              {/* WhatsApp Date Stamp */}
              <div className="flex justify-center">
                <span className="rounded-full bg-[#180f28] border border-rose-950 px-3 py-0.5 text-[10px] text-rose-300/80 shadow-sm">
                  Kecocokan Astrologi: {activeSynastry.score}% ({activeSynastry.verdict})
                </span>
              </div>

              {activeConversation.messages.map((msg) => {
                const isUser = msg.senderId === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`relative max-w-[85%] sm:max-w-[70%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-md ${
                        isUser
                          ? 'bg-[#18392b] text-emerald-100 rounded-tr-none border border-emerald-700/40' // WhatsApp Sent Green
                          : 'bg-[#1c122c] text-rose-100 rounded-tl-none border border-rose-900/50' // WhatsApp Received
                      }`}
                    >
                      {msg.isIcebreaker && (
                        <div className="text-[10px] text-amber-300 font-semibold mb-1 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Pesan Bintang Sinastri</span>
                        </div>
                      )}
                      
                      <p>{msg.text}</p>

                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-rose-300/60">
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="h-3 w-3 text-cyan-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1 text-[11px] text-rose-300/80 bg-[#1c122c] px-3 py-1.5 rounded-full w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[10px] text-emerald-300">{activeMatch.name} sedang mengetik...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Input Bar */}
            <div className="p-3 border-t border-rose-950 bg-[#160c29] z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { sound.playTap(); handleSendMessage('❤️'); }}
                  className="p-2 text-rose-300 hover:text-white"
                  title="Kirim Emoji Hati"
                >
                  <Smile className="h-4 w-4" />
                </button>

                <button
                  onClick={() => { sound.playTap(); alert('Pilih lampiran foto atau bagan kelahiran untuk dikirim ke chat!'); }}
                  className="p-2 text-rose-300 hover:text-white"
                  title="Kirim Lampiran Foto"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ketik pesan WhatsApp untuk ${activeMatch.name}...`}
                  className="flex-1 rounded-2xl border border-rose-900/60 bg-[#12081d] px-4 py-2.5 text-xs text-white placeholder-rose-400/50 focus:border-emerald-500 focus:outline-none"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md disabled:opacity-40 transition-opacity shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL: SIMPAN KONTAK PASANGAN ================= */}
      {showSaveContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-emerald-500/50 bg-[#140b22] p-6 text-center text-rose-50 shadow-2xl">
            
            <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden ring-4 ring-emerald-500 mb-3 shadow-xl">
              <img src={activeMatch.photo} alt={activeMatch.name} className="h-full w-full object-cover" />
            </div>

            <h3 className="font-display text-lg font-bold text-white">{activeMatch.name}</h3>
            <p className="text-xs text-rose-300">
              {activeMatch.city} · Zodiak {activeMatch.sunSign.name}
            </p>

            <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-300 font-semibold">Nomor WhatsApp:</span>
                <span className="font-mono text-white font-bold">{activeMatch.phoneNumber || '+62 812-3456-7890'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300 font-semibold">Skor Sinastri:</span>
                <span className="font-mono text-amber-300 font-bold">{activeSynastry.score}% Harmonis</span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={handleDownloadVCard}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>Download Kontak ke HP (.vcf)</span>
              </button>

              <a
                href={`https://wa.me/${(activeMatch.phoneNumber || '6281234567890').replace(/\+/g, '')}?text=Halo%20${encodeURIComponent(activeMatch.name)},%20aku%20dari%20Astrolovegy!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-950/20 py-2.5 text-xs font-bold text-emerald-300 hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Buka Langsung di WhatsApp</span>
              </a>

              <button
                onClick={() => setShowSaveContactModal(false)}
                className="w-full py-2 text-xs text-rose-300/80 hover:text-white"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Toast notice */}
      {savedSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl animate-bounce">
          <Check className="h-4 w-4" />
          <span>Kontak {activeMatch.name} berhasil disimpan ke perangkat!</span>
        </div>
      )}

    </div>
  );
};
