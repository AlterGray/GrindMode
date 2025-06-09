import { useEffect } from "react";

import {
  StatisticEntry,
  useStatisticStore,
} from "@features/statistic/statisticStore";
import {
  handleMissedDayTwice,
  handleMissedFirstDay,
  handleNewMissedDays,
} from "@features/statistic/utils";

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

export const useRecalculateMissedRoutines = () => {
  useEffect(() => {
    const intervalID = setInterval(() => {
      const allStatistic = useStatisticStore.getState().routineStatistics;

      allStatistic.forEach((stat) => {
        processRoutineStatistic(stat);
      });
    }, FIVE_SECONDS);

    return () => clearInterval(intervalID);
  }, []);
};
