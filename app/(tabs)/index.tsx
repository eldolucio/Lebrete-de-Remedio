import { ScrollView, Text, View, Pressable, RefreshControl, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMedications } from '@/lib/medication-context';
import { MedicationCard } from '@/components/medication-card';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';
import { useNotifications } from '@/hooks/use-notifications';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { getTodaysDoses, markDoseTaken, generateDosesForDay, isLoading, scheduleDoseNotifications } = useMedications();
  const [refreshing, setRefreshing] = useState(false);
  const [doses, setDoses] = useState(getTodaysDoses());
  useNotifications();

  useEffect(() => {
    // Generate doses for today if needed
    generateDosesForDay(new Date());
    updateDoses();
  }, []);

  useEffect(() => {
    // Schedule notifications when doses change
    if (doses.length > 0) {
      scheduleDoseNotifications();
    }
  }, [doses, scheduleDoseNotifications]);

  const updateDoses = () => {
    setDoses(getTodaysDoses());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await generateDosesForDay(new Date());
    updateDoses();
    setRefreshing(false);
  };

  const handleMarkTaken = async (doseId: string) => {
    await markDoseTaken(doseId);
    updateDoses();
  };

  const handleAddMedication = () => {
    router.push('/(tabs)/add-medication' as any);
  };

  const now = new Date();
  const dateString = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const pendingCount = doses.filter((d) => d.status === 'pending').length;
  const takenCount = doses.filter((d) => d.status === 'taken').length;

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={doses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationCard
            dose={item}
            onPress={() => {
              // Navigate to dose details if needed
            }}
            onMarkTaken={() => handleMarkTaken(item.id)}
          />
        )}
        ListHeaderComponent={
          <View className="px-4 pt-4 pb-2">
            <Text className="text-3xl font-bold text-foreground mb-1">Medicamentos</Text>
            <Text className="text-sm text-muted capitalize mb-4">{dateString}</Text>

            {doses.length > 0 && (
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1 bg-surface rounded-lg p-3 border border-border">
                  <Text className="text-xs text-muted mb-1">Pendentes</Text>
                  <Text className="text-2xl font-bold text-foreground">{pendingCount}</Text>
                </View>
                <View className="flex-1 bg-surface rounded-lg p-3 border border-border">
                  <Text className="text-xs text-muted mb-1">Tomados</Text>
                  <Text className="text-2xl font-bold" style={{ color: colors.success }}>
                    {takenCount}
                  </Text>
                </View>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <View className="px-4 py-12 items-center">
            <Ionicons name="calendar-outline" size={48} color={colors.muted} />
            <Text className="text-lg font-semibold text-foreground mt-4 mb-2">
              Nenhum medicamento hoje
            </Text>
            <Text className="text-sm text-muted text-center">
              Adicione medicamentos para começar a receber lembretes
            </Text>
          </View>
        }
        scrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />

      {/* Floating Action Button */}
      <Pressable
        onPress={handleAddMedication}
        style={({ pressed }) => [
          {
            position: 'absolute',
            bottom: 80,
            right: 16,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <View
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <Ionicons name="add" size={28} color="white" />
        </View>
      </Pressable>
    </ScreenContainer>
  );
}
