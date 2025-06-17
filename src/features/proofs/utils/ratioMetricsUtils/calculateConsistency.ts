import { RoutinePhaseMap } from "@features/routine/constants";
import { calculateRoutinePhase } from "@features/routine/lib/utils";
import { StatisticEntry } from "@features/routine/routineStatisticStore";
import { Routine } from "@features/routine/routineTypes";

import { isDateInLastNDays } from "@shared/lib/utils/date";
import { RoutineStatuses } from "@shared/types/commonTypes";

export const calculateConsistency = (
  routines: Routine[],
  statistics: StatisticEntry[],
  days: number,
) => {
  // TODO implement in UI "waiting" routines
  const maxPossiblePoints = routines.reduce((prev, r) => {
    const statistic = statistics.find((s) => s.id === r.id);
    if (!statistic || !statistic.completitions.length) return prev;
    const phase = calculateRoutinePhase(r.id);
    const phaseScale = RoutinePhaseMap[phase].value;
    const filteredCompletions = statistic.completitions.filter((c) =>
      isDateInLastNDays(c.date, days),
    );

    return prev + filteredCompletions.length * phaseScale * 10;
  }, 0);

  const earnedPoints = routines.reduce((prev, r) => {
    const phase = calculateRoutinePhase(r.id);
    const statistic = statistics.find((s) => s.id === r.id);
    if (!statistic || !statistic.completitions.length) return prev;

    const filteredCompletions = statistic.completitions.filter((c) =>
      isDateInLastNDays(c.date, days),
    );

    if (!filteredCompletions || !filteredCompletions.length) return prev;

    const phaseScale = RoutinePhaseMap[phase].value;
    const donePoints =
      filteredCompletions.filter((c) => c.status === RoutineStatuses.Done)
        .length *
      phaseScale *
      10;
    const overduePoints =
      filteredCompletions.filter((c) => c.status === RoutineStatuses.Overdue)
        .length *
      8 *
      phaseScale;
    const missedPoints =
      filteredCompletions.filter((c) => c.status === RoutineStatuses.Missed)
        .length *
      1.25 *
      phaseScale;

    return (
      prev +
      donePoints +
      overduePoints -
      missedPoints -
      statistic.brokenDates.length * 3 * phaseScale
    );
  }, 0);

  return earnedPoints / maxPossiblePoints;
};
