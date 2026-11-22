import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

const firstDayOffset = 6;

const days = [
  ...Array(firstDayOffset).fill(null),
  ...Array.from({ length: 30 }, (_, index) => index + 1),
];

type Event = {
  id: string;
  title: string;
  subject: string;
  time: string;
  status: 'Próxima' | 'Pendiente';
};

const initialEvents: Record<number, Event[]> = {
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

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(24);

  const [calendarEvents, setCalendarEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newStatus, setNewStatus] =
    useState<'Próxima' | 'Pendiente'>('Pendiente');

  const selectedEvents = calendarEvents[selectedDay] ?? [];

  const eventDays = Object.keys(calendarEvents)
    .filter((day) => calendarEvents[Number(day)].length > 0)
    .map(Number);

  function openModal() {
    setNewTitle('');
    setNewSubject('');
    setNewTime('');
    setNewStatus('Pendiente');
    setModalVisible(true);
  }

  function addEvent() {
    if (!newTitle.trim() || !newSubject.trim() || !newTime.trim()) {
      Alert.alert('Campos incompletos', 'Completa todos los campos.');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subject: `Actividad · ${newSubject.trim()}`,
      time: newTime.trim(),
      status: newStatus,
    };

    setCalendarEvents((current) => ({
      ...current,
      [selectedDay]: [...(current[selectedDay] ?? []), newEvent],
    }));

    setNewTitle('');
    setNewSubject('');
    setNewTime('');
    setNewStatus('Pendiente');
    setModalVisible(false);

    Alert.alert(
      '¡Actividad agregada!',
      `Se agregó al ${selectedDay} de noviembre.`,
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            {days.map((day, index) => {
              if (day === null) {
                return (
                  <View
                    key={`empty-${index}`}
                    style={styles.dayCell}
                  />
                );
              }

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
                  <Text style={styles.eventTitle}>
                    {event.title}
                  </Text>
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
          onPress={openModal}
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>
            + Agregar actividad
          </Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Nueva actividad
            </Text>
            <Text style={styles.modalSubtitle}>
              {selectedDay} de noviembre de 2026
            </Text>

            <Text style={styles.label}>
              Nombre de la actividad
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Prueba de química"
              placeholderTextColor={colors.textSecondary}
              value={newTitle}
              onChangeText={setNewTitle}
              accessibilityLabel="Nombre de la actividad"
            />

            <Text style={styles.label}>Asignatura</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Química"
              placeholderTextColor={colors.textSecondary}
              value={newSubject}
              onChangeText={setNewSubject}
              accessibilityLabel="Asignatura"
            />

            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 14:30"
              placeholderTextColor={colors.textSecondary}
              value={newTime}
              onChangeText={setNewTime}
              keyboardType="numbers-and-punctuation"
              accessibilityLabel="Hora de la actividad"
            />

            <Text style={styles.label}>Estado</Text>

            <View style={styles.statusOptions}>
              {(['Próxima', 'Pendiente'] as const).map(
                (status) => (
                  <Pressable
                    key={status}
                    onPress={() => setNewStatus(status)}
                    style={[
                      styles.statusButton,
                      newStatus === status &&
                        styles.statusButtonActive,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: newStatus === status,
                    }}
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        newStatus === status &&
                          styles.statusButtonTextActive,
                      ]}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ),
              )}
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={addEvent}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                Guardar actividad
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
              accessibilityRole="button"
            >
              <Text style={styles.cancelButtonText}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.backgroundElement,
    borderRadius: 18,
    padding: 24,
  },
  modalTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 22,
    color: colors.text,
  },
  modalSubtitle: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  label: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.text,
    marginTop: 14,
    marginBottom: 7,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.background,
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.text,
  },
  statusOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.text,
  },
  statusButtonTextActive: {
    color: '#FFFFFF',
  },
  primaryButton: {
    minHeight: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  cancelButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 15,
    color: colors.textSecondary,
  },
});
