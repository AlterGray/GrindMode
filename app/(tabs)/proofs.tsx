import React from "react";
import { ScrollView, View } from "react-native";

import AchivementList from "@features/statistic/Achivement/AchivementList";
import ProgressCircle from "@features/statistic/CirlceProgressBar/ProgressCircle";
import DisciplineMetrics from "@features/statistic/DisciplineMetrics/DisciplineMetrics";
import Header from "@features/statistic/Header";
import PhaseDistirbution from "@features/statistic/PhaseDistribution/PhaseDistirbution";

import { useTheme } from "@shared/hooks/useTheme";

const proofs = () => {
  const theme = useTheme();

  const progressColor = theme.colorScheme === "light" ? "#666" : "#fff";
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";

  return (
    <ScrollView className="bg-white dark:bg-black px-8 gap-6">
      <Header />

      <View className="gap-10">
        <View className="flex-row justify-center">
          <ProgressCircle
            progress={0.3}
            iconName="home"
            label="Home"
            progressColor={progressColor}
            backgroundColor={backgroundColor}
          />
          <ProgressCircle
            progress={0.5}
            iconName="home"
            label="Home"
            progressColor={progressColor}
            backgroundColor={backgroundColor}
          />
          <ProgressCircle
            progress={0.8}
            iconName="home"
            label="Home"
            progressColor={progressColor}
            backgroundColor={backgroundColor}
          />
        </View>

        <PhaseDistirbution />
        <DisciplineMetrics />
        <AchivementList />
      </View>
    </ScrollView>
  );
};

export default proofs;
