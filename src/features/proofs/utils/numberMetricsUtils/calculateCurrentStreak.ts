import { StatisticEntry } from "@features/rituals/statisticStore";

import { getDaysDiff, isDateInLastNDays } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

import { calculateLongestStreak } from "./calculateLongestStreak";

// find last missed day within given period and start calculate streak from it
export const calculateCurrentStreak = (
  statistics: StatisticEntry[],
  days: number,
) => {
  let lastMissedCompletionDate: string = "";
  const brokenDates = statistics
    .flatMap((s) => s.brokenDates)
    .filter((d) => isDateInLastNDays(d, days));
  brokenDates.forEach((date) => {
    if (date > lastMissedCompletionDate) {
      lastMissedCompletionDate = date;
    }
  });

  statistics.forEach((s) => {
    const completions = s.completitions.filter((c) =>
      isDateInLastNDays(c.date, days),
    );

    completions.forEach((c) => {
      const isSkipped = c.status === RitualStatuses.Missed;
      const isDateNotInitialized = lastMissedCompletionDate === "";
      const isIteratedDateGreater = c.date > lastMissedCompletionDate;

      if (isSkipped && (isDateNotInitialized || isIteratedDateGreater)) {
        lastMissedCompletionDate = c.date;
      }
    });
  });

  if (lastMissedCompletionDate === "") {
    return calculateLongestStreak(statistics, days);
  }

  const dayDiff = getDaysDiff(new Date(lastMissedCompletionDate), new Date());

  return calculateLongestStreak(statistics, dayDiff);
};
