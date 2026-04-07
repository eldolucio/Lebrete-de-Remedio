import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Medication, MedicationDose, AppSettings, DayOfWeek } from './types';

interface MedicationContextType {
  medications: Medication[];
  doses: MedicationDose[];
  settings: AppSettings;
  addMedication: (medication: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateMedication: (id: string, medication: Partial<Medication>) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  markDoseTaken: (doseId: string) => Promise<void>;
  markDoseMissed: (doseId: string) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  getTodaysMedications: () => Medication[];
  getTodaysDoses: () => MedicationDose[];
  generateDosesForDay: (date: Date) => Promise<void>;
  isLoading: boolean;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

const STORAGE_KEYS = {
  medications: 'medications',
  doses: 'doses',
  settings: 'settings',
};

const DEFAULT_SETTINGS: AppSettings = {
  notificationsEnabled: true,
  notificationMinutesBefore: 30,
  theme: 'auto',
};

export function MedicationProvider({ children }: { children: React.ReactNode }) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [doses, setDoses] = useState<MedicationDose[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [medData, dosesData, settingsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.medications),
        AsyncStorage.getItem(STORAGE_KEYS.doses),
        AsyncStorage.getItem(STORAGE_KEYS.settings),
      ]);

      if (medData) setMedications(JSON.parse(medData));
      if (dosesData) setDoses(JSON.parse(dosesData));
      if (settingsData) setSettings(JSON.parse(settingsData));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMedications = async (meds: Medication[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.medications, JSON.stringify(meds));
      setMedications(meds);
    } catch (error) {
      console.error('Error saving medications:', error);
    }
  };

  const saveDoses = async (d: MedicationDose[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.doses, JSON.stringify(d));
      setDoses(d);
    } catch (error) {
      console.error('Error saving doses:', error);
    }
  };

  const addMedication = useCallback(
    async (medication: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => {
      const id = Date.now().toString();
      const newMedication: Medication = {
        ...medication,
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const updated = [...medications, newMedication];
      await saveMedications(updated);

      // Generate doses for the next 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        await generateDosesForMedicationAndDay(newMedication, date);
      }
    },
    [medications]
  );

  const updateMedication = useCallback(
    async (id: string, updates: Partial<Medication>) => {
      const updated = medications.map((med) =>
        med.id === id ? { ...med, ...updates, updatedAt: Date.now() } : med
      );
      await saveMedications(updated);
    },
    [medications]
  );

  const deleteMedication = useCallback(
    async (id: string) => {
      const updated = medications.filter((med) => med.id !== id);
      await saveMedications(updated);

      // Remove doses for this medication
      const updatedDoses = doses.filter((dose) => dose.medicationId !== id);
      await saveDoses(updatedDoses);
    },
    [medications, doses]
  );

  const markDoseTaken = useCallback(
    async (doseId: string) => {
      const updated = doses.map((dose) =>
        dose.id === doseId ? { ...dose, takenAt: Date.now(), status: 'taken' as const } : dose
      );
      await saveDoses(updated);
    },
    [doses]
  );

  const markDoseMissed = useCallback(
    async (doseId: string) => {
      const updated = doses.map((dose) =>
        dose.id === doseId ? { ...dose, status: 'missed' as const } : dose
      );
      await saveDoses(updated);
    },
    [doses]
  );

  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(updated));
      setSettings(updated);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  const getTodaysMedications = useCallback(() => {
    const today = new Date();
    const dayIndex = today.getDay();
    const dayMap: Record<number, DayOfWeek> = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
    };
    const todayDay = dayMap[dayIndex];

    return medications.filter((med) => med.daysOfWeek.includes(todayDay));
  }, [medications]);

  const getTodaysDoses = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return doses.filter(
      (dose) => dose.scheduledTime >= today.getTime() && dose.scheduledTime < tomorrow.getTime()
    );
  }, [doses]);

  const generateDosesForMedicationAndDay = async (medication: Medication, date: Date) => {
    const dayIndex = date.getDay();
    const dayMap: Record<number, DayOfWeek> = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
    };
    const dayOfWeek = dayMap[dayIndex];

    if (!medication.daysOfWeek.includes(dayOfWeek)) {
      return;
    }

    for (const schedule of medication.schedules) {
      const [hours, minutes] = schedule.time.split(':').map(Number);
      const doseDate = new Date(date);
      doseDate.setHours(hours, minutes, 0, 0);

      const doseId = `${medication.id}-${doseDate.getTime()}`;
      const existingDose = doses.find((d) => d.id === doseId);

      if (!existingDose) {
        const newDose: MedicationDose = {
          id: doseId,
          medicationId: medication.id,
          medicationName: medication.name,
          scheduledTime: doseDate.getTime(),
          status: 'pending',
        };
        setDoses((prev) => [...prev, newDose]);
      }
    }
  };

  const generateDosesForDay = useCallback(
    async (date: Date) => {
      for (const medication of medications) {
        await generateDosesForMedicationAndDay(medication, date);
      }
    },
    [medications, doses]
  );

  const value: MedicationContextType = {
    medications,
    doses,
    settings,
    addMedication,
    updateMedication,
    deleteMedication,
    markDoseTaken,
    markDoseMissed,
    updateSettings,
    getTodaysMedications,
    getTodaysDoses,
    generateDosesForDay,
    isLoading,
  };

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedications() {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedications must be used within MedicationProvider');
  }
  return context;
}
