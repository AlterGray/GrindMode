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
    addCompletionEntry,
    setCompletionEntryStatus,
    statistics: allStatistic,
  } = useRoutineStatisticStore.getState();
  const { setRoutineStatus } = useRoutineStore.getState();

  const statistic = allStatistic.find((s) => s.id === routine.id);
  if (statistic?.completitions.some((c) => isTodayUTC(c.date))) return;

  const computedStatus = calculateRoutineStatus(routine);
  const now = new Date().toISOString();

  // TODO always true?
  if (!statistic?.completitions.some((c) => isTodayUTC(c.date))) {
    addCompletionEntry(routine.id, computedStatus, now);
  } else {
    setCompletionEntryStatus(routine.id, computedStatus, now);
  }

  const syncedStatus = getActualRoutineStatus(routine.id);
  setRoutineStatus(routine.id, syncedStatus);
};

// TODO USE HOOK(like useRoutineActions())
export const createRoutine = (routine: RoutineInput) => {
  const addRoutine = useRoutineStore.getState().addRoutine;
  const addStatisticEntry =
    useRoutineStatisticStore.getState().addStatisticEntry;

  const id = addRoutine({
    title: routine.title.trim(),
    description: routine.description.trim(),
    startTime: routine.startTime,
    expectedDuration: routine.expectedDuration,
    days: routine.days,
  });
  addStatisticEntry(id, new Date().toISOString());
};

// TODO vs destruction?
export const removeRoutine = (routineId: string) => {
  const removeRoutine = useRoutineStore.getState().removeRoutine;
  const removeStatistic = useRoutineStatisticStore.getState().removeStatistic;

  removeRoutine(routineId);
  // TODO make it optional?
  removeStatistic(routineId);
};
