import { StatisticEntry } from "@features/rituals/statisticStore";

import { getDaysDiff } from "@shared/lib/utils/date";

// TODO move it to another file?
export const findFirstDay = (statistics: StatisticEntry[]) => {
  const firstDay = statistics
    .flatMap((s) => s.completitions)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )[0].date;
  return firstDay;
};

export const getActiveDaysCount = (
  statistics: StatisticEntry[],
  limitDays: number,
) => {
  const activeDays = new Set<string>();

  for (const stat of statistics) {
    for (const comp of stat.completitions) {
      const date = comp.date.slice(0, 10); // 'YYYY-MM-DD'
      activeDays.add(date);
    }
  }

  // Only consider last `limitDays`
  const today = new Date();
  const validDates = Array.from(activeDays).filter((dateStr) => {
    const date = new Date(dateStr);
    const diff = getDaysDiff(date, today);
    return diff < limitDays || limitDays === -1;
  });

  return validDates.length;
};
