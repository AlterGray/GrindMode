import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useThemeStore } from "../../src/shared/stores/themeStore";
import { useTab } from "@hooks/useTab";
import { useActionModalStore } from "@ui/ActionsModal/actionsModalStore";
import { Colors } from "../../src/constants/Colors";

const TabsLayout = () => {
  const { colorScheme } = useThemeStore();
  const { pointerEvents, iconColor } = useTab();
  const { isOpen } = useActionModalStore();

  const theme = Colors[colorScheme];

  // TODO make global color for all layout headers
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.backgroundSurface,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: isOpen ? iconColor : theme.tabActive,
        tabBarInactiveTintColor: isOpen ? iconColor : theme.tabInactive,
        headerStyle: { backgroundColor: theme.backgroundSurface },
        headerTintColor: theme.textPrimary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Daily routine",
          tabBarItemStyle: { pointerEvents },
          tabBarIcon: ({ color }) => (
            <Ionicons name="flame-sharp" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarItemStyle: { pointerEvents },
          tabBarIcon: ({ color }) => (
            <Ionicons name="build-sharp" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
