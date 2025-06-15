import { calculateRoutineStatus } from "@features/routine/lib/utils";
import { Routine } from "@features/routine/routineTypes";

import { getDaysDiff, getNextDay, isTodayUTC } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

import {
  StatisticEntry,
  useRoutineStatisticStore,
} from "../routineStatisticStore";

export const handleNewMissedDays = (stat: StatisticEntry, routine: Routine) => {
  const addStatisticEntry =
    useRoutineStatisticStore.getState().addCompletionEntry;

  const firstCompletion = stat?.completitions[0];
  if (!firstCompletion) return;

  const routinesCountToCheck = getDaysDiff(
    new Date(firstCompletion.date),
    new Date(),
  );

  for (let i = 1; i <= routinesCountToCheck; i++) {
    const currentCompletion = stat.completitions[i];
    const currentDate = getNextDay(firstCompletion.date, i);

    const missedInPast = !currentCompletion && !isTodayUTC(currentDate);
    const isMissedToday =
      isTodayUTC(currentDate) &&
      calculateRoutineStatus(routine) === RoutineStatuses.Missed;

    // TODO wring status
    if (missedInPast || isMissedToday) {
      addStatisticEntry(stat.id, RoutineStatuses.Done, currentDate);
    }
  }
};

export const handleMissedFirstDay = (stat: StatisticEntry) => {
  // TODO BAD?
  const clearCompletions = useRoutineStatisticStore.getState().clearCompletions;

  const firstCompletion = stat?.completitions[0];
  if (firstCompletion) {
    const isUndoneStatus = firstCompletion.status === RoutineStatuses.Undone;
    const isFirstDayMissed =
      !isTodayUTC(firstCompletion.date) && isUndoneStatus;
    if (isFirstDayMissed) return clearCompletions(stat.id);
  }

  return false;
};

export const handleMissedDayTwice = (statId: string) => {
  const clearCompletions = useRoutineStatisticStore.getState().clearCompletions;
  const increaseBrokenCount =
    useRoutineStatisticStore.getState().increaseBrokenCount;
  const refreshedStat = useRoutineStatisticStore
    .getState()
    .statistics.find((s) => s.id === statId);

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
    increaseBrokenCount(statId);
  }
};

export const getActualRoutineStatus = (routineId: string): RoutineStatuses => {
  // TODO WHAT faster? this or
  const stats = useRoutineStatisticStore.getState().statistics;

  const routineStat = stats.find((s) => s.id === routineId);
  if (!routineStat) return RoutineStatuses.Undone;

  const todayEntry = routineStat.completitions.find((c) => isTodayUTC(c.date));

  return todayEntry?.status ?? RoutineStatuses.Undone;
};
