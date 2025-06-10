import { useEffect } from "react";

import {
  StatisticEntry,
  useRoutineStatisticStore,
} from "@features/routine/routineStatisticStore";

import {
  handleMissedDayTwice,
  handleMissedFirstDay,
  handleNewMissedDays,
} from "../lib/statisticUtils";
import { useRoutineStore } from "../routineStore";

const FIVE_SECONDS = 1000 * 5;

const processRoutineStatistic = (stat: StatisticEntry) => {
  const routines = useRoutineStore.getState().routines;
  const routine = routines.find((r) => r.id === stat.id);

  if (!routine) {
    console.warn(
      `[processRoutineStatistic] No routine found for stat.id=${stat.id}`,
    );
    return;
  }

  handleMissedFirstDay(stat);
  handleNewMissedDays(stat, routine);
  handleMissedDayTwice(stat.id);
};

// TODO don't use setInterval in useEffect - create custom hook for this
export const useRecalculateMissedRoutines = () => {
  useEffect(() => {
    const intervalID = setInterval(() => {
      const statistics = useRoutineStatisticStore.getState().statistics;

      statistics.forEach((stat) => {
        processRoutineStatistic(stat);
      });
    }, FIVE_SECONDS);

    return () => clearInterval(intervalID);
  }, []);
};
