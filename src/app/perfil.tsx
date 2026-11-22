import { useRouter } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar tu sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => router.replace('/login'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>

        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.subtitle}>
          Administra tu información personal.
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>♙</Text>
          </View>

          <Text style={styles.name}>Estudiante</Text>
          <Text style={styles.role}>Cuenta UnivAgenda</Text>
        </View>

        <Text style={styles.sectionTitle}>Mi cuenta</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>No configurado</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo</Text>
            <Text style={styles.infoValue}>No configurado</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preferencias</Text>

        <View style={styles.infoCard}>
          <Pressable
            style={styles.option}
            onPress={() => alert('Próximamente: notificaciones')}
          >
            <Text style={styles.optionText}>Notificaciones</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.option}
            onPress={() => alert('Próximamente: configuración')}
          >
            <Text style={styles.optionText}>Configuración</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Cerrar sesión"
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.version}>UnivAgenda · Versión 1.0</Text>
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
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    minHeight: 48,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingRight: 16,
  },
  backText: {
    fontFamily: 'FredokaMedium',
    fontSize: 16,
    color: colors.primary,
  },
  title: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 24,
    color: colors.text,
    marginTop: 12,
  },
  subtitle: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: colors.backgroundElement,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
    marginBottom: 28,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.upcomingBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 42,
    color: colors.primary,
  },
  name: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 20,
    color: colors.text,
    marginTop: 12,
  },
  role: {
    fontFamily: 'Fredoka',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'FredokaSemiBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.backgroundElement,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoRow: {
    minHeight: 58,
    justifyContent: 'center',
    gap: 3,
  },
  infoLabel: {
    fontFamily: 'Fredoka',
    fontSize: 13,
    color: colors.textSecondary,
  },
  infoValue: {
    fontFamily: 'FredokaMedium',
    fontSize: 15,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  option: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontFamily: 'FredokaMedium',
    fontSize: 15,
    color: colors.text,
  },
  arrow: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  logoutButton: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.overdueText,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  logoutButtonText: {
    fontFamily: 'FredokaMedium',
    fontSize: 16,
    color: colors.overdueText,
  },
  version: {
    fontFamily: 'Fredoka',
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
