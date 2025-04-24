import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useThemeStore } from '@/stores/themeStore'

const RoutineLayout = () => {
  const isDark = useThemeStore((state) => state.isDark);

  const screenOptions = {
    headerStyle: {
      backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
    },
    headerTitleStyle: {
      color: isDark ? Colors.dark.textPrimary : Colors.light.textPrimary,
    },
    headerTintColor: isDark ? Colors.dark.textPrimary : Colors.light.textPrimary,
  };

  const screens = {
    create: {
      name: 'create',
      options: {
        title: 'Create Routine',
        headerShown: true,
      },
    },
    update: {
      name: 'update',
      options: {
        title: 'Edit Routine',
        headerShown: true,
      },
    },
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen {...screens.update} />
      <Stack.Screen {...screens.create} />
      
    </Stack>
  )
}

export default RoutineLayout