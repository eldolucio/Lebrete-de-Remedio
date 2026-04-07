import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';
import { MedicationDose } from '@/lib/types';
import * as Haptics from 'expo-haptics';

interface MedicationCardProps {
  dose: MedicationDose;
  onPress: () => void;
  onMarkTaken: () => void;
}

export function MedicationCard({ dose, onPress, onMarkTaken }: MedicationCardProps) {
  const colors = useColors();

  const scheduledDate = new Date(dose.scheduledTime);
  const timeString = scheduledDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const statusConfig = {
    pending: {
      color: colors.warning,
      label: 'Pendente',
      icon: 'time-outline' as const,
    },
    taken: {
      color: colors.success,
      label: 'Tomado',
      icon: 'checkmark-circle' as const,
    },
    missed: {
      color: colors.error,
      label: 'Perdido',
      icon: 'close-circle' as const,
    },
  };

  const config = statusConfig[dose.status];

  const handleMarkTaken = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onMarkTaken();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-lg p-4 mb-3 border border-border flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-foreground mb-1">
            {dose.medicationName}
          </Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="time-outline" size={16} color={colors.muted} />
            <Text className="text-sm text-muted">{timeString}</Text>
            <View
              className="w-2 h-2 rounded-full ml-2"
              style={{ backgroundColor: config.color }}
            />
            <Text className="text-xs font-medium" style={{ color: config.color }}>
              {config.label}
            </Text>
          </View>
        </View>

        {dose.status === 'pending' && (
          <Pressable
            onPress={handleMarkTaken}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.success }}
            >
              <Ionicons name="checkmark" size={24} color="white" />
            </View>
          </Pressable>
        )}

        {dose.status === 'taken' && (
          <View
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.success }}
          >
            <Ionicons name="checkmark-circle" size={28} color="white" />
          </View>
        )}

        {dose.status === 'missed' && (
          <View
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.error }}
          >
            <Ionicons name="close-circle" size={28} color="white" />
          </View>
        )}
      </View>
    </Pressable>
  );
}
