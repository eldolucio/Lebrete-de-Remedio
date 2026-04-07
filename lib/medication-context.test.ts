import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Medication, MedicationDose, MedicationSchedule } from './types';

describe('Medication Types and Utilities', () => {
  describe('Medication Interface', () => {
    it('should create a valid medication object', () => {
      const medication: Medication = {
        id: '1',
        name: 'Dipirona',
        dosage: '1 comprimido',
        schedules: [
          { id: '1', time: '08:00', notificationMinutesBefore: 30 },
          { id: '2', time: '20:00', notificationMinutesBefore: 30 },
        ],
        daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        notes: 'Tomar com água',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      expect(medication.name).toBe('Dipirona');
      expect(medication.dosage).toBe('1 comprimido');
      expect(medication.schedules).toHaveLength(2);
      expect(medication.daysOfWeek).toHaveLength(7);
    });

    it('should handle medication with optional notes', () => {
      const medication: Medication = {
        id: '1',
        name: 'Amoxicilina',
        dosage: '500mg',
        schedules: [{ id: '1', time: '08:00' }],
        daysOfWeek: ['monday', 'wednesday', 'friday'],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      expect(medication.notes).toBeUndefined();
    });
  });

  describe('MedicationDose Interface', () => {
    it('should create a pending dose', () => {
      const dose: MedicationDose = {
        id: 'dose-1',
        medicationId: 'med-1',
        medicationName: 'Dipirona',
        scheduledTime: Date.now(),
        status: 'pending',
      };

      expect(dose.status).toBe('pending');
      expect(dose.takenAt).toBeUndefined();
    });

    it('should create a taken dose with takenAt timestamp', () => {
      const now = Date.now();
      const dose: MedicationDose = {
        id: 'dose-1',
        medicationId: 'med-1',
        medicationName: 'Dipirona',
        scheduledTime: now - 3600000, // 1 hour ago
        takenAt: now,
        status: 'taken',
      };

      expect(dose.status).toBe('taken');
      expect(dose.takenAt).toBeDefined();
      expect(dose.takenAt).toBeGreaterThan(dose.scheduledTime);
    });

    it('should create a missed dose', () => {
      const dose: MedicationDose = {
        id: 'dose-1',
        medicationId: 'med-1',
        medicationName: 'Dipirona',
        scheduledTime: Date.now() - 86400000, // 1 day ago
        status: 'missed',
      };

      expect(dose.status).toBe('missed');
      expect(dose.takenAt).toBeUndefined();
    });
  });

  describe('MedicationSchedule Interface', () => {
    it('should create a schedule with time and notification', () => {
      const schedule: MedicationSchedule = {
        id: '1',
        time: '08:00',
        notificationMinutesBefore: 30,
      };

      expect(schedule.time).toBe('08:00');
      expect(schedule.notificationMinutesBefore).toBe(30);
    });

    it('should handle schedule without notification minutes', () => {
      const schedule: MedicationSchedule = {
        id: '1',
        time: '14:30',
      };

      expect(schedule.notificationMinutesBefore).toBeUndefined();
    });
  });

  describe('Dose Status Transitions', () => {
    it('should transition from pending to taken', () => {
      let dose: MedicationDose = {
        id: 'dose-1',
        medicationId: 'med-1',
        medicationName: 'Dipirona',
        scheduledTime: Date.now(),
        status: 'pending',
      };

      // Simulate marking as taken
      dose = {
        ...dose,
        takenAt: Date.now(),
        status: 'taken',
      };

      expect(dose.status).toBe('taken');
      expect(dose.takenAt).toBeDefined();
    });

    it('should transition from pending to missed', () => {
      let dose: MedicationDose = {
        id: 'dose-1',
        medicationId: 'med-1',
        medicationName: 'Dipirona',
        scheduledTime: Date.now() - 86400000,
        status: 'pending',
      };

      // Simulate marking as missed
      dose = {
        ...dose,
        status: 'missed',
      };

      expect(dose.status).toBe('missed');
      expect(dose.takenAt).toBeUndefined();
    });
  });

  describe('Multiple Schedules', () => {
    it('should handle medication with multiple daily schedules', () => {
      const schedules: MedicationSchedule[] = [
        { id: '1', time: '08:00', notificationMinutesBefore: 30 },
        { id: '2', time: '14:00', notificationMinutesBefore: 30 },
        { id: '3', time: '20:00', notificationMinutesBefore: 30 },
      ];

      expect(schedules).toHaveLength(3);
      expect(schedules[0].time).toBe('08:00');
      expect(schedules[1].time).toBe('14:00');
      expect(schedules[2].time).toBe('20:00');
    });

    it('should maintain schedule order', () => {
      const schedules: MedicationSchedule[] = [
        { id: '1', time: '08:00' },
        { id: '2', time: '14:00' },
        { id: '3', time: '20:00' },
      ];

      const times = schedules.map((s) => s.time);
      expect(times).toEqual(['08:00', '14:00', '20:00']);
    });
  });

  describe('Days of Week', () => {
    it('should support all days of week', () => {
      const allDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'> = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];

      const medication: Medication = {
        id: '1',
        name: 'Diário',
        dosage: '1',
        schedules: [{ id: '1', time: '08:00' }],
        daysOfWeek: allDays,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      expect(medication.daysOfWeek).toHaveLength(7);
      expect(medication.daysOfWeek).toContain('monday');
      expect(medication.daysOfWeek).toContain('sunday');
    });

    it('should support partial week schedule', () => {
      const workDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

      const medication: Medication = {
        id: '1',
        name: 'Trabalho',
        dosage: '1',
        schedules: [{ id: '1', time: '09:00' }],
        daysOfWeek: workDays,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      expect(medication.daysOfWeek).toHaveLength(5);
      expect(medication.daysOfWeek).not.toContain('saturday');
      expect(medication.daysOfWeek).not.toContain('sunday');
    });
  });
});
