import { calculateRoutineStatus } from "@features/routine/lib/utils";
import { Routine } from "@features/routine/routineTypes";

import { getDaysDiff, getNextDay, isToday } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

import { StatisticEntry, useStatisticStore } from "./statisticStore";

export const handleNewMissedDays = (stat: StatisticEntry, routine: Routine) => {
  const addStatisticEntry =
    useStatisticStore.getState().addRoutineStatisticEntry;

  const firstCompletion = stat?.completitions[0];
  if (!firstCompletion) return;

  const routinesCountToCheck = getDaysDiff(
    new Date(firstCompletion.date),
    new Date(),
  );

  for (let i = 1; i <= routinesCountToCheck; i++) {
    const currentCompletion = stat.completitions[i];
    const currentDate = getNextDay(firstCompletion.date, i);

    const missedInPast = !currentCompletion && !isToday(currentDate);
    const isMissedToday =
      isToday(currentDate) &&
      calculateRoutineStatus(routine) === RoutineStatuses.Missed;

    if (missedInPast || isMissedToday) {
      addStatisticEntry(stat.id, RoutineStatuses.Done, currentDate);
    }
  }
};

export const handleMissedFirstDay = (stat: StatisticEntry) => {
  // TODO BAD?
  const clearCompletions = useStatisticStore.getState().clearCompletions;

  const firstCompletion = stat?.completitions[0];
  if (firstCompletion) {
    const isUndoneStatus = firstCompletion.status === RoutineStatuses.Undone;
    const isFirstDayMissed = !isToday(firstCompletion.date) && isUndoneStatus;
    if (isFirstDayMissed) return clearCompletions(stat.id);
  }

  return false;
};

export const handleMissedDayTwice = (statId: string) => {
  const clearCompletions = useStatisticStore((state) => state.clearCompletions);
  const refreshedStat = useStatisticStore
    .getState()
    .routineStatistics.find((s) => s.id === statId);

  if (!refreshedStat) {
    throw new Error(
      `[handleMissedDayTwice] Statistic with id ${statId} not found.`,
    );
  }

  const last14Completions = refreshedStat.completitions;
  const missedDates = last14Completions
    .filter((c) => c.status === RoutineStatuses.Missed)
    .map((c) => c.date);

  const today = new Date();
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(today.getDate() - 14);

  const missedWithin14Days = missedDates.filter((dateStr) => {
    const date = new Date(dateStr);
    return date >= fourteenDaysAgo && date <= today;
  });

  if (missedWithin14Days.length > 1) {
    clearCompletions(statId);
  }
};

export const getActualRoutineStatus = (routineId: string): RoutineStatuses => {
  // TODO WHAT faster? this or
  const stats = useStatisticStore.getState().routineStatistics;

  const routineStat = stats.find((s) => s.id === routineId);
  if (!routineStat) return RoutineStatuses.Undone;

  const todayEntry = routineStat.completitions.find((c) => isToday(c.date));

  return todayEntry?.status ?? RoutineStatuses.Undone;
};
