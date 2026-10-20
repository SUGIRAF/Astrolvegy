import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { getCurrentUser, setCurrentUser, createDefaultUser, saveAccount, getSavedAccounts, getConversations, recordSwipe } from './services/storage';
import { Navbar } from './components/Navbar';
import { WelcomePage } from './components/WelcomePage';
import { AuthModal } from './components/AuthModal';
import { LoveMatchView } from './components/LoveMatchView';
import { CosmicRadarMap } from './components/CosmicRadarMap';
import { SynastryCalculator } from './components/SynastryCalculator';
import { DailyHoroscopeView } from './components/DailyHoroscopeView';
import { WhatsAppChatView } from './components/WhatsAppChatView';
import { ProfileView } from './components/ProfileView';
import { RomanceEducationView } from './components/RomanceEducationView';
import { RomanticMusicPlayer } from './components/RomanticMusicPlayer';
import { INITIAL_MATCH_PROFILES } from './data/mockProfiles';
import { calculateSynastry } from './utils/astrology';

export default function App() {
  const [currentUser, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'welcome' | 'match' | 'radar' | 'education' | 'synastry' | 'horoscope' | 'chat' | 'profile'>('welcome');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const [selectedMatchForChat, setSelectedMatchForChat] = useState<string | null>(null);
  const [selectedSignForSynastry, setSelectedSignForSynastry] = useState<string | undefined>(undefined);
  const [unreadCount, setUnreadCount] = useState(1);

  // Initialize session
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
      setActiveTab('match');
    } else {
      setActiveTab('welcome');
    }
  }, []);

  // Update unread count
  useEffect(() => {
    if (currentUser) {
      const chats = getConversations(currentUser.id);
      const unread = Object.values(chats).reduce((acc, c) => acc + (c.unreadCount || 0), 0);
      setUnreadCount(unread);
    }
  }, [currentUser, activeTab]);

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setUser(user);
    setActiveTab('match');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setActiveTab('welcome');
  };

  const handleExploreDemo = () => {
    const accounts = getSavedAccounts();
    const demo = accounts[0] || createDefaultUser();
    saveAccount(demo);
    setUser(demo);
    setActiveTab('match');
  };

  const handleOpenChatWithMatch = (matchId: string) => {
    setSelectedMatchForChat(matchId);
    setActiveTab('chat');
  };

  const handleOpenSynastryLab = (sign: string) => {
    setSelectedSignForSynastry(sign);
    setActiveTab('synastry');
  };

  const handleSelectCityFromMap = (cityName: string) => {
    if (currentUser) {
      const updated: UserProfile = { ...currentUser, birthCity: cityName };
      saveAccount(updated);
      setUser(updated);
    }
  };

  const handleLikeFromMap = (matchId: string) => {
    if (currentUser) {
      const { user } = recordSwipe(currentUser.id, matchId, 'like');
      setUser(user);
      setSelectedMatchForChat(matchId);
      setActiveTab('chat');
    }
  };

  const mappedProfiles = INITIAL_MATCH_PROFILES.map(p => ({
    profile: p,
    synastryScore: currentUser ? calculateSynastry(currentUser.sunSign, p.sunSign).score : 90
  }));

  return (
    <div className="min-h-screen bg-[#0c0914] text-rose-50 flex flex-col font-sans pb-16 md:pb-0">
      
      {/* Navigation Header & Mobile Bottom Bar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        unreadCount={unreadCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'welcome' && (
          <WelcomePage
            onStartSignUp={() => handleOpenAuth('signup')}
            onStartSignIn={() => handleOpenAuth('signin')}
            onExploreDemo={handleExploreDemo}
            onGoToEducation={() => setActiveTab('education')}
          />
        )}

        {activeTab === 'match' && currentUser && (
          <LoveMatchView
            currentUser={currentUser}
            onOpenChatWithMatch={handleOpenChatWithMatch}
            onOpenSynastryLab={handleOpenSynastryLab}
            onRefreshUser={(u) => setUser(u)}
            onGoToProfileSettings={() => setActiveTab('profile')}
            onGoToEducation={() => setActiveTab('education')}
          />
        )}

        {activeTab === 'radar' && currentUser && (
          <div className="mx-auto max-w-6xl px-4 py-8">
            <CosmicRadarMap
              currentUser={currentUser}
              matches={mappedProfiles}
              onSelectCity={handleSelectCityFromMap}
              onOpenChat={handleOpenChatWithMatch}
              onLikeProfile={handleLikeFromMap}
            />
          </div>
        )}

        {activeTab === 'education' && (
          <RomanceEducationView
            currentUser={currentUser}
            onOpenSynastryWithSign={handleOpenSynastryLab}
            onGoToLoveMatch={() => {
              if (currentUser) {
                setActiveTab('match');
              } else {
                handleOpenAuth('signup');
              }
            }}
          />
        )}

        {activeTab === 'synastry' && (
          <SynastryCalculator
            currentUser={currentUser}
            initialSignB={selectedSignForSynastry}
          />
        )}

        {activeTab === 'horoscope' && (
          <DailyHoroscopeView currentUser={currentUser} />
        )}

        {activeTab === 'chat' && currentUser && (
          <WhatsAppChatView
            currentUser={currentUser}
            selectedMatchId={selectedMatchForChat}
            onSelectMatch={(mId) => setSelectedMatchForChat(mId)}
            onBackToMatch={() => setActiveTab('match')}
          />
        )}

        {activeTab === 'profile' && currentUser && (
          <ProfileView
            currentUser={currentUser}
            onRefreshUser={(u) => setUser(u)}
            onLogout={handleLogout}
            onSwitchAccount={() => handleOpenAuth('signin')}
            onGoToLocalMatches={() => setActiveTab('radar')}
            onGoToEducation={() => setActiveTab('education')}
          />
        )}
      </main>

      {/* Floating Romantic Background Music Player */}
      <RomanticMusicPlayer />

      {/* Direct Biodata Onboarding Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
}
