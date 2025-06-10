import { useRoutineStatisticStore } from "@features/routine/routineStatisticStore";

import { isTodayUTC } from "@shared/lib/utils/common";

import { useRoutineStore } from "../routineStore";
import { Routine, RoutineInput } from "../routineTypes";
import { getActualRoutineStatus } from "./statisticUtils";
import { calculateRoutineStatus } from "./utils";

// TODO MAKE WHOLE FILE AS A HOOK

// TODO no handle errors anywhere, add it later
// TODO hook????
// allow use select routine even long touching popup
// use some protected time rather than mobile time
export const completeRoutine = (routine: Routine) => {
  const {
    addStatisticEntry,
    setStatisticEntryStatus,
    statistics: allStatistic,
  } = useRoutineStatisticStore.getState();
  const { setRoutineStatus } = useRoutineStore.getState();

  const statistic = allStatistic.find((s) => s.id === routine.id);
  if (statistic?.completitions.some((c) => isTodayUTC(c.date))) return;

  const computedStatus = calculateRoutineStatus(routine);
  const now = new Date().toISOString();

  // TODO always true?
  if (!statistic) {
    addStatisticEntry(routine.id, computedStatus, now);
  } else {
    setStatisticEntryStatus(routine.id, computedStatus, now);
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
