import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@shared/hooks/useTheme";

import ProgressCircle from "./CirlceProgressBar/ProgressCircle";

const ProgressRow = () => {
  const theme = useTheme();
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";
  const progressColor = theme.colorScheme === "light" ? "#555" : "#eee";

  return (
    <View style={styles.container}>
      <ProgressCircle
        progress={0.5}
        label="Completion Rate"
        scale={1}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
      />
      <ProgressCircle
        progress={0.8}
        label="Improvement Ratio"
        scale={1.3}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
      />
      <ProgressCircle
        progress={0.3}
        label="Habbit Power Score"
        scale={1}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Or 'center' if you prefer
    paddingHorizontal: 0,
  },
});

export default ProgressRow;
