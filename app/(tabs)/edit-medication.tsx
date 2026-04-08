import { ScrollView, Text, View, Pressable, TextInput, Alert, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useMedications } from '@/lib/medication-context';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Medication, DayOfWeek } from '@/lib/types';

const DAYS_OF_WEEK: { label: string; value: DayOfWeek }[] = [
  { label: 'Segunda', value: 'monday' },
  { label: 'Terça', value: 'tuesday' },
  { label: 'Quarta', value: 'wednesday' },
  { label: 'Quinta', value: 'thursday' },
  { label: 'Sexta', value: 'friday' },
  { label: 'Sábado', value: 'saturday' },
  { label: 'Domingo', value: 'sunday' },
];

export default function EditMedicationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { medications, updateMedication } = useMedications();
  const colors = useColors();

  const medication = medications.find((m) => m.id === id);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    if (medication) {
      setName(medication.name);
      setDosage(medication.dosage);
      setNotes(medication.notes || '');
      setSelectedDays(medication.daysOfWeek);
      setTimes(medication.schedules.map((s) => s.time));
    }
  }, [medication]);

  if (!medication) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <Text className="text-foreground text-lg">Medicamento não encontrado</Text>
      </ScreenContainer>
    );
  }

  const handleToggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAddTime = () => {
    setTimes([...times, '08:00']);
  };

  const handleRemoveTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  const handleUpdateTime = (index: number, value: string) => {
    const updated = [...times];
    updated[index] = value;
    setTimes(updated);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome do medicamento é obrigatório');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos um dia da semana');
      return;
    }

    if (times.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um horário');
      return;
    }

    const updatedMedication: Partial<Medication> = {
      name: name.trim(),
      dosage: dosage.trim(),
      notes: notes.trim() || undefined,
      daysOfWeek: selectedDays,
      schedules: times.map((time, index) => ({
        id: `schedule-${index}`,
        time,
        notificationMinutesBefore: 30,
      })),
      updatedAt: Date.now(),
    };

    await updateMedication(medication.id, updatedMedication);
    Alert.alert('Sucesso', 'Medicamento atualizado com sucesso!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </Pressable>
          <Text className="text-2xl font-bold text-foreground ml-3">Editar Medicamento</Text>
        </View>

        {/* Name */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Nome do Medicamento</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg p-4 text-foreground"
            placeholder="Ex: Dipirona"
            placeholderTextColor={colors.muted}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Dosage */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Dosagem</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg p-4 text-foreground"
            placeholder="Ex: 1 comprimido"
            placeholderTextColor={colors.muted}
            value={dosage}
            onChangeText={setDosage}
          />
        </View>

        {/* Days of Week */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Dias da Semana</Text>
          <View className="gap-2">
            {DAYS_OF_WEEK.map((day) => (
              <Pressable
                key={day.value}
                onPress={() => handleToggleDay(day.value)}
                style={({ pressed }) => [
                  {
                    backgroundColor: selectedDays.includes(day.value)
                      ? colors.primary
                      : colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    padding: 12,
                    borderRadius: 8,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text
                  className={
                    selectedDays.includes(day.value)
                      ? 'text-white font-semibold'
                      : 'text-foreground font-semibold'
                  }
                >
                  {day.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Times */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Horários</Text>
          <View className="gap-3">
            {times.map((time, index) => (
              <View key={index} className="flex-row items-center gap-3">
                <TextInput
                  className="flex-1 bg-surface border border-border rounded-lg p-3 text-foreground"
                  placeholder="HH:MM"
                  placeholderTextColor={colors.muted}
                  value={time}
                  onChangeText={(value) => handleUpdateTime(index, value)}
                />
                <Pressable
                  onPress={() => handleRemoveTime(index)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                >
                  <Ionicons name="trash" size={24} color={colors.error} />
                </Pressable>
              </View>
            ))}
            <Pressable
              onPress={handleAddTime}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  padding: 12,
                  borderRadius: 8,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-center gap-2">
                <Ionicons name="add" size={24} color={colors.primary} />
                <Text className="text-primary font-semibold">Adicionar Horário</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Notes */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Observações (Opcional)</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg p-4 text-foreground"
            placeholder="Ex: Tomar com água"
            placeholderTextColor={colors.muted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
              paddingVertical: 14,
              borderRadius: 8,
              marginTop: 24,
            },
          ]}
        >
          <Text className="text-center text-white font-bold text-lg">Salvar Alterações</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
