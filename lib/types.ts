/**
 * Tipos e interfaces para o aplicativo de lembrete de remédios
 */

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedules: MedicationSchedule[];
  daysOfWeek: DayOfWeek[];
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MedicationSchedule {
  id: string;
  time: string; // HH:mm format
  notificationMinutesBefore?: number;
}

export interface MedicationDose {
  id: string;
  medicationId: string;
  medicationName: string;
  scheduledTime: number; // timestamp
  takenAt?: number; // timestamp when actually taken
  status: 'pending' | 'taken' | 'missed';
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export interface AppSettings {
  notificationsEnabled: boolean;
  notificationMinutesBefore: number;
  theme: 'light' | 'dark' | 'auto';
}
