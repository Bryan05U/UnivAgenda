import { useEffect, useState } from 'react';
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
import { loadData, saveData, StorageKeys } from '@/storage/appStorage';

const colors = Colors.light;

type EventStatus = 'Próxima' | 'Pendiente' | 'Completada';

type CalendarEvent = {
  id: string;
  title: string;
  subject: string;
  time: string;
  status: EventStatus;
};

type CalendarEvents = Record<number, CalendarEvent[]>;

const initialEvents: CalendarEvents = {
  24: [
    {
      id: '1',
      title: 'Informe de Biología',
      subject: 'Actividad · Biología',
      time: '10:00',
      status: 'Pendiente',
    },
  ],
  26: [
    {
      id: '2',
      title: 'Prueba de Matemáticas',
      subject: 'Evaluación · Matemáticas',
      time: '08:30',
      status: 'Próxima',
    },
  ],
  27: [
    {
      id: '3',
      title: 'Lectura capítulo 3',
      subject: 'Actividad · Historia',
      time: '14:00',
      status: 'Completada',
    },
  ],
};

const monthName = 'Noviembre';
const year = 2026;
const firstDayOffset = 6;

const days = [
  ...Array(firstDayOffset).fill(null),
  ...Array.from({ length: 30 }, (_, index) => index + 1),
];

const weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(24);
  const [calendarEvents, setCalendarEvents] =
    useState<CalendarEvents>(initialEvents);
  const [loaded, setLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newStatus, setNewStatus] =
    useState<EventStatus>('Pendiente');

  useEffect(() => {
    async function loadEvents() {
      const storedEvents = await loadData<CalendarEvents>(
        StorageKeys.calendarEvents,
        initialEvents,
      );

      setCalendarEvents(storedEvents);
      setLoaded(true);
    }

    loadEvents();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveData(StorageKeys.calendarEvents, calendarEvents);
    }
  }, [calendarEvents, loaded]);

  const selectedEvents = calendarEvents[selectedDay] ?? [];

  const eventDays = Object.keys(calendarEvents)
    .filter((day) => (calendarEvents[Number(day)] ?? []).length > 0)
    .map(Number);

  const totalEvents = Object.values(calendarEvents).reduce(
    (total, events) => total + events.length,
    0,
  );

  function openModal() {
    setNewTitle('');
    setNewSubject('');
    setNewTime('');
    setNewStatus('Pendiente');
    setModalVisible(true);
  }

  function addEvent() {
    if (
      !newTitle.trim() ||
      !newSubject.trim() ||
      !newTime.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completa el título, la asignatura y la hora.',
      );
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subject: `Actividad · ${newSubject.trim()}`,
      time: newTime.trim(),
      status: newStatus,
    };

    setCalendarEvents((current) => ({
      ...current,
      [selectedDay]: [
        ...(current[selectedDay] ?? []),
        newEvent,
      ],
    }));

    setModalVisible(false);

    Alert.alert(
      '¡Actividad agregada!',
      `Se agregó al ${selectedDay} de noviembre.`,
    );
  }

  function toggleEventStatus(day: number, eventId: string) {
    setCalendarEvents((current) => ({
      ...current,
      [day]: (current[day] ?? []).map((event) => {
        if (event.id !== eventId) return event;

        return {
          ...event,
          status:
            event.status === 'Completada'
              ? 'Pendiente'
              : 'Completada',
        };
      }),
    }));
  }

  function deleteEvent(day: number, eventId: string) {
    Alert.alert(
      'Eliminar actividad',
      '¿Estás seguro de que deseas eliminar esta actividad?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setCalendarEvents((current) => ({
              ...current,
              [day]: (current[day] ?? []).filter(
                (event) => event.id !== eventId,
              ),
            }));
          },
        },
      ],
    );
  }

  function getStatusStyle(status: EventStatus) {
    if (status === 'Completada') {
      return {
        backgroundColor: colors.completedBackground,
        color: colors.completedText,
      };
    }

    if (status === 'Próxima') {
      return {
        backgroundColor: colors.upcomingBackground,
        color: colors.primary,
      };
    }

    return {
      backgroundColor: colors.pendingBackground,
      color: colors.text,
    };
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.title}>Mi calendario</Text>
          <Text style={styles.subtitle}>
            Organiza tus actividades y evaluaciones.
          </Text>
        </View>

        <View style={styles.monthHeader}>
          <View>
            <Text style={styles.monthTitle}>
              {monthName} {year}
            </Text>
            <Text style={styles.monthSubtitle}>
              {totalEvents} actividades registradas
            </Text>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.weekdays}>
            {weekdays.map((day) => (
              <Text key={day} style={styles.weekday}>
                {day}
              </Text>
            ))}
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
              const hasEvents = eventDays.includes(day);

              return (
                <Pressable
                  key={day}
                  style={[
                    styles.dayCell,
                    isSelected && styles.selectedDay,
                  ]}
                  onPress={() => setSelectedDay(day)}
                  accessibilityRole="button"
                  accessibilityLabel={`Día ${day}${hasEvents ? ', tiene actividades' : ''}`}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>

                  {hasEvents && (
                    <View
                      style={[
                        styles.eventDot,
                        isSelected && styles.selectedEventDot,
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Con actividades</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.selectedLegendDot} />
            <Text style={styles.legendText}>Día seleccionado</Text>
          </View>
        </View>

        <View style={styles.eventsHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {selectedDay} de noviembre
            </Text>
            <Text style={styles.sectionSubtitle}>
              {selectedEvents.length === 1
                ? '1 actividad'
                : `${selectedEvents.length} actividades`}
            </Text>
          </View>
        </View>

        {selectedEvents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No hay actividades
            </Text>
            <Text style={styles.emptyText}>
              Este día está libre. Puedes agregar una actividad.
            </Text>
          </View>
        ) : (
          selectedEvents.map((event) => {
            const statusStyle = getStatusStyle(event.status);

            return (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventTop}>
                  <View style={styles.eventTimeContainer}>
                    <Text style={styles.eventTime}>
                      {event.time}
                    </Text>
                  </View>

                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>
                      {event.title}
                    </Text>
                    <Text style={styles.eventSubject}>
                      {event.subject}
                    </Text>

                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusStyle.backgroundColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: statusStyle.color },
                        ]}
                      >
                        {event.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.eventActions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.completeButton,
                      pressed && styles.pressed,
                    ]}
                    onPress={() =>
                      toggleEventStatus(selectedDay, event.id)
                    }
                  >
                    <Text style={styles.completeButtonText}>
                      {event.status === 'Completada'
                        ? 'Marcar pendiente'
                        : 'Marcar completada'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      styles.deleteButton,
                      pressed && styles.pressed,
                    ]}
                    onPress={() =>
                      deleteEvent(selectedDay, event.id)
                    }
                  >
                    <Text style={styles.deleteButtonText}>
                      Eliminar
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        )}

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
          ]}
          onPress={openModal}
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>
                Nueva actividad
              </Text>
              <Text style={styles.modalSubtitle}>
                {selectedDay} de noviembre de {year}
              </Text>

              <Text style={styles.inputLabel}>Título</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Entregar trabajo"
                placeholderTextColor={colors.textSecondary}
                value={newTitle}
                onChangeText={setNewTitle}
              />

              <Text style={styles.inputLabel}>Asignatura</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Biología"
                placeholderTextColor={colors.textSecondary}
                value={newSubject}
                onChangeText={setNewSubject}
              />

              <Text style={styles.inputLabel}>Hora</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor={colors.textSecondary}
                value={newTime}
                onChangeText={setNewTime}
              />

              <Text style={styles.inputLabel}>Estado</Text>
              <View style={styles.statusOptions}>
                {(['Próxima', 'Pendiente', 'Completada'] as EventStatus[]).map(
                  (status) => (
                    <Pressable
                      key={status}
                      style={[
                        styles.statusOption,
                        newStatus === status && styles.statusOptionSelected,
                      ]}
                      onPress={() => setNewStatus(status)}
                    >
                      <Text
                        style={[
                          styles.statusOptionText,
                          newStatus === status &&
                            styles.statusOptionTextSelected,
                        ]}
                      >
                        {status}
                      </Text>
                    </Pressable>
                  ),
                )}
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.pressed,
                ]}
                onPress={addEvent}
              >
                <Text style={styles.saveButtonText}>
                  Guardar actividad
                </Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>
                  Cancelar
                </Text>
              </Pressable>
            </ScrollView>
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
    paddingBottom: 36,
    gap: 16,
  },
  pageHeader: {
    gap: 6,
  },
  title: {
    fontFamily: 'FredokaBold',
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  monthTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 20,
    color: colors.text,
  },
  monthSubtitle: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },
  calendarCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekday: {
    width: '14.2857%',
    textAlign: 'center',
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.textSecondary,
    paddingVertical: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2857%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 4,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontFamily: 'FredokaMedium',
    fontSize: 15,
    color: colors.text,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginTop: 2,
  },
  selectedEventDot: {
    backgroundColor: '#FFFFFF',
  },
  legend: {
    flexDirection: 'row',
    gap: 18,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  selectedLegendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  legendText: {
    fontFamily: 'Fredoka',
    fontSize: 12,
    color: colors.textSecondary,
  },
  eventsHeader: {
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 19,
    color: colors.text,
  },
  sectionSubtitle: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },
  emptyCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 22,
    alignItems: 'center',
    gap: 6,
  },
  emptyTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: colors.text,
  },
  emptyText: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  eventCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    gap: 14,
  },
  eventTop: {
    flexDirection: 'row',
    gap: 14,
  },
  eventTimeContainer: {
    minWidth: 58,
    paddingTop: 2,
  },
  eventTime: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 15,
    color: colors.primary,
  },
  eventInfo: {
    flex: 1,
    gap: 5,
  },
  eventTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: colors.text,
  },
  eventSubject: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: colors.textSecondary,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginTop: 3,
  },
  statusText: {
    fontFamily: 'FredokaMedium',
    fontSize: 12,
  },
  eventActions: {
    gap: 8,
  },
  completeButton: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: colors.upcomingBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.primary,
  },
  deleteButton: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: colors.overdueBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.overdueText,
  },
  addButton: {
    minHeight: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
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
    backgroundColor: 'rgba(32, 38, 56, 0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    maxHeight: '90%',
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
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontFamily: 'Fredoka',
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.background,
  },
  statusOptions: {
    gap: 8,
  },
  statusOption: {
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundElement,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  statusOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.upcomingBackground,
  },
  statusOptionText: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusOptionTextSelected: {
    fontFamily: 'FredokaMedium',
    color: colors.primary,
  },
  saveButton: {
    minHeight: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 15,
    color: colors.textSecondary,
  },
});
