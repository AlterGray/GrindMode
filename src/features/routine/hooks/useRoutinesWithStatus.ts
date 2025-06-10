import { useRoutineStatisticStore } from "@features/routine/routineStatisticStore";

import { isTodayUTC } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

import { useRoutineStore } from "../routineStore";

// TODO!! ON NEXT DAY IT STILL HAS STATUS NOT UNDONE!!!!
export const useRoutinesWithStatus = () => {
  const routines = useRoutineStore((state) => state.routines);
  const statistics = useRoutineStatisticStore((state) => state.statistics);

  const routinesWithStatus = routines.map((routine) => {
    const statistic = statistics.find(
      (statistic) => statistic.id === routine.id,
    );

    const completitions = statistic?.completitions!;
    const completion = completitions?.find((c) => isTodayUTC(c.date));

    // TODO
    return {
      ...routine,
      status: completion?.status ?? RoutineStatuses.Undone,
    };
  });

  return routinesWithStatus;
};
