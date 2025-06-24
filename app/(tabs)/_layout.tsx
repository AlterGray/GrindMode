import React from "react";
import Animated from "react-native-reanimated";

import { Tabs } from "expo-router";

import { Colors } from "@shared/constants/Colors";
import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { useTabColor } from "@shared/hooks/useTabColor";
import { useTheme } from "@shared/hooks/useTheme";
import { IoniconsName } from "@shared/types/commonTypes";
import AnimatedHeader from "@shared/ui/AnimatedComponents/AnimatedHeader";
import TabBarIcon from "@shared/ui/Layout/TabBarIcon";
import TabBarLabel from "@shared/ui/Layout/TabBarLabel";
import ThemeButton from "@shared/ui/ThemeButton";

const TabsLayout = () => {
  const { resolveTextColor, pointerEvents } = useTabColor();
  const animatedColor = useAnimatedColor("backgroundSurface");
  const { colorScheme } = useTheme();

  const screens: { title: string; name: string; icon: IoniconsName }[] = [
    { title: "Daily rituals", name: "index", icon: "flame-sharp" },
    { title: "Proofs", name: "proofs", icon: "stats-chart-sharp" },
    { title: "Settings", name: "settings", icon: "settings-sharp" },
  ];

  // TODO make global color for all layout headers
  // TODO refactor later imperative code to declarative style
  return (
    <Tabs
      screenOptions={{
        header: ({ options: { title } }) => (
          <AnimatedHeader headerRight={<ThemeButton />} title={title} />
        ),
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel label={children} focused={focused} />
        ),
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <Animated.View style={[animatedColor, { flex: 1 }]} />
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
            tabBarItemStyle: pointerEvents,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                iconName={screen.icon}
                animatedColor={resolveTextColor(focused)}
                // TODO it will be fixed when u will use one value for transition throughout whole app?
                color={
                  colorScheme === "light"
                    ? focused
                      ? Colors.light.tabActive
                      : Colors.light.tabInactive
                    : focused
                      ? Colors.dark.tabActive
                      : Colors.dark.tabInactive
                }
              />
            ),
            tabBarIconStyle: {},
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
