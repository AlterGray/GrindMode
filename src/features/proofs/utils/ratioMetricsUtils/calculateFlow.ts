import { RitualPhaseMap } from "@features/rituals/constants";
import { calculateRitualPhase } from "@features/rituals/lib/utils";
import { Ritual } from "@features/rituals/ritualTypes";
import { StatisticEntry } from "@features/rituals/statisticStore";

import { isDateInLastNDays } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

export const calculateFlow = (
  rituals: Ritual[],
  statistics: StatisticEntry[],
  days: number,
) => {
  // TODO implement in UI "waiting" rituals
  const maxPossiblePoints = rituals.reduce((prev, r) => {
    const statistic = statistics.find((s) => s.id === r.id);
    if (!statistic || !statistic.completitions.length) return prev;
    const phase = calculateRitualPhase(r.id);
    const phaseScale = RitualPhaseMap[phase].value;
    const filteredCompletions = statistic.completitions.filter((c) =>
      isDateInLastNDays(c.date, days),
    );

    return prev + filteredCompletions.length * phaseScale * 10;
  }, 0);

  const earnedPoints = rituals.reduce((prev, r) => {
    const phase = calculateRitualPhase(r.id);
    const statistic = statistics.find((s) => s.id === r.id);
    if (!statistic || !statistic.completitions.length) return prev;

    const filteredCompletions = statistic.completitions.filter((c) =>
      isDateInLastNDays(c.date, days),
    );

    if (!filteredCompletions || !filteredCompletions.length) return prev;

    const phaseScale = RitualPhaseMap[phase].value;
    const donePoints =
      filteredCompletions.filter((c) => c.status === RitualStatuses.Done)
        .length *
      phaseScale *
      10;
    const overduePoints =
      filteredCompletions.filter((c) => c.status === RitualStatuses.Overdue)
        .length *
      8 *
      phaseScale;
    const missedPoints =
      filteredCompletions.filter((c) => c.status === RitualStatuses.Missed)
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
