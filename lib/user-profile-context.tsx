import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { UserProfile, EmergencyContact } from './types';

interface UserProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  saveProfile: (profile: UserProfile) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => Promise<void>;
  updateEmergencyContact: (id: string, updates: Partial<EmergencyContact>) => Promise<void>;
  deleteEmergencyContact: (id: string) => Promise<void>;
}

export const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const PROFILE_STORAGE_KEY = 'user_profile';

const DEFAULT_PROFILE: UserProfile = {
  id: 'default',
  fullName: '',
  emergencyContacts: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from storage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        } else {
          // Create default profile if none exists
          const newProfile = { ...DEFAULT_PROFILE, id: Date.now().toString() };
          await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
          setProfile(newProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setProfile(DEFAULT_PROFILE);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = useCallback(async (newProfile: UserProfile) => {
    try {
      const updated = {
        ...newProfile,
        updatedAt: Date.now(),
      };
      await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
      setProfile(updated);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!profile) return;
      const updated = {
        ...profile,
        ...updates,
        updatedAt: Date.now(),
      };
      await saveProfile(updated);
    },
    [profile, saveProfile]
  );

  const addEmergencyContact = useCallback(
    async (contact: Omit<EmergencyContact, 'id'>) => {
      if (!profile) return;
      const newContact: EmergencyContact = {
        ...contact,
        id: Date.now().toString(),
      };
      const updated = {
        ...profile,
        emergencyContacts: [...profile.emergencyContacts, newContact],
        updatedAt: Date.now(),
      };
      await saveProfile(updated);
    },
    [profile, saveProfile]
  );

  const updateEmergencyContact = useCallback(
    async (id: string, updates: Partial<EmergencyContact>) => {
      if (!profile) return;
      const updated = {
        ...profile,
        emergencyContacts: profile.emergencyContacts.map((contact) =>
          contact.id === id ? { ...contact, ...updates } : contact
        ),
        updatedAt: Date.now(),
      };
      await saveProfile(updated);
    },
    [profile, saveProfile]
  );

  const deleteEmergencyContact = useCallback(
    async (id: string) => {
      if (!profile) return;
      const updated = {
        ...profile,
        emergencyContacts: profile.emergencyContacts.filter((contact) => contact.id !== id),
        updatedAt: Date.now(),
      };
      await saveProfile(updated);
    },
    [profile, saveProfile]
  );

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        isLoading,
        saveProfile,
        updateProfile,
        addEmergencyContact,
        updateEmergencyContact,
        deleteEmergencyContact,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = React.useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
