import { StatisticEntry } from "@features/rituals/statisticStore";

import { getActiveDaysCount } from "../common";
import { calculateFlawlessDays } from "../numberMetricsUtils/calculateFlawlessDays";

export const calculateFlawless = (
  statistics: StatisticEntry[],
  days: number,
): number => {
  const flawlessDays = calculateFlawlessDays(statistics, days);

  const activeDays = getActiveDaysCount(statistics, days);
  if (activeDays === 0) return 0;

  return flawlessDays / activeDays;
};
