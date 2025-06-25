import React from "react";

import { Stack } from "expo-router";

import { useThemeColors } from "@shared/hooks/useThemeColors";

// TODO not all views visible for user, can we increase performance with removing animations from those views?
const RitualLayout = () => {
  const theme = useThemeColors();

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.backgroundSurface,
    },
    headerTitleStyle: {
      color: theme.textPrimary,
    },
    headerTintColor: theme.textPrimary,
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
