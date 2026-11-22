import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

function StatusBadge({
  label,
  background,
  color = colors.text,
}: {
  label: string;
  background: string;
  color?: string;
}) {
  return (
    <View style={[styles.badge, { backgroundColor: background }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

function Shortcut({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.shortcut,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.shortcutIcon}>{icon}</Text>
      <Text style={styles.shortcutText}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

function EventCard({
  title,
  subject,
  details,
  status,
  background,
  statusColor,
}: {
  title: string;
  subject: string;
  details: string;
  status: string;
  background: string;
  statusColor?: string;
}) {
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventMetadata}>{subject}</Text>
        <Text style={styles.eventMetadata}>{details}</Text>
      </View>

      <StatusBadge
        label={status}
        background={background}
        color={statusColor}
      />
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado y perfil */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>¡Hola, estudiante!</Text>
              <Text style={styles.subtitle}>
                Organiza tu semana universitaria.
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.profileButton,
                pressed && styles.pressed,
              ]}
              onPress={() => router.push('/perfil')}
              accessibilityLabel="Mi perfil"
              accessibilityRole="button"
            >
              <Text style={styles.profileIcon}>♙</Text>
            </Pressable>
          </View>
        </View>

        {/* Resumen semanal */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Resumen de tu semana
          </Text>

          <View style={styles.summaryNumbers}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>
                Tareas pendientes
              </Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>2</Text>
              <Text style={styles.summaryLabel}>
                Evaluaciones próximas
              </Text>
            </View>
          </View>
        </View>

        {/* Accesos directos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accesos directos</Text>

          <View style={styles.shortcutsRow}>
            <Shortcut
              icon="✓"
              title="Mis tareas"
              onPress={() => router.push('/tareas')}
            />

            <Shortcut
              icon="▦"
              title="Calendario"
              onPress={() => router.push('/calendario')}
            />
          </View>
        </View>

        {/* Próximos eventos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos eventos</Text>

          <View style={styles.eventsList}>
            <EventCard
              title="Informe de Biología"
              subject="Biología · Entrega"
              details="24 nov · 10:00"
              status="Próxima"
              background={colors.upcomingBackground}
            />

            <EventCard
              title="Prueba de Matemáticas"
              subject="Matemáticas · Evaluación"
              details="26 nov · 08:30"
              status="Pendiente"
              background={colors.pendingBackground}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 24,
  },
  header: {
    gap: 6,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  greeting: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.upcomingBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileIcon: {
    fontSize: 27,
    color: colors.primary,
  },
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  summaryTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  summaryNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    gap: 4,
  },
  summaryNumber: {
    fontFamily: 'FredokaBold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: '#FFFFFF',
  },
  summaryDivider: {
    width: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    opacity: 0.45,
    marginHorizontal: 12,
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 20,
    color: colors.text,
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  shortcut: {
    flex: 1,
    minHeight: 76,
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shortcutIcon: {
    fontSize: 22,
    color: colors.primary,
  },
  shortcutText: {
    flex: 1,
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.text,
  },
  arrow: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  eventsList: {
    gap: 12,
  },
  eventCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  eventContent: {
    gap: 4,
  },
  eventTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: colors.text,
  },
  eventMetadata: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: 'FredokaMedium',
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
