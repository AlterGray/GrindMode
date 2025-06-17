import { View } from "react-native";

import {
  CompletionEntry,
  StatisticEntry,
  useRitualStatisticStore,
} from "@features/rituals/statisticStore";

import { isDateInLastNDays } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

import ProgressRow from "../ProgressRow";
import { useMetrics } from "../utils/useMetrics";
import MetricCard from "./MetricCard";

type DisciplineMetricsProps = {
  days: number;
};

const calculateLongestStreak = (statistic: StatisticEntry[], days: number) => {
  let longestStreak = 0;
  let currentStreak = 0;

  statistic.forEach((s) => {
    if (s.completitions.length === 0) {
      currentStreak = 0;
    }
    s.completitions.forEach((completion) => {
      if (completion.status === RitualStatuses.Done) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
  });

  return longestStreak;
};

const calculateCurrentStreak = (completions: CompletionEntry[]) => {
  let currentStreak = 0;

  completions.forEach((completion) => {
    if (completion.status === RitualStatuses.Done) {
      currentStreak++;
    } else {
      currentStreak = 0;
    }
  });

  return currentStreak;
};

const DisciplineMetrics: React.FC<DisciplineMetricsProps> = ({ days }) => {
  const { ratioMetrics, numberMetrics } = useMetrics(days);

  // TODO move it out
  // TODO ADD metrick to check how much new phases earned
  // TODO show event when new phase earned with explanation
  // TODO rename phases
  const cardInfo = [
    {
      header: "Longest streak",
      description: "Most longest streak for all the time",
      value: numberMetrics.longestStreak,
    },
    {
      header: "Current Streak",
      description:
        "Most longest streak when all rituals were done in time for selected period",
      value: numberMetrics.currentStreak,
    },
    {
      header: '"No mercy" days',
      description: "Days when everything was done in time",
      value: numberMetrics.noMercyDays,
    },
    {
      header: "Broken reituals",
      description: "Number of times when you broke rituals for selected period",
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
          />
        ))}
      </View>
    </View>
  );
};

export default DisciplineMetrics;
