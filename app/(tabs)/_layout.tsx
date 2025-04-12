import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useThemeStore } from '@/stores/themeStore'
import { Colors } from '@/constants/Colors'

const TabsLayout = () => {
  const { colorScheme } = useThemeStore();
  const darkColors = Colors.dark;
  const lightColors = Colors.light;

  const tabScreenOptions = {
    tabBarStyle: {
      backgroundColor: colorScheme === 'dark' ? darkColors.primaryBackground : lightColors.primaryBackground,
      borderTopColor: colorScheme === 'dark' ? darkColors.borderColor : lightColors.borderColor,
    },
    tabBarActiveTintColor: colorScheme === 'dark' ? darkColors.tabIconSelected : lightColors.tabIconSelected,
    tabBarInactiveTintColor: colorScheme === 'dark' ? darkColors.tabIconDefault : lightColors.tabIconDefault,
    headerStyle: {
      backgroundColor: colorScheme === 'dark' ? darkColors.primaryBackground : lightColors.primaryBackground,
    },
    headerTintColor: colorScheme === 'dark' ? darkColors.primaryText : lightColors.primaryText,
  };

  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name='index' options={{
        title: 'Daily routine',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={22} color={color} name='envira' />
      }} />
      <Tabs.Screen name='Settings' options={{
        title: 'Settings',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={22} color={color} name='cog' />
      }} />
    </Tabs>
  )
}

export default TabsLayout