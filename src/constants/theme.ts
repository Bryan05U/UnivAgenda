import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#202638',
    background: '#F5F6FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E7EFF8',
    textSecondary: '#626D80',
    primary: '#2F4B84',
    secondary: '#7CA8CA',
    border: '#D9DEE8',
    success: '#1ABE82',
    warning: '#CA9B2E',
    pendingBackground: '#FCECC5',
    upcomingBackground: '#E7EFF8',
    completedBackground: '#DDF5EA',
    completedText: '#176B48',
    overdueBackground: '#FCE4E0',
    overdueText: '#A92316',
  },
  dark: {
    text: '#202638',
    background: '#F5F6FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E7EFF8',
    textSecondary: '#626D80',
    primary: '#2F4B84',
    secondary: '#7CA8CA',
    border: '#D9DEE8',
    success: '#1ABE82',
    warning: '#CA9B2E',
    pendingBackground: '#FCECC5',
    upcomingBackground: '#E7EFF8',
    completedBackground: '#DDF5EA',
    completedText: '#176B48',
    overdueBackground: '#FCE4E0',
    overdueText: '#A92316',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Fredoka',
    serif: 'ui-serif',
    rounded: 'Fredoka',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Fredoka',
    serif: 'serif',
    rounded: 'Fredoka',
    mono: 'monospace',
  },
  web: {
    sans: 'Fredoka',
    serif: 'serif',
    rounded: 'Fredoka',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
