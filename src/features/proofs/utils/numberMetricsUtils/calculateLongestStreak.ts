import { calculateRitualStatus } from "@features/rituals/lib/utils";
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
): number => {
  // TODO check same filtration in other places
  const activeStats = statistics.filter((s) => !s.isDeleted);
  if (activeStats.length === 0) return 0;

  let longestStreak = 0;
  let currentStreak = 0;

  const startDate = getDateNDaysAgo(new Date().toISOString(), days);
  const totalDays = getDaysDiff(new Date(startDate), new Date());

  for (let i = 0; i <= totalDays; i++) {
    const currentDate = getNextDay(startDate, i);

    const allCompleted = activeStats.every((stat) => {
      const entry = stat.completitions.find((c) =>
        isSameDay(c.date, currentDate),
      );

      // Treat no completion as UNdone
      const status = entry?.status ?? RitualStatuses.Undone;

      return (
        status !== RitualStatuses.Missed && status !== RitualStatuses.Undone
      );
    });

    if (allCompleted) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return longestStreak;
};
