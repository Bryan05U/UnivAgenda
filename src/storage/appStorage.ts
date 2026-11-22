import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  tasks: '@univagenda/tasks',
  calendarEvents: '@univagenda/calendarEvents',
  subjects: '@univagenda/subjects',
};

export async function saveData<T>(key: string, data: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
}

export async function loadData<T>(key: string, fallback: T): Promise<T> {
  try {
    const storedData = await AsyncStorage.getItem(key);

    if (storedData !== null) {
      return JSON.parse(storedData) as T;
    }

    return fallback;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return fallback;
  }
}

export const StorageKeys = STORAGE_KEYS;