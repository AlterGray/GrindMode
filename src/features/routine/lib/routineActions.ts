import { useRoutineStatisticStore } from "@features/routine/routineStatisticStore";

import { isToday } from "@shared/lib/utils/common";

import { useRoutineStore } from "../routineStore";
import { Routine, RoutineInput } from "../routineTypes";
import { getActualRoutineStatus } from "./statisticUtils";
import { calculateRoutineStatus } from "./utils";

// TODO no handle errors anywhere, add it later
// TODO hook????
// allow use select routine even long touching popup
// use some protected time rather than mobile time
export const completeRoutine = (routine: Routine) => {
  const addStatisticEntry =
    useRoutineStatisticStore.getState().addStatisticEntry;
  const setRoutineStatus = useRoutineStore.getState().setRoutineStatus;
  const setStatisticEntryStatus =
    useRoutineStatisticStore.getState().setStatisticEntryStatus;
  const allStatistic = useRoutineStatisticStore.getState().statistics;
  const statistic = allStatistic.find((s) => s.id === routine.id);

  if (statistic?.completitions.some((c) => isToday(c.date))) return;

  const computedStatus = calculateRoutineStatus(routine);
  if (!statistic || !statistic.completitions.find((c) => isToday(c.date))) {
    addStatisticEntry(routine.id, computedStatus, new Date().toISOString());
  } else {
    setStatisticEntryStatus(
      routine.id,
      computedStatus,
      new Date().toISOString(),
    );
  }

  const syncedStatus = getActualRoutineStatus(routine.id);
  setRoutineStatus(routine.id, syncedStatus);
};

export const createRoutine = (routine: RoutineInput) => {
  const addRoutine = useRoutineStore.getState().addRoutine;

  addRoutine({
    title: routine.title.trim(),
    description: routine.description.trim(),
    startTime: routine.startTime,
    expectedDuration: routine.expectedDuration,
    days: routine.days,
  });
};

// TODO vs destruction?
export const removeRoutine = (routineId: string) => {
  const removeRoutine = useRoutineStore.getState().removeRoutine;
  const removeStatistic = useRoutineStatisticStore.getState().removeStatistic;

  removeRoutine(routineId);
  // TODO make it optional?
  removeStatistic(routineId);
};
