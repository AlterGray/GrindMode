import { StatisticEntry } from "@features/routine/routineStatisticStore";
import { Routine } from "@features/routine/routineTypes";

import { isDateInLastNDays } from "@shared/lib/utils/date";
import { RoutineStatuses } from "@shared/types/commonTypes";

// TODO wrong calculations
export const calculateNoMercy = (
  rituals: Routine[],
  statistics: StatisticEntry[],
  days: number,
) => {
  const waitingRitualsCount = rituals.reduce((prev, r) => {
    if (r.status === RoutineStatuses.Undone) {
      return prev + 1;
    }
    return prev;
  }, 0);

  let completedRitualCount: number = 0;
  if (statistics.length > 0) {
    completedRitualCount = statistics.reduce((prev, s) => {
      const aa = s.completitions.filter((c) => isDateInLastNDays(c.date, days));
      // TODO clearCompletions brake statistic
      if (aa.length && aa[aa.length - 1].status === RoutineStatuses.Done) {
        return prev + 1;
      }

      return prev;
    }, 0);
  }

  // TODO remove "waiting" rituals count
  return completedRitualCount / (rituals.length - waitingRitualsCount);
};
