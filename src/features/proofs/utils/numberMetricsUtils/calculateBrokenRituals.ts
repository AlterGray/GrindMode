import { StatisticEntry } from "@features/rituals/statisticStore";

// TODO CALC BROKEN DATES?
export const calculateBrokenRituals = (statistics: StatisticEntry[]) => {
  return statistics.reduce(
    (acc, s) => (s.brokenDates.length > 0 ? acc + s.brokenDates.length : acc),
    0,
  );
};
