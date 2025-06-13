import React from "react";
import { ScrollView, View } from "react-native";

import AchivementList from "@features/proofs/Achivement/AchivementList";
import CircleProgressBar from "@features/proofs/CirlceProgressBar/ProgressCircle";
import DisciplineMetrics from "@features/proofs/DisciplineMetrics/DisciplineMetrics";
import Header from "@features/proofs/Header";
import PhaseDistirbution from "@features/proofs/PhaseDistribution/PhaseDistirbution";

import { useTheme } from "@shared/hooks/useTheme";
import HorizontalTabBar from "@shared/ui/HorizontalTabBar";

const proofs = () => {
  const theme = useTheme();

  const progressColor = theme.colorScheme === "light" ? "#666" : "#fff";
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";

  // TODO zustand vs useState
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { label: "This week" },
    { label: "This month" },
    { label: "This year" },
    { label: "All time" },
  ];

  return (
    <ScrollView className="bg-white dark:bg-black px-8">
      <Header />
      <HorizontalTabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <View className="gap-10">
        <View className="flex-row justify-center">
          <CircleProgressBar
            progress={0.5}
            iconName="home"
            label="Discipline rate"
            progressColor={progressColor}
            backgroundColor={backgroundColor}
            scale={0.95}
          />
          <CircleProgressBar
            progress={0.8}
            iconName="home"
            label="Completion rate"
            progressColor={progressColor}
            backgroundColor={backgroundColor}
            scale={1.2}
          />
          <CircleProgressBar
            progress={0.3}
            iconName="home"
            label="Grind Days Ratio"
            progressColor={progressColor}
            backgroundColor={backgroundColor}
            scale={0.95}
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
