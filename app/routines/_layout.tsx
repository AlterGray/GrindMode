import React from "react";

import { Stack } from "expo-router";

import { useThemeColors } from "@shared/hooks/useThemeColors";

const RitualLayout = () => {
  const theme = useThemeColors();
  const backgroundColor = theme.backgroundSurface;
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
        title: "Create Ritual",
        headerShown: true,
      },
    },
    {
      name: "update",
      options: {
        title: "Edit Ritual",
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

export default RitualLayout;
