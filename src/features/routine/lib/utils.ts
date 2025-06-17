import { useRoutineStatisticStore } from "@features/routine/routineStatisticStore";

import { isTodayUTC } from "@shared/lib/utils/date";
import { RoutineStatuses } from "@shared/types/commonTypes";

import { RoutinePhaseMap } from "../constants";
import { Routine, RoutinePhase } from "../routineTypes";

export const calculateRoutinePhase = (routineId: string) => {
  // TODO rename as even u was confused what it is
  const routineStatistics = useRoutineStatisticStore.getState().statistics;
  const routineStat = routineStatistics.find((stat) => stat.id === routineId);

  // TODO
  if (routineStat == undefined) return RoutinePhase.Initiation;

  // TODO bad
  const completionsCount = routineStat?.completitions?.length ?? 0;

  if (completionsCount <= RoutinePhaseMap[RoutinePhase.Initiation].to)
    return RoutinePhase.Initiation;

  if (completionsCount <= RoutinePhaseMap[RoutinePhase.Consolidation].to)
    return RoutinePhase.Consolidation;

  if (completionsCount <= RoutinePhaseMap[RoutinePhase.Stabilization].to)
    return RoutinePhase.Stabilization;

  return RoutinePhase.DeepIntegration;
};

export const getAllRoutineDays = (routineId: string) => {
  const statistics = useRoutineStatisticStore.getState().statistics;
  const statistic = statistics.find((stat) => stat.id === routineId);

  let days: { status: RoutineStatuses; index: number }[] = [];

  if (!statistic) return days;

  const completions = statistic.completitions;

  if (completions.length) {
    days = completions.map((c, i) => ({ status: c.status, index: i }));
  }

  return days;
};

export const getRoutinePhaseMissedDays = (
  routineId: string,
  phase: RoutinePhase,
): number[] => {
  const statistic = useRoutineStatisticStore
    .getState()
    .statistics.find((s) => s.id === routineId);
  if (!statistic) return [];

  const completions = statistic.completitions;
  const { from } = RoutinePhaseMap[phase];
  const isInitiationPhase = phase === RoutinePhase.Initiation;

  return completions
    .map((c, i) => ({ status: c.status, i }))
    .filter(({ status, i }) => status === RoutineStatuses.Missed && i >= from)
    .map(({ i }) => i - (isInitiationPhase ? 0 : from - 1));
};

// TODO duplicated utils file
export const calculateRoutineStatus = (routine: Routine) => {
  if (!routine.startTime) return RoutineStatuses.Done;

  const startTime = new Date(routine.startTime);
  const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const nowTime = new Date();
  const nowTimeMinutes = nowTime.getHours() * 60 + nowTime.getMinutes();

  const delta = nowTimeMinutes - startTimeMinutes;

  if (!routine.expectedDuration && isTodayUTC(nowTime.toISOString())) {
    return RoutineStatuses.Done;
  }

  // TODO TODO TODO add checkbox to disable it for some routines
  if (delta > 90) return RoutineStatuses.Missed;
  // TODO remove if user doesn't set duration
  // TODO its should use expected duration not start time!!!!
  else if (delta > 10) return RoutineStatuses.Overdue;
  else return RoutineStatuses.Done;
};
