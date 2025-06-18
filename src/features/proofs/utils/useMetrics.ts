import { useRitualStore } from "@features/rituals/ritualStore";
import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { isDateInLastNDays } from "@shared/lib/utils/date";

import { calculateBrokenRituals } from "./numberMetricsUtils/calculateBrokenRituals";
import { calculateCurrentStreak } from "./numberMetricsUtils/calculateCurrentStreak";
import { calculateLongestStreak } from "./numberMetricsUtils/calculateLongestStreak";
import { calculateNoMercyDays } from "./numberMetricsUtils/calculateNoMercyDays";
import { calculateCompletionRate } from "./ratioMetricsUtils/calculateCompletionRate";
import { calculateConsistency } from "./ratioMetricsUtils/calculateConsistency";
import { calculateNoMercy } from "./ratioMetricsUtils/calculateNoMercy";

export const useMetrics = (days: number) => {
  const rituals = useRitualStore((state) => state.rituals);
  const statistics = useRitualStatisticStore((state) => state.statistics);
  const adjustedDays = days >= 0 ? days : 99999;

  if (statistics.length === 0) {
    return {
      ratioMetrics: {
        completionRate: 0,
        consistency: 0,
        noMercy: 0,
      },
      numberMetrics: {
        longestStreak: 0,
        currentStreak: 0,
        noMercyDays: 0,
        brokenRituals: 0,
      },
    };
  }

  const filteredCompletions = statistics
    .flatMap((s) => s.completitions)
    .filter((c) => isDateInLastNDays(c.date, adjustedDays));

  return {
    ratioMetrics: {
      completionRate: calculateCompletionRate(filteredCompletions),
      consistency: calculateConsistency(rituals, statistics, adjustedDays),
      noMercy: calculateNoMercy(statistics, adjustedDays),
    },
    numberMetrics: {
      longestStreak: calculateLongestStreak(statistics, adjustedDays),
      currentStreak: calculateCurrentStreak(statistics, adjustedDays),
      noMercyDays: calculateNoMercyDays(statistics, adjustedDays),
      brokenRituals: calculateBrokenRituals(statistics),
    },
  };
};
