import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

const days = Array.from({ length: 30 }, (_, index) => index + 1);

type Event = {
  id: string;
  title: string;
  subject: string;
  time: string;
  status: 'Próxima' | 'Pendiente';
};

const events: Record<number, Event[]> = {
  24: [
    {
      id: '1',
      title: 'Informe de Biología',
      subject: 'Entrega · Biología',
      time: '10:00',
      status: 'Próxima',
    },
    {
      id: '2',
      title: 'Clase de Historia',
      subject: 'Clase · Historia',
      time: '14:00',
      status: 'Próxima',
    },
  ],
  25: [
    {
      id: '3',
      title: 'Ejercicios de Álgebra',
      subject: 'Entrega · Matemáticas',
      time: '18:00',
      status: 'Pendiente',
    },
  ],
  26: [
    {
      id: '4',
      title: 'Prueba de Matemáticas',
      subject: 'Evaluación · Matemáticas',
      time: '08:30',
      status: 'Pendiente',
    },
  ],
  27: [
    {
      id: '5',
      title: 'Lectura capítulo 3',
      subject: 'Entrega · Historia',
      time: '12:00',
      status: 'Próxima',
    },
  ],
};

const eventDays = [24, 25, 26, 27];

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(24);

  const selectedEvents = events[selectedDay] ?? [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mi calendario</Text>
          <Text style={styles.subtitle}>
            Visualiza tus actividades y fechas importantes.
          </Text>
        </View>

        <View style={styles.calendarCard}>
          <Text style={styles.monthTitle}>Noviembre 2026</Text>

          <View style={styles.weekRow}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(
              (day, index) => (
                <Text key={index} style={styles.weekLabel}>
                  {day}
                </Text>
              ),
            )}
          </View>

          <View style={styles.daysGrid}>
            {days.map((day) => {
              const isSelected = selectedDay === day;
              const hasEvent = eventDays.includes(day);

              return (
                <Pressable
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  accessibilityRole="button"
                  accessibilityLabel={`Día ${day}`}
                  accessibilityState={{ selected: isSelected }}
                  style={[
                    styles.dayCell,
                    isSelected && styles.selectedDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>

                  {hasEvent && (
                    <View
                      style={[
                        styles.dot,
                        isSelected && styles.selectedDot,
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Actividades del {selectedDay} de noviembre
          </Text>

          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventMetadata}>
                    {event.subject}
                  </Text>
                  <Text style={styles.eventMetadata}>
                    {event.time}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    event.status === 'Próxima'
                      ? styles.upcomingBadge
                      : styles.pendingBadge,
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {event.status}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No hay actividades para este día.
              </Text>
            </View>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
          ]}
          onPress={() => alert('Próximamente: agregar actividad')}
        >
          <Text style={styles.addButtonText}>+ Agregar actividad</Text>
        </Pressable>
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
  title: {
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
  calendarCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  monthTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
  },
  weekLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2857%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 3,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontFamily: 'Fredoka',
    fontSize: 15,
    color: colors.text,
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontFamily: 'FredokaSemiBold',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  selectedDot: {
    backgroundColor: '#FFFFFF',
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    lineHeight: 26,
    color: colors.text,
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
    paddingVertical: 6,
    borderRadius: 100,
  },
  upcomingBadge: {
    backgroundColor: colors.upcomingBackground,
  },
  pendingBadge: {
    backgroundColor: colors.pendingBackground,
  },
  badgeText: {
    fontFamily: 'FredokaMedium',
    fontSize: 12,
    color: colors.text,
  },
  emptyCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  addButton: {
    minHeight: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.7,
  },
});
