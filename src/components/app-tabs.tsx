import { NativeTabs } from 'expo-router/native-tabs';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundSelected}
      tintColor={colors.primary}
      labelVisibilityMode="labeled"
      labelStyle={{
        color: colors.textSecondary,
        selected: { color: colors.primary },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tareas">
        <NativeTabs.Trigger.Label>Tareas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="checklist"
          md="checklist"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="calendario">
        <NativeTabs.Trigger.Label>Calendario</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="calendar"
          md="calendar_month"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="asignaturas">
        <NativeTabs.Trigger.Label>Asignaturas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="book.closed.fill"
          md="menu_book"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
