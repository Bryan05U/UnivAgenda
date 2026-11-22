import { Stack } from 'expo-router';
import { DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Fredoka: require('@/assets/fonts/Fredoka-Regular.ttf'),
    FredokaMedium: require('@/assets/fonts/Fredoka-Medium.ttf'),
    FredokaSemiBold: require('@/assets/fonts/Fredoka-SemiBold.ttf'),
    FredokaBold: require('@/assets/fonts/Fredoka-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="explore" />
      </Stack>
    </ThemeProvider>
  );
}
