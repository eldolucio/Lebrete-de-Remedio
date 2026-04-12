import { describe, it, expect, beforeEach, vi } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, EmergencyContact } from './types';

// Mock AsyncStorage
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe('UserProfile Types and Interfaces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a valid UserProfile', () => {
    const profile: UserProfile = {
      id: '1',
      fullName: 'João Silva',
      dateOfBirth: '1990-01-15',
      gender: 'male',
      bloodType: 'O+',
      allergies: 'Penicilina',
      medicalConditions: 'Hipertensão',
      phone: '11999999999',
      email: 'joao@example.com',
      address: 'Rua A, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    expect(profile.fullName).toBe('João Silva');
    expect(profile.bloodType).toBe('O+');
    expect(profile.emergencyContacts).toHaveLength(0);
  });

  it('should create a valid EmergencyContact', () => {
    const contact: EmergencyContact = {
      id: '1',
      name: 'Maria Silva',
      relationship: 'Mãe',
      phone: '11988888888',
      email: 'maria@example.com',
    };

    expect(contact.name).toBe('Maria Silva');
    expect(contact.relationship).toBe('Mãe');
    expect(contact.phone).toBe('11988888888');
  });

  it('should handle multiple emergency contacts', () => {
    const profile: UserProfile = {
      id: '1',
      fullName: 'João Silva',
      emergencyContacts: [
        {
          id: '1',
          name: 'Maria Silva',
          relationship: 'Mãe',
          phone: '11988888888',
        },
        {
          id: '2',
          name: 'Pedro Silva',
          relationship: 'Irmão',
          phone: '11987777777',
          email: 'pedro@example.com',
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    expect(profile.emergencyContacts).toHaveLength(2);
    expect(profile.emergencyContacts[0].name).toBe('Maria Silva');
    expect(profile.emergencyContacts[1].name).toBe('Pedro Silva');
  });

  it('should allow optional fields in UserProfile', () => {
    const profile: UserProfile = {
      id: '1',
      fullName: 'João Silva',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    expect(profile.dateOfBirth).toBeUndefined();
    expect(profile.allergies).toBeUndefined();
    expect(profile.phone).toBeUndefined();
  });

  it('should support different gender options', () => {
    const maleProfile: UserProfile = {
      id: '1',
      fullName: 'João',
      gender: 'male',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const femaleProfile: UserProfile = {
      id: '2',
      fullName: 'Maria',
      gender: 'female',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const otherProfile: UserProfile = {
      id: '3',
      fullName: 'Alex',
      gender: 'other',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    expect(maleProfile.gender).toBe('male');
    expect(femaleProfile.gender).toBe('female');
    expect(otherProfile.gender).toBe('other');
  });

  it('should validate emergency contact without email', () => {
    const contact: EmergencyContact = {
      id: '1',
      name: 'Maria Silva',
      relationship: 'Mãe',
      phone: '11988888888',
    };

    expect(contact.email).toBeUndefined();
    expect(contact.name).toBeDefined();
    expect(contact.phone).toBeDefined();
  });

  it('should track creation and update timestamps', () => {
    const now = Date.now();
    const profile: UserProfile = {
      id: '1',
      fullName: 'João Silva',
      emergencyContacts: [],
      createdAt: now,
      updatedAt: now,
    };

    expect(profile.createdAt).toBe(now);
    expect(profile.updatedAt).toBe(now);
    expect(profile.updatedAt).toBeGreaterThanOrEqual(profile.createdAt);
  });

  it('should handle address components', () => {
    const profile: UserProfile = {
      id: '1',
      fullName: 'João Silva',
      address: 'Rua A, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    expect(profile.address).toBe('Rua A, 123');
    expect(profile.city).toBe('São Paulo');
    expect(profile.state).toBe('SP');
    expect(profile.zipCode).toBe('01234-567');
  });

  it('should support medical information fields', () => {
    const profile: UserProfile = {
      id: '1',
      fullName: 'João Silva',
      bloodType: 'O+',
      allergies: 'Penicilina, Lactose',
      medicalConditions: 'Hipertensão, Diabetes',
      emergencyContacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    expect(profile.bloodType).toBe('O+');
    expect(profile.allergies).toContain('Penicilina');
    expect(profile.medicalConditions).toContain('Hipertensão');
  });
});
