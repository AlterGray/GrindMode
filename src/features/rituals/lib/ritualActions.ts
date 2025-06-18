import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { isTodayUTC } from "@shared/lib/utils/date";

import { useRitualStore } from "../ritualStore";
import { Ritual, RitualInput } from "../ritualTypes";
import { getActualRitualStatus } from "./statisticUtils";
import { calculateRitualStatus } from "./utils";

// TODO MAKE WHOLE FILE AS A HOOK

// TODO no handle errors anywhere, add it later
// TODO use hook????
// allow use select ritual even long touching popup
// use some protected time rather than mobile time
export const completeRitual = (ritual: Ritual) => {
  const {
    addCompletionEntry,
    setCompletionEntryStatus,
    statistics: allStatistic,
  } = useRitualStatisticStore.getState();
  const { setRitualStatus } = useRitualStore.getState();

  const statistic = allStatistic.find((s) => s.id === ritual.id);
  if (statistic?.completitions.some((c) => isTodayUTC(c.date))) return;

  const computedStatus = calculateRitualStatus(ritual);
  const now = new Date().toISOString();

  // TODO always true?
  if (!statistic?.completitions.some((c) => isTodayUTC(c.date))) {
    addCompletionEntry(ritual.id, computedStatus, now);
  } else {
    setCompletionEntryStatus(ritual.id, computedStatus, now);
  }

  const syncedStatus = getActualRitualStatus(ritual.id);
  setRitualStatus(ritual.id, syncedStatus);
};

// TODO USE HOOK(like useRitualActions())
export const createRitual = (ritual: RitualInput) => {
  const addRitual = useRitualStore.getState().addRitual;
  const addStatisticEntry =
    useRitualStatisticStore.getState().addStatisticEntry;

  const id = addRitual({
    title: ritual.title.trim(),
    description: ritual.description.trim(),
    startTime: ritual.startTime,
    expectedDuration: ritual.expectedDuration,
    days: ritual.days,
  });
  addStatisticEntry(id, new Date().toISOString());
};
