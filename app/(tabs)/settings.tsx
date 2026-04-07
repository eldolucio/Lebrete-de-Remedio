import { ScrollView, Text, View, Pressable, Switch } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMedications } from '@/lib/medication-context';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '@/lib/theme-provider';

export default function SettingsScreen() {
  const colors = useColors();
  const { settings, updateSettings } = useMedications();
  const { colorScheme, setColorScheme } = useThemeContext();

  const handleNotificationsToggle = async (value: boolean) => {
    await updateSettings({ notificationsEnabled: value });
  };

  const handleThemeChange = async () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  };

  const themeLabel = colorScheme === 'dark' ? 'Escuro' : colorScheme === 'light' ? 'Claro' : 'Automático';

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text className="text-3xl font-bold text-foreground mb-6">Configurações</Text>

        {/* Notifications Section */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-3">Notificações</Text>

          <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="font-semibold text-foreground mb-1">Ativar Notificações</Text>
              <Text className="text-xs text-muted">
                Receba lembretes nos horários programados
              </Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          {settings.notificationsEnabled && (
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="font-semibold text-foreground mb-2">
                Notificação com antecedência
              </Text>
              <Text className="text-sm text-muted mb-3">
                {settings.notificationMinutesBefore} minutos antes
              </Text>

              <View className="flex-row gap-2">
                {[15, 30, 60].map((minutes) => (
                  <Pressable
                    key={minutes}
                    onPress={() =>
                      updateSettings({ notificationMinutesBefore: minutes })
                    }
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <View
                      className="flex-1 py-2 px-3 rounded-lg border items-center"
                      style={{
                        backgroundColor:
                          settings.notificationMinutesBefore === minutes
                            ? colors.primary
                            : colors.surface,
                        borderColor:
                          settings.notificationMinutesBefore === minutes
                            ? colors.primary
                            : colors.border,
                      }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{
                          color:
                            settings.notificationMinutesBefore === minutes
                              ? 'white'
                              : colors.foreground,
                        }}
                      >
                        {minutes}m
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Appearance Section */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted uppercase mb-3">Aparência</Text>

          <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons
                name={colorScheme === 'dark' ? 'moon' : colorScheme === 'light' ? 'sunny' : 'phone-portrait'}
                size={24}
                color={colors.primary}
              />
              <View>
                <Text className="font-semibold text-foreground">Tema</Text>
                <Text className="text-xs text-muted">{themeLabel}</Text>
              </View>
            </View>
            <Pressable
              onPress={handleThemeChange}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="chevron-forward" size={24} color={colors.muted} />
            </Pressable>
          </View>
        </View>

        {/* About Section */}
        <View>
          <Text className="text-sm font-semibold text-muted uppercase mb-3">Sobre</Text>

          <View className="bg-surface rounded-lg p-4 border border-border">
            <View className="mb-4 pb-4 border-b border-border">
              <Text className="text-sm text-muted mb-1">Aplicativo</Text>
              <Text className="font-semibold text-foreground">Lembrete de Remédio</Text>
            </View>

            <View className="mb-4 pb-4 border-b border-border">
              <Text className="text-sm text-muted mb-1">Versão</Text>
              <Text className="font-semibold text-foreground">1.0.0</Text>
            </View>

            <View>
              <Text className="text-sm text-muted mb-1">Descrição</Text>
              <Text className="text-xs text-muted leading-relaxed">
                Um aplicativo simples e eficaz para ajudá-lo a lembrar de tomar seus medicamentos
                nos horários corretos. Mantenha sua saúde em dia com lembretes automáticos e
                histórico de doses.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-8 pt-6 border-t border-border items-center">
          <Text className="text-xs text-muted">
            Feito com ❤️ para sua saúde
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
