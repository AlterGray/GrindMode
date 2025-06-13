import { View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

import MetricCard from "./MetricCard";

type DisciplineMetricsProps = {};

const DisciplineMetrics: React.FC<DisciplineMetricsProps> = () => {
  return (
    <View className="gap-4">
      {/* TODO CREATE HEADER VARIANT */}
      <ThemedText className="text-2xl font-medium">
        Discipline metrics
      </ThemedText>

      <View className="flex-row flex-wrap gap-2">
        <MetricCard header={"Total Rituals"} value={2} />
        <MetricCard header={"Current Streak"} value={2} />
        <MetricCard header={"Longest Streak"} value={2} />
        <MetricCard header={"Rituals Missed"} value={2} />
      </View>
    </View>
  );
};

export default DisciplineMetrics;
