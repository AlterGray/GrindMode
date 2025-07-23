import { calculateRitualStatus } from "@features/rituals/lib/utils";
import { Ritual } from "@features/rituals/ritualTypes";

import { getDaysDiff, getNextDay, isTodayUTC } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

import { StatisticEntry, useRitualStatisticStore } from "../statisticStore";

export const handleNewMissedDays = (stat: StatisticEntry, ritual: Ritual) => {
  const addStatisticEntry =
    useRitualStatisticStore.getState().addCompletionEntry;

  const firstCompletion = stat?.completitions[0];
  if (!firstCompletion) {
    if (calculateRitualStatus(ritual) === RitualStatuses.Missed) {
      addStatisticEntry(
        stat.id,
        RitualStatuses.Missed,
        new Date().toISOString(),
      );
    }

    return;
  }

  const ritualsCountToCheck = getDaysDiff(
    new Date(firstCompletion.date),
    new Date(),
  );

  for (let i = 1; i <= ritualsCountToCheck; i++) {
    const currentCompletion = stat.completitions[i];
    const currentDate = getNextDay(firstCompletion.date, i);

    const missedInPast = !currentCompletion && !isTodayUTC(currentDate);
    const isMissedToday =
      isTodayUTC(currentDate) &&
      calculateRitualStatus(ritual) === RitualStatuses.Missed;

    if (missedInPast || isMissedToday) {
      addStatisticEntry(stat.id, RitualStatuses.Missed, currentDate);
    }
  }
};

export const handleMissedDayTwice = (statId: string) => {
  const markCompletionDeleted =
    useRitualStatisticStore.getState().markCompletionsDeleted;
  const addBrokenDate = useRitualStatisticStore.getState().addBrokenDate;
  const refreshedStat = useRitualStatisticStore
    .getState()
    .statistics.find((s) => s.id === statId);

  if (!refreshedStat) {
    throw new Error(
      `[handleMissedDayTwice] Statistic with id ${statId} not found.`,
    );
  }

  const last14Completions = refreshedStat.completitions.filter(
    (c) => !c.isDeleted,
  );
  const missedDates = last14Completions
    .filter((c) => c.status === RitualStatuses.Missed)
    .map((c) => c.date);

  const today = new Date();
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(today.getDate() - 14);

  const missedWithin14Days = missedDates.filter((dateStr) => {
    const date = new Date(dateStr);
    return date >= fourteenDaysAgo && date <= today;
  });

  if (missedWithin14Days.length > 1) {
    markCompletionDeleted(statId);
    addBrokenDate(statId, missedWithin14Days[missedWithin14Days.length - 1]);
  }
};

export const getActualRitualStatus = (ritualId: string): RitualStatuses => {
  // TODO WHAT faster? this or
  const stats = useRitualStatisticStore.getState().statistics;

  const ritualStat = stats.find((s) => s.id === ritualId);
  if (!ritualStat) return RitualStatuses.Undone;

  const todayEntry = ritualStat.completitions.find((c) => isTodayUTC(c.date));

  return todayEntry?.status ?? RitualStatuses.Undone;
};
