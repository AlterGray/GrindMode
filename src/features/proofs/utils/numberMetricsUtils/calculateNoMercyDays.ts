import {
  CompletionEntry,
  StatisticEntry,
} from "@features/routine/routineStatisticStore";

import { getDateNDaysAgo, isSameDay } from "@shared/lib/utils/date";
import { RoutineStatuses } from "@shared/types/commonTypes";

// calculate longest streak for all rituals
// found longest streak and return it
export const calculateNoMercyDays = (
  statistics: StatisticEntry[],
  days: number,
) => {
  let noMercyDays = 0;
  let completionMap = new Map<string, CompletionEntry[]>();

  // TODO include cleared also
  statistics.forEach((s, i) => {
    const date = getDateNDaysAgo(new Date().toISOString(), days - i);
    const completions = s.completitions.find((c) => isSameDay(date, c.date));

    if (completions) {
      completionMap.set(date, [
        ...(completionMap.get(date) || []),
        completions,
      ]);
    }
  });

  completionMap.forEach((completions) => {
    if (completions.every((c) => c.status === RoutineStatuses.Done)) {
      noMercyDays++;
    }
  });

  return noMercyDays;
};
