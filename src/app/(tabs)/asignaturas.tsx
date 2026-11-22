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
import {
  loadData,
  saveData,
  StorageKeys,
} from '@/storage/appStorage';

const colors = Colors.light;

type Subject = {
  id: string;
  name: string;
  code: string;
  teacher: string;
  schedule: string;
  room: string;
};

const initialSubjects: Subject[] = [
  {
    id: '1',
    name: 'Matemáticas',
    code: 'MAT101',
    teacher: 'Docente de Matemáticas',
    schedule: 'Lunes · 08:30',
    room: 'Sala 201',
  },
  {
    id: '2',
    name: 'Biología',
    code: 'BIO102',
    teacher: 'Docente de Biología',
    schedule: 'Martes · 10:00',
    room: 'Laboratorio 1',
  },
  {
    id: '3',
    name: 'Historia',
    code: 'HIS103',
    teacher: 'Docente de Historia',
    schedule: 'Miércoles · 12:00',
    room: 'Sala 105',
  },
];

export default function AsignaturasScreen() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newSchedule, setNewSchedule] = useState('');
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    async function loadSubjects() {
      const savedSubjects = await loadData<Subject[]>(
        StorageKeys.subjects,
        initialSubjects
      );

      setSubjects(savedSubjects);
      setLoaded(true);
    }

    loadSubjects();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveData(StorageKeys.subjects, subjects);
    }
  }, [subjects, loaded]);

  const filteredSubjects = subjects.filter((subject) => {
    const term = search.toLowerCase();

    return (
      subject.name.toLowerCase().includes(term) ||
      subject.code.toLowerCase().includes(term) ||
      subject.teacher.toLowerCase().includes(term)
    );
  });

  function resetForm() {
    setNewName('');
    setNewCode('');
    setNewTeacher('');
    setNewSchedule('');
    setNewRoom('');
    setEditingId(null);
  }

  function openNewSubject() {
    resetForm();
    setModalVisible(true);
  }

  function openEditSubject(subject: Subject) {
    setEditingId(subject.id);
    setNewName(subject.name);
    setNewCode(subject.code);
    setNewTeacher(subject.teacher);
    setNewSchedule(subject.schedule);
    setNewRoom(subject.room);
    setModalVisible(true);
  }

  function saveSubject() {
    if (
      !newName.trim() ||
      !newCode.trim() ||
      !newTeacher.trim() ||
      !newSchedule.trim() ||
      !newRoom.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completa todos los campos para guardar la asignatura.'
      );
      return;
    }

    if (editingId) {
      setSubjects((current) =>
        current.map((subject) =>
          subject.id === editingId
            ? {
                ...subject,
                name: newName.trim(),
                code: newCode.trim(),
                teacher: newTeacher.trim(),
                schedule: newSchedule.trim(),
                room: newRoom.trim(),
              }
            : subject
        )
      );
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: newName.trim(),
        code: newCode.trim(),
        teacher: newTeacher.trim(),
        schedule: newSchedule.trim(),
        room: newRoom.trim(),
      };

      setSubjects((current) => [...current, newSubject]);
    }

    resetForm();
    setModalVisible(false);
  }

  function closeModal() {
    resetForm();
    setModalVisible(false);
  }

  function deleteSubject(subject: Subject) {
    Alert.alert(
      'Eliminar asignatura',
      `¿Estás seguro de que deseas eliminar "${subject.name}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setSubjects((current) =>
              current.filter((item) => item.id !== subject.id)
            );
          },
        },
      ]
    );
  }

  function renderSubject({ item }: { item: Subject }) {
    return (
      <View style={styles.subjectCard}>
        <View style={styles.subjectHeader}>
          <View style={styles.subjectIcon}>
            <Text style={styles.subjectIconText}>◈</Text>
          </View>

          <View style={styles.subjectTitleContainer}>
            <Text style={styles.subjectName}>{item.name}</Text>
            <Text style={styles.subjectCode}>{item.code}</Text>
          </View>
        </View>

        <View style={styles.subjectDetails}>
          <Text style={styles.detailText}>
            Docente: {item.teacher}
          </Text>
          <Text style={styles.detailText}>
            Horario: {item.schedule}
          </Text>
          <Text style={styles.detailText}>
            Sala: {item.room}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.editButton}
            onPress={() => openEditSubject(item)}
            accessibilityRole="button"
            accessibilityLabel={`Editar ${item.name}`}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </Pressable>

          <Pressable
            style={styles.deleteButton}
            onPress={() => deleteSubject(item)}
            accessibilityRole="button"
            accessibilityLabel={`Eliminar ${item.name}`}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Asignaturas</Text>
          <Text style={styles.subtitle}>
            Organiza tus cursos y horarios.
          </Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar asignatura..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis asignaturas</Text>
          <Text style={styles.countText}>
            {subjects.length}{' '}
            {subjects.length === 1 ? 'asignatura' : 'asignaturas'}
          </Text>
        </View>

        <FlatList
          data={filteredSubjects}
          keyExtractor={(item) => item.id}
          renderItem={renderSubject}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {search
                  ? 'No se encontraron asignaturas.'
                  : 'Todavía no tienes asignaturas.'}
              </Text>
            </View>
          }
        />

        <Pressable
          style={styles.addButton}
          onPress={openNewSubject}
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>+ Agregar asignatura</Text>
        </Pressable>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={closeModal}
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
                  {editingId ? 'Editar asignatura' : 'Nueva asignatura'}
                </Text>

                <Text style={styles.modalSubtitle}>
                  {editingId
                    ? 'Modifica la información del curso.'
                    : 'Completa la información del curso.'}
                </Text>

                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Física"
                  placeholderTextColor={colors.textSecondary}
                  value={newName}
                  onChangeText={setNewName}
                />

                <Text style={styles.inputLabel}>Código</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. FIS104"
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
                />

                <Text style={styles.inputLabel}>Horario</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Jueves · 09:00"
                  placeholderTextColor={colors.textSecondary}
                  value={newSchedule}
                  onChangeText={setNewSchedule}
                />

                <Text style={styles.inputLabel}>Sala</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Sala 202"
                  placeholderTextColor={colors.textSecondary}
                  value={newRoom}
                  onChangeText={setNewRoom}
                />

                <Pressable
                  style={styles.saveButton}
                  onPress={saveSubject}
                  accessibilityRole="button"
                >
                  <Text style={styles.saveButtonText}>
                    {editingId ? 'Guardar cambios' : 'Guardar asignatura'}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.cancelButton}
                  onPress={closeModal}
                  accessibilityRole="button"
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'FredokaBold',
    fontSize: 26,
    color: colors.text,
  },
  subtitle: {
    fontFamily: 'Fredoka',
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchInput: {
    height: 50,
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Fredoka',
    fontSize: 15,
    color: colors.text,
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 19,
    color: colors.text,
  },
  countText: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  subjectCard: {
    backgroundColor: colors.backgroundElement,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.backgroundSelected,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subjectIconText: {
    fontSize: 25,
    color: colors.primary,
  },
  subjectTitleContainer: {
    flex: 1,
  },
  subjectName: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    color: colors.text,
  },
  subjectCode: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  subjectDetails: {
    marginTop: 14,
    gap: 6,
  },
  detailText: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  editButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: colors.backgroundSelected,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.primary,
  },
  deleteButton: {
    flex: 1,
    minHeight: 48,
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: 'Fredoka',
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  addButton: {
    minHeight: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 22,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  modalTitle: {
    fontFamily: 'FredokaBold',
    fontSize: 23,
    color: colors.text,
  },
  modalSubtitle: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 18,
  },
  inputLabel: {
    fontFamily: 'FredokaMedium',
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    minHeight: 48,
    backgroundColor: colors.backgroundElement,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    fontFamily: 'Fredoka',
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
  },
  saveButton: {
    minHeight: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontFamily: 'FredokaSemiBold',
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
