import { ScrollView, Text, View, Pressable, TextInput, Switch } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMedications } from '@/lib/medication-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';
import { DayOfWeek, DAYS_OF_WEEK, DAY_LABELS, MedicationSchedule } from '@/lib/types';
import * as Haptics from 'expo-haptics';

export default function AddMedicationScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addMedication } = useMedications();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [notes, setNotes] = useState('');
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([
    { id: '1', time: '08:00', notificationMinutesBefore: 30 },
  ]);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
  const [loading, setLoading] = useState(false);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addSchedule = () => {
    const newId = (Math.max(...schedules.map((s) => parseInt(s.id)), 0) + 1).toString();
    setSchedules([...schedules, { id: newId, time: '12:00', notificationMinutesBefore: 30 }]);
  };

  const removeSchedule = (id: string) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
  };

  const updateScheduleTime = (id: string, time: string) => {
    setSchedules(schedules.map((s) => (s.id === id ? { ...s, time } : s)));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Por favor, preencha o nome do medicamento');
      return;
    }

    if (selectedDays.length === 0) {
      alert('Por favor, selecione pelo menos um dia da semana');
      return;
    }

    setLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await addMedication({
        name: name.trim(),
        dosage: dosage.trim() || '1 comprimido',
        schedules,
        daysOfWeek: selectedDays,
        notes: notes.trim(),
      });
      router.back();
    } catch (error) {
      console.error('Error adding medication:', error);
      alert('Erro ao adicionar medicamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">Novo Medicamento</Text>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.foreground} />
          </Pressable>
        </View>

        {/* Name Input */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-foreground mb-2">Nome do Medicamento *</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            placeholder="Ex: Dipirona, Amoxicilina"
            placeholderTextColor={colors.muted}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Dosage Input */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-foreground mb-2">Dosagem</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            placeholder="Ex: 1 comprimido, 5ml, 1 cápsula"
            placeholderTextColor={colors.muted}
            value={dosage}
            onChangeText={setDosage}
          />
        </View>

        {/* Schedules */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-semibold text-foreground">Horários</Text>
            <Pressable onPress={addSchedule}>
              <View className="flex-row items-center gap-1">
                <Ionicons name="add-circle" size={20} color={colors.primary} />
                <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                  Adicionar
                </Text>
              </View>
            </Pressable>
          </View>

          {schedules.map((schedule, index) => (
            <View key={schedule.id} className="flex-row items-center gap-2 mb-2">
              <TextInput
                className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-foreground text-center"
                placeholder="HH:mm"
                placeholderTextColor={colors.muted}
                value={schedule.time}
                onChangeText={(time) => updateScheduleTime(schedule.id, time)}
                maxLength={5}
              />
              {schedules.length > 1 && (
                <Pressable onPress={() => removeSchedule(schedule.id)}>
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </Pressable>
              )}
            </View>
          ))}
        </View>

        {/* Days of Week */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-foreground mb-2">Dias da Semana *</Text>
          <View className="flex-row flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => (
              <Pressable
                key={day}
                onPress={() => toggleDay(day)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: selectedDays.includes(day) ? colors.primary : colors.surface,
                    borderColor: selectedDays.includes(day) ? colors.primary : colors.border,
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{
                      color: selectedDays.includes(day) ? 'white' : colors.foreground,
                    }}
                  >
                    {DAY_LABELS[day].substring(0, 3)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-2">Observações (opcional)</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            placeholder="Ex: Tomar com alimento, efeitos colaterais, etc."
            placeholderTextColor={colors.muted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            className="flex-1"
          >
            <View className="bg-surface border border-border rounded-lg py-3 items-center">
              <Text className="text-foreground font-semibold">Cancelar</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={handleSave}
            disabled={loading}
            style={({ pressed }) => [
              {
                opacity: pressed || loading ? 0.7 : 1,
              },
            ]}
            className="flex-1"
          >
            <View
              className="rounded-lg py-3 items-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white font-semibold">
                {loading ? 'Salvando...' : 'Salvar'}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
