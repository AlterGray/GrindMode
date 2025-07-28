import { useRitualStore } from "@features/rituals/ritualStore";
import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { getDaysDiff, isDateInLastNDays } from "@shared/lib/utils/date";

import { findFirstDay } from "./common";
import { calculateBrokenRituals } from "./numberMetricsUtils/calculateBrokenRituals";
import { calculateCurrentStreak } from "./numberMetricsUtils/calculateCurrentStreak";
import { calculateFlawlessDays } from "./numberMetricsUtils/calculateFlawlessDays";
import { calculateLongestStreak } from "./numberMetricsUtils/calculateLongestStreak";
import { calculateCompletionRate } from "./ratioMetricsUtils/calculateCompletionRate";
import { calculateFlawless } from "./ratioMetricsUtils/calculateFlawless";
import { calculateFlow } from "./ratioMetricsUtils/calculateFlow";

export const useMetrics = (days: number) => {
  const rituals = useRitualStore((state) => state.rituals);
  const statistics = useRitualStatisticStore((state) => state.statistics);

  if (
    statistics.length === 0 ||
    statistics.flatMap((s) => s.completitions).length === 0
  ) {
    return {
      ratioMetrics: {
        completionRate: 0,
        flow: 0,
        flawless: 0,
      },
      numberMetrics: {
        longestStreak: 0,
        currentStreak: 0,
        flawlessDays: 0,
        brokenRituals: 0,
      },
    };
  }

  const daysDiff = getDaysDiff(new Date(), new Date(findFirstDay(statistics)));
  const adjustedDays = days >= 0 ? days : daysDiff + 1;

  const filteredCompletions = statistics
    .flatMap((s) => s.completitions)
    .filter((c) => isDateInLastNDays(c.date, adjustedDays));

  return {
    ratioMetrics: {
      completionRate: calculateCompletionRate(filteredCompletions),
      flow: calculateFlow(rituals, statistics, adjustedDays),
      flawless: calculateFlawless(statistics, adjustedDays),
    },
    numberMetrics: {
      longestStreak: calculateLongestStreak(statistics, adjustedDays),
      currentStreak: calculateCurrentStreak(statistics, adjustedDays),
      flawlessDays: calculateFlawlessDays(statistics, adjustedDays),
      brokenRituals: calculateBrokenRituals(statistics),
    },
  };
};
