import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

type Task = {
  id: string;
  title: string;
  subject: string;
  details: string;
  status: 'Pendiente' | 'Completada';
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Informe de Biología',
    subject: 'Biología',
    details: 'Entrega · 24 nov, 10:00',
    status: 'Pendiente',
  },
  {
    id: '2',
    title: 'Ejercicios de Álgebra',
    subject: 'Matemáticas',
    details: 'Entrega · 25 nov, 18:00',
    status: 'Pendiente',
  },
  {
    id: '3',
    title: 'Lectura capítulo 3',
    subject: 'Historia',
    details: 'Entrega · 27 nov, 12:00',
    status: 'Completada',
  },
];

type Filter = 'Todas' | 'Pendientes' | 'Completadas';

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<Filter>('Todas');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'Todas' ||
      (filter === 'Pendientes' && task.status === 'Pendiente') ||
      (filter === 'Completadas' && task.status === 'Completada');

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.subject.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'Pendiente'
                  ? 'Completada'
                  : 'Pendiente',
            }
          : task,
      ),
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>Mis tareas</Text>
            <Text style={styles.subtitle}>
              Organiza y controla tus pendientes.
            </Text>

            <TextInput
              style={styles.search}
              placeholder="Buscar tarea o asignatura..."
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
                    onPress={() => setFilter(item)}
                    style={[
                      styles.filterButton,
                      filter === item && styles.filterActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        filter === item && styles.filterTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ),
              )}
            </View>

            <Text style={styles.listTitle}>
              {filter === 'Todas'
                ? 'Todas las tareas'
                : filter === 'Pendientes'
                  ? 'Tareas pendientes'
                  : 'Tareas completadas'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.status}. Cambiar estado`}
            style={({ pressed }) => [
              styles.taskCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskMetadata}>{item.subject}</Text>
              <Text style={styles.taskMetadata}>{item.details}</Text>
            </View>

            <View
              style={[
                styles.badge,
                item.status === 'Pendiente'
                  ? styles.pendingBadge
                  : styles.completedBadge,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  item.status === 'Completada' && styles.completedText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </Pressable>
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
            onPress={() => alert('Próximamente: agregar tarea')}
          >
            <Text style={styles.addButtonText}>+ Agregar tarea</Text>
          </Pressable>
        }
      />
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
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  filterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontFamily: 'FredokaMedium',
    fontSize: 13,
    color: colors.text,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listTitle: {
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
    gap: 12,
    marginBottom: 12,
  },
  taskContent: {
    gap: 4,
  },
  taskTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: colors.text,
  },
  taskMetadata: {
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
  pendingBadge: {
    backgroundColor: colors.pendingBackground,
  },
  completedBadge: {
    backgroundColor: colors.completedBackground,
  },
  badgeText: {
    fontFamily: 'FredokaMedium',
    fontSize: 12,
    color: colors.text,
  },
  completedText: {
    color: colors.completedText,
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
});
