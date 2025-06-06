import {
  getRoutineStatusFromStatistic,
  useStatisticStore,
} from "@features/statistic/statisticStore";

import { useRoutineStore } from "../routineStore";
import { Routine, RoutineInput } from "../routineTypes";
import { calculateRoutineStatus } from "./utils";

// TODO no handle errors anywhere, add it later
// TODO hook????
export const completeRoutine = (routine: Routine) => {
  const addRoutineStatisticEntry =
    useStatisticStore.getState().addRoutineStatisticEntry;
  const setRoutineStatus = useRoutineStore.getState().setRoutineStatus;

  const computedStatus = calculateRoutineStatus(routine);

  addRoutineStatisticEntry(routine.id, computedStatus);

  const syncedStatus = getRoutineStatusFromStatistic(routine.id);
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
  const removeEntryFromStatistic =
    useStatisticStore.getState().removeRoutineStatistic;

  removeRoutine(routineId);
  removeEntryFromStatistic(routineId);
};
