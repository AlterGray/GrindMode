import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { useThemeStore } from '@/stores/themeStore';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';

import '@/global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { colorScheme, isDark } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  if (!loaded) {
    return null;
  }

  // TODO stack vs slot
  return (
    <ThemeProvider>
      <Stack screenOptions={{
        navigationBarColor: isDark ? Colors.dark.primaryBackground : Colors.light.primaryBackground,
        statusBarBackgroundColor: isDark ? Colors.dark.primaryBackground : Colors.light.primaryBackground,
        statusBarStyle: isDark ? 'light' : 'dark',
        headerShown: false
      }} />
    </ThemeProvider>
  );
}
