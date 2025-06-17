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
    .filter((c) => isDateInLastNDays(c.date, 7));

  return {
    ratioMetrics: {
      completionRate: calculateCompletionRate(filteredCompletions),
      consistency: calculateConsistency(rituals, statistics, days),
      noMercy: calculateNoMercy(statistics, days),
    },
    numberMetrics: {
      longestStreak: calculateLongestStreak(statistics, days),
      currentStreak: calculateCurrentStreak(statistics, days),
      noMercyDays: calculateNoMercyDays(statistics, days),
      brokenRituals: calculateBrokenRituals(statistics),
    },
  };
};
