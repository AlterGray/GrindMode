import React from 'react'
import { Tabs } from 'expo-router'
import { useThemeStore } from '@/stores/themeStore'
import { Colors } from '@/constants/Colors'
import { useTab } from '@/hooks/useTab'
import { FontAwesome } from '@expo/vector-icons'
import ActionModal from '@/components/ActionsModal/ActionModal'
import { useActionModalStore } from '@/stores/actionsModalStore'

const TabsLayout = () => {
  const { colorScheme } = useThemeStore();
  const { pointerEvents, iconColor } = useTab();
  const { isOpen } = useActionModalStore();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

  const screenOptions = {
    tabBarStyle: {
      backgroundColor: isOpen ? theme.background : theme.background,
      borderTopColor: theme.border,
    },
    tabBarActiveTintColor: isOpen ? iconColor : theme.tabActive,
    tabBarInactiveTintColor: isOpen ? iconColor : theme.tabInactive,
    headerStyle: {
      backgroundColor: theme.backgroundSecondary,
    },
    headerTintColor: theme.textPrimary,
  }

  return (
    <>
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Daily routine',
          tabBarItemStyle: { pointerEvents },
          tabBarIcon: ({ color }) => <FontAwesome name={'envira'} size={22} color={color} />,
          header: isOpen ? () => <ActionModal /> : undefined, // custom header
        }}
    />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarItemStyle: { pointerEvents },
          tabBarIcon: ({ color }) => <FontAwesome name={'cog'} size={22} color={color} />,
        }}
      />
    </Tabs>
    </>
  )
}

export default TabsLayout
