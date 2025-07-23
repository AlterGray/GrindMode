import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { isTodayUTC } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

import { RitualPhaseMap } from "../constants";
import { Ritual, RitualPhase } from "../ritualTypes";

export const calculateRitualPhase = (ritualId: string) => {
  // TODO rename as even u was confused what it is
  const ritualStatistics = useRitualStatisticStore.getState().statistics;
  const ritualStat = ritualStatistics.find((stat) => stat.id === ritualId);

  // TODO
  if (ritualStat === undefined) return RitualPhase.Initiation;

  // TODO bad
  const completionsCount = ritualStat.completitions.filter(
    (c) => !c.isDeleted,
  ).length;

  if (completionsCount <= RitualPhaseMap[RitualPhase.Initiation].to)
    return RitualPhase.Initiation;

  if (completionsCount <= RitualPhaseMap[RitualPhase.Consolidation].to)
    return RitualPhase.Consolidation;

  if (completionsCount <= RitualPhaseMap[RitualPhase.Stabilization].to)
    return RitualPhase.Stabilization;

  return RitualPhase.DeepIntegration;
};

export const getAllRitualDays = (ritualId: string) => {
  const statistics = useRitualStatisticStore.getState().statistics;
  const statistic = statistics.find((stat) => stat.id === ritualId);

  let days: { status: RitualStatuses; index: number }[] = [];

  if (!statistic) return days;

  const completions = statistic.completitions;

  if (completions.length) {
    days = completions
      .filter((c) => !c.isDeleted)
      .map((c, i) => ({ status: c.status, index: i }));
  }

  return days;
};

export const getRitualPhaseMissedDays = (
  ritualId: string,
  phase: RitualPhase,
): number[] => {
  const statistic = useRitualStatisticStore
    .getState()
    .statistics.find((s) => s.id === ritualId);
  if (!statistic) return [];

  const completions = statistic.completitions;
  const { from } = RitualPhaseMap[phase];
  const isInitiationPhase = phase === RitualPhase.Initiation;

  return completions
    .filter((c) => !c.isDeleted)
    .map((c, i) => ({ status: c.status, i }))
    .filter(({ status, i }) => status === RitualStatuses.Missed && i >= from)
    .map(({ i }) => i - (isInitiationPhase ? 0 : from - 1));
};

// TODO duplicated utils file
export const calculateRitualStatus = (ritual: Ritual): RitualStatuses => {
  const noDurationLimit = ritual.isTimeBased && ritual.expectedDuration === 0;

  if (!ritual.isTimeBased || noDurationLimit) {
    return RitualStatuses.Done;
  }

  const start = new Date(ritual.startTime);
  const now = new Date();

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const delta = nowMinutes - startMinutes;

  const expectedDuration = ritual.expectedDuration;
  const overdueThreshold = expectedDuration + expectedDuration * 0.3;
  const missedThreshold = expectedDuration + expectedDuration * 0.6;

  if (delta >= missedThreshold) return RitualStatuses.Missed;
  if (delta >= overdueThreshold) return RitualStatuses.Overdue;

  return RitualStatuses.Done;
};
