import { useEffect } from "react";

import {
  StatisticEntry,
  useRitualStatisticStore,
} from "@features/rituals/statisticStore";

import {
  handleMissedDayTwice,
  handleNewMissedDays,
} from "../lib/statisticUtils";
import { useRitualStore } from "../ritualStore";

const FIVE_SECONDS = 1000 * 5;

// TODO unconsistent naming?
const processRitualStatistic = (stat: StatisticEntry) => {
  const rituals = useRitualStore.getState().rituals;
  const ritual = rituals.find((r) => r.id === stat.id);

  if (!ritual) {
    console.warn(
      `[processRitualStatistic] No ritual found for stat.id=${stat.id}`,
    );
    return;
  }

  handleNewMissedDays(stat, ritual);
  handleMissedDayTwice(stat.id);
};

// TODO don't use setInterval in useEffect - create custom hook for this
export const useRecalculateMissedRituals = () => {
  useEffect(() => {
    const intervalID = setInterval(() => {
      const statistics = useRitualStatisticStore.getState().statistics;

      statistics
        .filter((stat) => !stat.isDeleted)
        .forEach((stat) => {
          processRitualStatistic(stat);
        });
    }, FIVE_SECONDS);

    return () => clearInterval(intervalID);
  }, []);
};
