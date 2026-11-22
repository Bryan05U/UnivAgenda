import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
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

type Task = {
  id: string;
  title: string;
  subject: string;
  details: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
};

type Filter = 'Todas' | 'Pendientes' | 'Completadas';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Informe de Biología',
    subject: 'Biología',
    details: 'Preparar informe de laboratorio.',
    dueDate: '24/11/2026',
    dueTime: '10:00',
    completed: false,
  },
  {
    id: '2',
    title: 'Ejercicios de Álgebra',
    subject: 'Matemáticas',
    details: 'Resolver ejercicios del capítulo 4.',
    dueDate: '26/11/2026',
    dueTime: '08:30',
    completed: false,
  },
  {
    id: '3',
    title: 'Lectura capítulo 3',
    subject: 'Historia',
    details: 'Repasar contenidos para la clase.',
    dueDate: '27/11/2026',
    dueTime: '14:00',
    completed: true,
  },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('Todas');
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    async function loadTasks() {
      const storedTasks = await loadData<Task[]>(
        StorageKeys.tasks,
        initialTasks,
      );

      setTasks(storedTasks);
      setLoaded(true);
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveData(StorageKeys.tasks, tasks);
    }
  }, [tasks, loaded]);

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }

  function deleteTask(id: string) {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setTasks((current) =>
              current.filter((task) => task.id !== id),
            );
          },
        },
      ],
    );
  }

  function openModal() {
    setNewTitle('');
    setNewSubject('');
    setNewDetails('');
    setNewDate('');
    setNewTime('');
    setModalVisible(true);
  }

  function addTask() {
    if (
      !newTitle.trim() ||
      !newSubject.trim() ||
      !newDate.trim() ||
      !newTime.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completa el título, asignatura, fecha y hora.',
      );
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subject: newSubject.trim(),
      details: newDetails.trim(),
      dueDate: newDate.trim(),
      dueTime: newTime.trim(),
      completed: false,
    };

    setTasks((current) => [...current, newTask]);
    setFilter('Todas');
    setSearch('');
    setModalVisible(false);

    Alert.alert('¡Tarea agregada!', 'La tarea se guardó correctamente.');
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.subject.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'Todas' ||
      (filter === 'Pendientes' && !task.completed) ||
      (filter === 'Completadas' && task.completed);

    return matchesSearch && matchesFilter;
  });

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>Mis tareas</Text>
            <Text style={styles.subtitle}>
              Organiza y lleva el seguimiento de tus actividades.
            </Text>

            <View style={styles.summary}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{pendingCount}</Text>
                <Text style={styles.summaryLabel}>Pendientes</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{completedCount}</Text>
                <Text style={styles.summaryLabel}>Completadas</Text>
              </View>
            </View>

            <TextInput
              style={styles.search}
              placeholder="Buscar tarea..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
              accessibilityLabel="Buscar tareas"
            />

            <View style={styles.filters}>
              {(['Todas', 'Pendientes', 'Completadas'] as Filter[]).map(
                (item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.filterButton,
                      filter === item && styles.filterSelected,
                    ]}
                    onPress={() => setFilter(item)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        filter === item && styles.filterTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ),
              )}
            </View>

            <Text style={styles.sectionTitle}>Lista de tareas</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Pressable
              style={({ pressed }) => [
                styles.taskMain,
                pressed && styles.pressed,
              ]}
              onPress={() => toggleTask(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}. ${item.completed ? 'Completada' : 'Pendiente'}. Pulsa para cambiar el estado.`}
            >
              <View style={styles.taskRow}>
                <View
                  style={[
                    styles.checkCircle,
                    item.completed && styles.checkCompleted,
                  ]}
                >
                  {item.completed && (
                    <Text style={styles.checkText}>✓</Text>
                  )}
                </View>

                <View style={styles.taskContent}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.completed && styles.completedTitle,
                    ]}
                  >
                    {item.title}
                  </Text>

                  <Text style={styles.taskSubject}>{item.subject}</Text>

                  {item.details ? (
                    <Text style={styles.taskDetails}>{item.details}</Text>
                  ) : null}

                  <Text style={styles.taskDate}>
                    {item.dueDate} · {item.dueTime}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      item.completed
                        ? styles.completedBadge
                        : styles.pendingBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        item.completed
                          ? styles.completedStatusText
                          : styles.pendingStatusText,
                      ]}
                    >
                      {item.completed ? 'Completada' : 'Pendiente'}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.pressed,
              ]}
              onPress={() => deleteTask(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Eliminar ${item.title}`}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No se encontraron tareas.
            </Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
            onPress={openModal}
            accessibilityRole="button"
          >
            <Text style={styles.addButtonText}>+ Agregar tarea</Text>
          </Pressable>
        }
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContent}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitle}>Nueva tarea</Text>
              <Text style={styles.modalSubtitle}>
                Completa los datos de tu actividad.
              </Text>

              <Text style={styles.inputLabel}>Título</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Entregar informe"
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

              <Text style={styles.inputLabel}>Detalles</Text>
              <TextInput
                style={[styles.input, styles.detailsInput]}
                placeholder="Descripción (opcional)"
                placeholderTextColor={colors.textSecondary}
                value={newDetails}
                onChangeText={setNewDetails}
                multiline
              />

              <Text style={styles.inputLabel}>Fecha de entrega</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.textSecondary}
                value={newDate}
                onChangeText={setNewDate}
              />

              <Text style={styles.inputLabel}>Hora</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor={colors.textSecondary}
                value={newTime}
                onChangeText={setNewTime}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.pressed,
                ]}
                onPress={addTask}
              >
                <Text style={styles.saveButtonText}>Guardar tarea</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
    gap: 14,
  },
  headerContent: {
    gap: 14,
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
  summary: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  summaryNumber: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 24,
    color: colors.primary,
  },
  summaryLabel: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
  },
  search: {
    height: 52,
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Fredoka',
    fontSize: 16,
    color: colors.text,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  filterSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontFamily: 'FredokaMedium',
    fontSize: 13,
    color: colors.textSecondary,
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    color: colors.text,
    marginTop: 4,
  },
  taskCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  taskMain: {
    minHeight: 48,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'FredokaBold',
  },
  taskContent: {
    flex: 1,
    gap: 6,
  },
  taskTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: colors.text,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  taskSubject: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.primary,
  },
  taskDetails: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  taskDate: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
  },
  pendingBadge: {
    backgroundColor: colors.pendingBackground,
  },
  completedBadge: {
    backgroundColor: colors.completedBackground,
  },
  statusText: {
    fontFamily: 'FredokaMedium',
    fontSize: 13,
  },
  pendingStatusText: {
    color: colors.text,
  },
  completedStatusText: {
    color: colors.completedText,
  },
  deleteButton: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.overdueBackground,
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
  empty: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
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
    marginBottom: 20,
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
  detailsInput: {
    minHeight: 90,
    textAlignVertical: 'top',
    paddingTop: 12,
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
