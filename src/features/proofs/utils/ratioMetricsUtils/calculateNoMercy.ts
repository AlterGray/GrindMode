import { StatisticEntry } from "@features/routine/routineStatisticStore";

import { calculateNoMercyDays } from "../numberMetricsUtils/calculateNoMercyDays";

export const calculateNoMercy = (
  statistics: StatisticEntry[],
  days: number,
): number => {
  const flawlessDays = calculateNoMercyDays(statistics, days);

  return flawlessDays / days;
};
