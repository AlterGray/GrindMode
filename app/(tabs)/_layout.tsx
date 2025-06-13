import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Colors } from "@shared/constants/Colors";
import { useTab } from "@shared/hooks/useTab";
import { useTheme } from "@shared/hooks/useTheme";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import ThemeButton from "@shared/ui/ThemeButton";

const TabsLayout = () => {
  const { pointerEvents, iconColor } = useTab();
  const isOpen = useActionModalStore((state) => state.isOpen);

  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme];

  // TODO make global color for all layout headers
  // TODO refactor later imperative code to declarative style
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
        headerRight: () => <ThemeButton iconColor={iconColor} />,
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* TODO add bage? */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Daily routine",
          tabBarItemStyle: { pointerEvents },
          tabBarIcon: ({ color }) => (
            // TODO use outlined everywhere
            <Ionicons name="flame-sharp" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="proofs"
        options={{
          title: "Proofs",
          tabBarItemStyle: { pointerEvents },
          tabBarIcon: ({ color }) => (
            // TODO move size to constants?
            <Ionicons name="stats-chart-sharp" size={26} color={color} />
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
