import { StatisticEntry } from "@features/rituals/statisticStore";

import { getDateNDaysAgo, isSameDay } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

export const calculateNoMercyDays = (
  statistics: StatisticEntry[],
  days: number,
): number => {
  let flawlessDays = 0;

  for (let i = 0; i < days; i++) {
    const dayToCheck = getDateNDaysAgo(new Date().toISOString(), i);

    const allDone = statistics.every((stat) => {
      const completion = stat.completitions.find((c) =>
        isSameDay(c.date, dayToCheck),
      );
      return (
        completion &&
        (completion.status === RitualStatuses.Done ||
          completion.status === RitualStatuses.Overdue)
      );
    });

    if (allDone && statistics.length > 0) {
      flawlessDays++;
    }
  }

  return flawlessDays;
};
