import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@/stores/themeStore";

const RoutineLayout = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? Colors.dark : Colors.light;
  const backgroundColor = theme.backgroundSecondary;
  const textColor = theme.textPrimary;

  const screenOptions = {
    headerStyle: {
      backgroundColor,
    },
    headerTitleStyle: {
      color: textColor,
    },
    headerTintColor: textColor,
  };

  const screens = [
    {
      name: "create",
      options: {
        title: "Create Routine",
        headerShown: true,
      },
    },
    {
      name: "update",
      options: {
        title: "Edit Routine",
        headerShown: true,
      },
    },
  ];

  return (
    <Stack screenOptions={screenOptions}>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={screen.options}
        />
      ))}
    </Stack>
  );
};

export default RoutineLayout;
