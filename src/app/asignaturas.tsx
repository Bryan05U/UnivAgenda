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

type Subject = {
  id: string;
  name: string;
  code: string;
  teacher: string;
  schedule: string;
  room: string;
  icon: string;
};

const initialSubjects: Subject[] = [
  {
    id: '1',
    name: 'Matemáticas',
    code: 'MAT-101',
    teacher: 'Carolina Pérez',
    schedule: 'Lunes y miércoles · 08:30–10:00',
    room: 'Sala 204',
    icon: '∑',
  },
  {
    id: '2',
    name: 'Biología',
    code: 'BIO-102',
    teacher: 'Andrés Muñoz',
    schedule: 'Martes y jueves · 10:00–11:30',
    room: 'Laboratorio 1',
    icon: '⌬',
  },
  {
    id: '3',
    name: 'Historia',
    code: 'HIS-103',
    teacher: 'María González',
    schedule: 'Viernes · 14:00–15:30',
    room: 'Sala 108',
    icon: '◷',
  },
];

export default function SubjectsScreen() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState('');

  const filteredSubjects = subjects.filter((subject) => {
    const query = search.toLowerCase();

    return (
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query) ||
      subject.teacher.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>Mis asignaturas</Text>
            <Text style={styles.subtitle}>
              Consulta tus cursos y horarios.
            </Text>

            <TextInput
              style={styles.search}
              placeholder="Buscar asignatura..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
              accessibilityLabel="Buscar asignaturas"
            />

            <Text style={styles.sectionTitle}>Mis cursos</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <View style={styles.iconContainer}>
                <Text style={styles.subjectIcon}>{item.icon}</Text>
              </View>

              <View style={styles.subjectTitleContainer}>
                <Text style={styles.subjectTitle}>{item.name}</Text>
                <Text style={styles.subjectCode}>{item.code}</Text>
              </View>
            </View>

            <View style={styles.details}>
              <Text style={styles.detailText}>
                {item.teacher}
              </Text>
              <Text style={styles.detailText}>
                {item.schedule}
              </Text>
              <Text style={styles.detailText}>
                {item.room}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No se encontraron asignaturas.
            </Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
            onPress={() => alert('Próximamente: agregar asignatura')}
          >
            <Text style={styles.addButtonText}>
              + Agregar asignatura
            </Text>
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
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    color: colors.text,
    marginTop: 4,
  },
  subjectCard: {
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    gap: 16,
    marginBottom: 12,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.upcomingBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectIcon: {
    fontSize: 22,
    color: colors.primary,
  },
  subjectTitleContainer: {
    flex: 1,
    gap: 3,
  },
  subjectTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: colors.text,
  },
  subjectCode: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
  },
  details: {
    gap: 6,
  },
  detailText: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
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
