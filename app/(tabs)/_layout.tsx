import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { IoniconsName } from "@shared/types/commonTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import ThemeButton from "@shared/ui/ThemeButton";

const TabsLayout = () => {
  const isModalOpen = useActionModalStore((s) => s.isOpen);
  const theme = useThemeColors();

  const pointerEvents = isModalOpen ? "box-none" : "box-none";

  const screens: { title: string; name: string; icon: IoniconsName }[] = [
    { title: "Daily rituals", name: "index", icon: "flame-sharp" },
    { title: "Proofs", name: "proofs", icon: "stats-chart-sharp" },
    { title: "Settings", name: "settings", icon: "settings-sharp" },
  ];

  const animatedBg = useAnimatedColor("backgroundSurface");
  const animatedText = useAnimatedColor("textPrimary", true);

  // TODO make global color for all layout headers
  // TODO refactor later imperative code to declarative style
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.backgroundSurface,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: isModalOpen ? theme.icon : theme.tabActive,
        tabBarInactiveTintColor: isModalOpen ? theme.icon : theme.tabInactive,
        headerStyle: { backgroundColor: theme.backgroundSurface },
        headerTintColor: theme.textPrimary,
        headerRight: () => <ThemeButton className="px-4" />,
        headerTitle: ({ children }) => (
          <Animated.Text style={animatedText} className="text-2xl font-medium">
            {children}
          </Animated.Text>
        ),
        tabBarHideOnKeyboard: true,
        headerBackground: () => (
          <Animated.View
            style={[
              animatedBg,
              { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
            ]}
          />
        ),
      }}
    >
      {/* TODO add bage? */}
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.title}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarItemStyle: { pointerEvents },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={screen.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
