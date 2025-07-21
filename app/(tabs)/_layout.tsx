import React from "react";
import Animated from "react-native-reanimated";

import { Tabs } from "expo-router";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { IoniconsName } from "@shared/types/commonTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import AnimatedTabBarIcon from "@shared/ui/AnimatedComponents/AnimatedTabBarIcon";
import AnimatedTabBarLabel from "@shared/ui/AnimatedComponents/AnimatedTabBarLabel";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
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

  const animatedText = useAnimatedColor("textPrimary", true);

  // TODO make global color for all layout headers
  // TODO refactor later imperative code to declarative style
  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => (
          <AnimatedThemedView className="absolute inset-0" />
        ),
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
          <AnimatedThemedView className="absolute inset-0" />
        ),
        animation: "shift",
        sceneStyle: {
          backgroundColor: theme.backgroundSurface,
        },
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
            tabBarIcon: ({ focused, size }) => (
              <AnimatedTabBarIcon
                icon={screen.icon}
                size={size}
                focused={focused}
              />
            ),
            tabBarLabel: ({ children, focused }) => (
              <AnimatedTabBarLabel children={children} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
