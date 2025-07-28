import { View } from "react-native";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";

import ProgressRow from "../ProgressRow";
import { useMetrics } from "../utils/useMetrics";
import MetricCard from "./MetricCard/MetricCard";

type DisciplineMetricsProps = {
  days: number;
};

const DisciplineMetrics: React.FC<DisciplineMetricsProps> = ({ days }) => {
  const { ratioMetrics, numberMetrics } = useMetrics(days);

  // TODO move it out
  // TODO ADD metrick to check how much new phases earned
  // TODO show event when new phase earned with explanation
  // TODO rename phases
  const cardInfo = [
    {
      header: i18n.t("longestStreak"),
      description: i18n.t("longestStreakDescription"),
      value: numberMetrics.longestStreak,
    },
    {
      header: i18n.t("currentStreak"),
      description: i18n.t("currentStreakDescription"),
      value: numberMetrics.currentStreak,
    },
    {
      header: i18n.t("noMercyDays"),
      description: i18n.t("noMercyDaysDescription"),
      value: numberMetrics.noMercyDays,
    },
    {
      header: i18n.t("brokenRituals"),
      description: i18n.t("brokenRitualsDescription"),
      value: numberMetrics.brokenRituals,
    },
  ];

  // TODO TODO TODO when some metric is maximum then change it visual appearance
  return (
    <View>
      {/* TODO move to zustand?  */}
      <ProgressRow metrics={ratioMetrics} />

      <View className="flex-row flex-wrap justify-between gap-4">
        {cardInfo.map((card) => (
          <MetricCard
            key={card.header}
            header={card.header}
            value={card.value}
            description={card.description}
          />
        ))}
      </View>
    </View>
  );
};

export default DisciplineMetrics;
