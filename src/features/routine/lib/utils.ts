import { useStatisticStore } from "@features/statistic/statisticStore";

import { RoutineStatuses } from "@shared/types/commonTypes";

import { RoutinePhaseMap } from "../constants";
import { Routine, RoutinePhase } from "../routineTypes";

export const calculateRoutinePhase = (routineId: string) => {
  // TODO rename as even u was confused what it is
  const routineStatistics = useStatisticStore.getState().routineStatistics;
  const routineStat = routineStatistics.find((stat) => stat.id === routineId);

  // TODO
  if (routineStat == undefined) return RoutinePhase.Initiation;

  const completionsCount = routineStat?.completitions.length ?? 0;

  if (completionsCount <= RoutinePhaseMap[RoutinePhase.Initiation].to)
    return RoutinePhase.Initiation;

  if (completionsCount <= RoutinePhaseMap[RoutinePhase.Consolidation].to)
    return RoutinePhase.Consolidation;

  if (completionsCount <= RoutinePhaseMap[RoutinePhase.Stabilization].to)
    return RoutinePhase.Stabilization;

  return RoutinePhase.DeepIntegration;
};

export const getRoutinePhaseDays = (routineId: string) => {
  const allroutineStatistics = useStatisticStore.getState().routineStatistics;
  const routineStatistic = allroutineStatistics.find(
    (stat) => stat.id === routineId,
  );
  const routinePhase = calculateRoutinePhase(routineId);
  const routinePhaseFrom = RoutinePhaseMap[routinePhase].from;
  const completionsCount = routineStatistic?.completitions.length ?? 0;

  // TODO improve it
  const isInitiationPhase =
    calculateRoutinePhase(routineId) === RoutinePhase.Initiation;
  const adjustedPhaseFrom = isInitiationPhase
    ? routinePhaseFrom
    : routinePhaseFrom - 1;

  if (routineStatistic === undefined || completionsCount === 0) return 0;
  else return completionsCount - adjustedPhaseFrom;
};

export const calculateRoutineStatus = (routine: Routine) => {
  if (!routine.startTime) return RoutineStatuses.Done;

  const startTime = new Date(routine.startTime);
  const nowTime = new Date(Date.now());

  const delta = nowTime.getMinutes() - startTime.getMinutes();

  if (delta > 90) return RoutineStatuses.Missed;
  else if (delta > 10) return RoutineStatuses.Overdue;
  else return RoutineStatuses.Done;
};
