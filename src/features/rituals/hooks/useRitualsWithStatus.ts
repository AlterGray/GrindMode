import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { isTodayUTC } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

import { useRitualStore } from "../ritualStore";

// TODO!! ON NEXT DAY IT STILL HAS STATUS NOT UNDONE!!!!
export const useRitualsWithStatus = () => {
  const rituals = useRitualStore((state) => state.rituals);
  const statistics = useRitualStatisticStore((state) => state.statistics);

  const ritualsWithStatus = rituals.map((ritual) => {
    const statistic = statistics.find(
      // TODO
      (statistic) => statistic.id === ritual.id && !statistic.isDeleted,
    );

    const completitions = statistic?.completitions!;
    const completion = completitions?.find((c) => isTodayUTC(c.date));

    // TODO
    return {
      ...ritual,
      status: completion?.status ?? RitualStatuses.Undone,
    };
  });

  return ritualsWithStatus;
};
