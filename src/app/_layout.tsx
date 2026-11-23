import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Fredoka: require('@/assets/fonts/Fredoka-Regular.ttf'),
    FredokaMedium: require('@/assets/fonts/Fredoka-Medium.ttf'),
    FredokaSemiBold: require('@/assets/fonts/Fredoka-SemiBold.ttf'),
    FredokaBold: require('@/assets/fonts/Fredoka-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: {
            backgroundColor: '#F5F6FA',
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
        <Stack.Screen name="explore" />
      </Stack>

      <AnimatedSplashOverlay />
    </ThemeProvider>
  );
}
