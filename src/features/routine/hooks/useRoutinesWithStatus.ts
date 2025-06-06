import { useStatisticStore } from "@features/statistic/statisticStore";

import { isToday } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

import { useRoutineStore } from "../routineStore";

export const useRoutinesWithStatus = () => {
  const routines = useRoutineStore((state) => state.routines);
  if (!routines.length) return [];

  const allStatistics = useStatisticStore((state) => state.routineStatistics);

  const routinesWithStatus = routines.map((routine) => {
    const routineStatistic = allStatistics.find(
      (statistic) => statistic.id === routine.id,
    );
    const completion = routineStatistic?.completitions.find((c) =>
      isToday(c.date),
    );

    // TODO
    return {
      ...routine,
      status: completion?.status ?? RoutineStatuses.Undone,
    };
  });

  return routinesWithStatus;
};
