import { ScrollView, Text, View, Pressable, Alert, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useMedications } from '@/lib/medication-context';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function MedicationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { medications, deleteMedication, updateMedication } = useMedications();
  const colors = useColors();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDosage, setEditedDosage] = useState('');
  const [editedNotes, setEditedNotes] = useState('');

  const medication = medications.find((m) => m.id === id);

  if (!medication) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <Text className="text-foreground text-lg">Medicamento não encontrado</Text>
      </ScreenContainer>
    );
  }

  if (!isEditing) {
    setEditedName(medication.name);
    setEditedDosage(medication.dosage);
    setEditedNotes(medication.notes || '');
  }

  const handleDelete = () => {
    Alert.alert(
      'Deletar Medicamento',
      `Tem certeza que deseja deletar "${medication.name}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Deletar',
          onPress: async () => {
            await deleteMedication(medication.id);
            router.back();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleSave = async () => {
    if (!editedName.trim()) {
      Alert.alert('Erro', 'O nome do medicamento é obrigatório');
      return;
    }

    await updateMedication(medication.id, {
      name: editedName.trim(),
      dosage: editedDosage.trim(),
      notes: editedNotes.trim() || undefined,
      updatedAt: Date.now(),
    });

    setIsEditing(false);
  };

  const daysLabel = medication.daysOfWeek
    .map((day) => {
      const dayLabels: Record<string, string> = {
        monday: 'Seg',
        tuesday: 'Ter',
        wednesday: 'Qua',
        thursday: 'Qui',
        friday: 'Sex',
        saturday: 'Sab',
        sunday: 'Dom',
      };
      return dayLabels[day];
    })
    .join(', ');

  const schedulesLabel = medication.schedules
    .map((s) => `${s.time}${s.notificationMinutesBefore ? ` (-${s.notificationMinutesBefore}min)` : ''}`)
    .join(', ');

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </Pressable>
          <Text className="text-2xl font-bold text-foreground flex-1 ml-3">Detalhes</Text>
          <Pressable
            onPress={() => setIsEditing(!isEditing)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons
              name={isEditing ? 'close' : 'pencil'}
              size={24}
              color={colors.primary}
            />
          </Pressable>
        </View>

        {/* Medicamento Name */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Nome do Medicamento</Text>
          {isEditing ? (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground text-lg">{editedName}</Text>
            </View>
          ) : (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground text-lg font-semibold">{medication.name}</Text>
            </View>
          )}
        </View>

        {/* Dosage */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Dosagem</Text>
          {isEditing ? (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground">{editedDosage}</Text>
            </View>
          ) : (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground">{medication.dosage}</Text>
            </View>
          )}
        </View>

        {/* Schedules */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Horários</Text>
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-foreground">{schedulesLabel}</Text>
          </View>
        </View>

        {/* Days of Week */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Dias da Semana</Text>
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-foreground">{daysLabel}</Text>
          </View>
        </View>

        {/* Notes */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Observações</Text>
          {isEditing ? (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground">{editedNotes || 'Nenhuma observação'}</Text>
            </View>
          ) : (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground">{medication.notes || 'Nenhuma observação'}</Text>
            </View>
          )}
        </View>

        {/* Created Date */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-2">Criado em</Text>
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-foreground text-sm">
              {new Date(medication.createdAt).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing ? (
          <View className="gap-3 mt-6">
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                },
              ]}
            >
              <Text className="text-center text-white font-semibold">Salvar Alterações</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsEditing(false)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  opacity: pressed ? 0.8 : 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                },
              ]}
            >
              <Text className="text-center text-foreground font-semibold">Cancelar</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              {
                backgroundColor: colors.error,
                opacity: pressed ? 0.8 : 1,
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 24,
              },
            ]}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons name="trash" size={20} color="white" />
              <Text className="text-center text-white font-semibold">Deletar Medicamento</Text>
            </View>
          </Pressable>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
