import { StatisticEntry } from "@features/rituals/statisticStore";

import { getActiveDaysCount } from "../common";
import { calculateNoMercyDays } from "../numberMetricsUtils/calculateNoMercyDays";

export const calculateNoMercy = (
  statistics: StatisticEntry[],
  days: number,
): number => {
  const flawlessDays = calculateNoMercyDays(statistics, days);

  const activeDays = getActiveDaysCount(statistics, days);
  if (activeDays === 0) return 0;

  return flawlessDays / activeDays;
};
