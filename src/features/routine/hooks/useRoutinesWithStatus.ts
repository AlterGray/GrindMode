import { useStatisticStore } from "@features/statistic/statisticStore";

import { isToday } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

import { useRoutineStore } from "../routineStore";

// TODO!! ON NEXT DAY IT STILL HAS STATUS NOT UNDONE!!!!
export const useRoutinesWithStatus = () => {
  const routines = useRoutineStore((state) => state.routines);
  const allStatistics = useStatisticStore((state) => state.routineStatistics);

  const routinesWithStatus = routines.map((routine) => {
    const statistic = allStatistics.find(
      (statistic) => statistic.id === routine.id,
    );

    const completitions = statistic?.completitions!;
    const completion = completitions?.find((c) => isToday(c.date));

    // TODO
    return {
      ...routine,
      status: completion?.status ?? RoutineStatuses.Undone,
    };
  });

  return routinesWithStatus;
};
