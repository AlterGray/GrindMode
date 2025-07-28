import {
  CompletionEntry,
  StatisticEntry,
} from "@features/rituals/statisticStore";

import {
  getDateNDaysAgo,
  getDaysDiff,
  getNextDay,
  isSameDay,
  isTodayUTC,
} from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

export const calculateFlawlessDays = (
  statistics: StatisticEntry[],
  days: number,
) => {
  let flawlessDays = 0;

  let completionMap = new Map<string, CompletionEntry[]>();
  const date = getDateNDaysAgo(new Date().toISOString(), days);
  const daysDiff = getDaysDiff(new Date(date), new Date());

  const dates = Array.from({ length: daysDiff }, (_, i) =>
    getNextDay(date, i + 1),
  );

  dates.forEach((d) => {
    const completions = statistics.map((s) =>
      s.completitions.find((c) => isSameDay(d, c.date)),
    );
    const prevValue = completionMap.get(d) || [];

    completions.forEach((c) => {
      if (c) {
        prevValue.push(c);
      }
    });

    completionMap.set(d, prevValue);
  });

  // TODO add check for waiting rituals
  completionMap.forEach((completions, date) => {
    // TODO hard to read
    const isToday = isTodayUTC(date)
      ? completions.length === statistics.filter((s) => !s.isDeleted).length
      : true;
    const isNotMissed = completions.every(
      (c) =>
        c.status !== RitualStatuses.Missed &&
        c.status !== RitualStatuses.Overdue,
    );

    if (isToday && isNotMissed && completions.length > 0) {
      flawlessDays++;
    }
  });

  return flawlessDays;
};
