import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Colors } from "@shared/constants/Colors";
import { useTab } from "@shared/hooks/useTab";
import { useTheme } from "@shared/hooks/useTheme";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

const TabsLayout = () => {
  const { pointerEvents, iconColor } = useTab();
  // todo remove destrucure
  const { isOpen } = useActionModalStore();

  const { colorScheme } = useTheme();
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
            // TODO move size to constants?
            <Ionicons name="build-sharp" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
