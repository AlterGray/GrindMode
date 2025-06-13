import { View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

import MetricCard from "./MetricCard";

type DisciplineMetricsProps = {};

const DisciplineMetrics: React.FC<DisciplineMetricsProps> = () => {
  const cardInfo = [
    { header: "Break Days", value: 2 },
    { header: "Grind Days", value: 2 },
    { header: "Longest Streak", value: 2 },
    { header: "Current Streak", value: 2 },
  ];

  return (
    <View className="gap-4">
      {/* TODO CREATE HEADER VARIANT */}
      <ThemedText className="text-2xl font-medium">
        Discipline metrics
      </ThemedText>

      <View className="flex-row flex-wrap justify-between gap-4">
        {cardInfo.map((card) => (
          <MetricCard
            key={card.header}
            header={card.header}
            value={card.value}
          />
        ))}
      </View>
    </View>
  );
};

export default DisciplineMetrics;
