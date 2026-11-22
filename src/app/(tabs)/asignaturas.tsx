import { useState } from 'react';
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
  const [modalVisible, setModalVisible] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newSchedule, setNewSchedule] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const filteredSubjects = subjects.filter((subject) => {
    const query = search.toLowerCase();

    return (
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query) ||
      subject.teacher.toLowerCase().includes(query)
    );
  });

  function openModal() {
    setNewName('');
    setNewCode('');
    setNewTeacher('');
    setNewSchedule('');
    setNewRoom('');
    setModalVisible(true);
  }

  function addSubject() {
    if (
      !newName.trim() ||
      !newCode.trim() ||
      !newTeacher.trim() ||
      !newSchedule.trim() ||
      !newRoom.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completa todos los campos antes de guardar.',
      );
      return;
    }

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: newName.trim(),
      code: newCode.trim().toUpperCase(),
      teacher: newTeacher.trim(),
      schedule: newSchedule.trim(),
      room: newRoom.trim(),
      icon: '◈',
    };

    setSubjects((current) => [...current, newSubject]);
    setSearch('');
    setModalVisible(false);

    Alert.alert(
      '¡Asignatura agregada!',
      `${newSubject.name} se agregó correctamente a tus cursos.`,
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            onPress={openModal}
            accessibilityRole="button"
          >
            <Text style={styles.addButtonText}>
              + Agregar asignatura
            </Text>
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
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>
                Nueva asignatura
              </Text>
              <Text style={styles.modalSubtitle}>
                Completa la información de tu curso.
              </Text>

              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Física"
                placeholderTextColor={colors.textSecondary}
                value={newName}
                onChangeText={setNewName}
                autoCapitalize="words"
              />

              <Text style={styles.inputLabel}>Código</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. FIS-104"
                placeholderTextColor={colors.textSecondary}
                value={newCode}
                onChangeText={setNewCode}
                autoCapitalize="characters"
              />

              <Text style={styles.inputLabel}>Docente</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del docente"
                placeholderTextColor={colors.textSecondary}
                value={newTeacher}
                onChangeText={setNewTeacher}
                autoCapitalize="words"
              />

              <Text style={styles.inputLabel}>Horario</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Lunes · 10:00–11:30"
                placeholderTextColor={colors.textSecondary}
                value={newSchedule}
                onChangeText={setNewSchedule}
              />

              <Text style={styles.inputLabel}>Sala</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Sala 305"
                placeholderTextColor={colors.textSecondary}
                value={newRoom}
                onChangeText={setNewRoom}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.pressed,
                ]}
                onPress={addSubject}
              >
                <Text style={styles.saveButtonText}>
                  Guardar asignatura
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
