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

// calculate longest streak for all rituals
// found longest streak and return it
export const calculateLongestStreak = (
  statistics: StatisticEntry[],
  days: number,
) => {
  let longestStreak = 0;

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

  // TODO Should it be "global" var?
  let streak = 0;

  // TODO all pages updates when u go through tabs
  // add only if no misses until today for each ritual and no undone rituals
  // TODO add check for waiting rituals
  completionMap.forEach((completions, date) => {
    const isToday = isTodayUTC(date)
      ? completions.length === statistics.filter((s) => !s.isDeleted).length
      : true;
    const isNotMissed = completions.every(
      (c) => c.status !== RitualStatuses.Missed,
    );

    if (isToday && isNotMissed) {
      streak++;
    } else {
      streak = 0;
    }
    longestStreak = Math.max(longestStreak, streak);
  });

  return longestStreak;
};
