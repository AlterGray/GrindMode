import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { isToday } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

type CompletionEntry = {
  date: string;
  status: RoutineStatuses;
};

type RoutineStatistic = {
  id: string;
  total: number;
  completitions: CompletionEntry[];
};

type StatisticState = {
  routineStatistics: RoutineStatistic[];
  setRoutineStatistics: (statistics: RoutineStatistic[]) => void;
  addRoutineStatisticEntry: (
    routineId: string,
    status: RoutineStatuses,
  ) => void;
  removeRoutineStatistic: (routineId: string) => void;
};

const getStatisticFromStorage = (): RoutineStatistic[] => {
  const statistic = storage.getString("statistics");

  return statistic ? JSON.parse(statistic) : [];
};

// use immer
// TODO implement comeback to prev phase
export const useStatisticStore = create<StatisticState>()(
  subscribeWithSelector((set) => ({
    routineStatistics: getStatisticFromStorage(),
    setRoutineStatistics: (statistics) =>
      set({ routineStatistics: statistics }),
    // TODO silient type errors
    addRoutineStatisticEntry: (routineId, status) =>
      set((state) => {
        // TODO TODO TODO introduce standarizated day
        const today = new Date().toISOString();
        const stats = state.routineStatistics;

        const existing = stats.find((s) => s.id === routineId);
        const isTodayAlreadyLogged = existing?.completitions.some((c) =>
          isToday(c.date),
        );

        if (isTodayAlreadyLogged) return state;

        let updatedStats: RoutineStatistic[];

        if (existing) {
          // Add new entry to existing routine
          updatedStats = stats.map((s) =>
            s.id === routineId
              ? {
                  ...s,
                  completitions: [...s.completitions, { date: today, status }],
                }
              : s,
          );
        } else {
          // Create new routine statistic
          updatedStats = [
            ...stats,
            {
              id: routineId,
              total: 0,
              completitions: [{ date: today, status }],
            },
          ];
        }

        return {
          routineStatistics: updatedStats,
        };
      }),

    removeRoutineStatistic: (routineId) =>
      set((state) => ({
        routineStatistics: state.routineStatistics.filter(
          (r) => routineId !== r.id,
        ),
      })),
  })),
);

export const getRoutineStatusFromStatistic = (
  routineId: string,
): RoutineStatuses => {
  const today = new Date();
  // TODO WHAT faster? this or
  const stats = useStatisticStore.getState().routineStatistics;

  const routineStat = stats.find((s) => s.id === routineId);
  if (!routineStat) return RoutineStatuses.Undone;

  const todayEntry = routineStat.completitions.find((c) => {
    const entryDate = new Date(c.date);
    return (
      entryDate.getFullYear() === today.getFullYear() &&
      entryDate.getMonth() === today.getMonth() &&
      entryDate.getDate() === today.getDate()
    );
  });

  return todayEntry?.status ?? RoutineStatuses.Undone;
};

export const useStatisticStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useStatisticStore,
    (state) => state.routineStatistics,
    // TODO hardcode
    "statistics",
  );
