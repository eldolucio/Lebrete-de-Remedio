import { ScrollView, Text, View, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMedications } from '@/lib/medication-context';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';
import { MedicationDose } from '@/lib/types';

type FilterType = 'all' | 'taken' | 'missed';

export default function HistoryScreen() {
  const colors = useColors();
  const { doses } = useMedications();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredDoses = useMemo(() => {
    let filtered = [...doses].sort((a, b) => b.scheduledTime - a.scheduledTime);

    if (filter === 'taken') {
      filtered = filtered.filter((d) => d.status === 'taken');
    } else if (filter === 'missed') {
      filtered = filtered.filter((d) => d.status === 'missed');
    }

    return filtered;
  }, [doses, filter]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const groupedDoses = useMemo(() => {
    const groups: Record<string, MedicationDose[]> = {};

    filteredDoses.forEach((dose) => {
      const date = formatDate(dose.scheduledTime);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(dose);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      doses: items,
    }));
  }, [filteredDoses]);

  const renderDoseItem = (dose: MedicationDose) => {
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

    return (
      <View key={dose.id} className="flex-row items-center justify-between bg-surface rounded-lg p-3 mb-2 border border-border">
        <View className="flex-1">
          <Text className="font-semibold text-foreground mb-1">{dose.medicationName}</Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="time-outline" size={14} color={colors.muted} />
            <Text className="text-xs text-muted">
              {formatTime(dose.scheduledTime)}
              {dose.takenAt && ` → ${formatTime(dose.takenAt)}`}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2 ml-2">
          <Ionicons name={config.icon} size={20} color={config.color} />
          <Text className="text-xs font-semibold" style={{ color: config.color }}>
            {config.label}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={groupedDoses}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold text-muted px-4 mb-2">{item.date}</Text>
            <View className="px-4">
              {item.doses.map((dose) => renderDoseItem(dose))}
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View className="px-4 pt-4 pb-2">
            <Text className="text-3xl font-bold text-foreground mb-4">Histórico</Text>

            {/* Filter Buttons */}
            <View className="flex-row gap-2 mb-4">
              {(['all', 'taken', 'missed'] as FilterType[]).map((f) => (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <View
                    className="px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor: filter === f ? colors.primary : colors.surface,
                      borderColor: filter === f ? colors.primary : colors.border,
                    }}
                  >
                    <Text
                      className="text-xs font-semibold"
                      style={{
                        color: filter === f ? 'white' : colors.foreground,
                      }}
                    >
                      {f === 'all' ? 'Todos' : f === 'taken' ? 'Tomados' : 'Perdidos'}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="px-4 py-12 items-center">
            <Ionicons name="document-outline" size={48} color={colors.muted} />
            <Text className="text-lg font-semibold text-foreground mt-4 mb-2">
              Nenhum registro
            </Text>
            <Text className="text-sm text-muted text-center">
              Seu histórico de medicamentos aparecerá aqui
            </Text>
          </View>
        }
        scrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
