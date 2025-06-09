import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { isSameDay, isToday } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

export type CompletionEntry = {
  date: string;
  status: RoutineStatuses;
};

export type StatisticEntry = {
  id: string;
  total: number;
  completitions: CompletionEntry[];
};

type StatisticState = {
  routineStatistics: StatisticEntry[];
  addRoutineStatisticEntry: (
    routineId: string,
    status: RoutineStatuses,
    date: string,
  ) => void;
  setRoutineStatisticEntryStatus: (
    routineId: string,
    status: RoutineStatuses,
    date: string,
  ) => void;
  // TODO DOUBLE if all methods/properties used(check all stores)
  removeRoutineStatistic: (routineId: string) => void;
  clearCompletions: (routineId: string) => void;
};

const getStatisticFromStorage = (): StatisticEntry[] => {
  const statistic = storage.getString("statistics");

  return statistic ? JSON.parse(statistic) : [];
};

// use immer
// TODO implement comeback to prev phase
export const useStatisticStore = create<StatisticState>()(
  subscribeWithSelector((set) => ({
    routineStatistics: getStatisticFromStorage(),
    setRoutineStatisticEntryStatus: (
      routineId: string,
      status: RoutineStatuses,
      date: string,
    ) =>
      set((state) => {
        const newStatistic = state.routineStatistics.map((stat) => {
          if (stat.id === routineId) {
            const newCompletions = stat.completitions.map((completion) => {
              if (isSameDay(completion.date, date))
                return { ...completion, status };
              else return completion;
            });

            return {
              ...stat,
              completitions: newCompletions,
            } as StatisticEntry;
          }

          return stat;
        });

        return { routineStatistics: newStatistic };
      }),
    // TODO silient type errors
    addRoutineStatisticEntry: (routineId, status, date) =>
      set((state) => {
        // TODO TODO TODO introduce standarizated day
        const stats = state.routineStatistics;

        const existingStat = stats.find((s) => s.id === routineId);

        // RETURN IF WE ALREADY COMPLETED
        if (existingStat) {
          const isTodayAlreadyLogged = existingStat.completitions.some(
            (c) => isToday(c.date) && c.status !== RoutineStatuses.Undone,
          );

          if (isTodayAlreadyLogged) return state;
        }

        let updatedStats: StatisticEntry[];
        if (existingStat) {
          // Add new entry to existing routine
          updatedStats = stats.map((s) =>
            s.id === routineId
              ? {
                  ...s,
                  completitions: [...s.completitions, { date, status }],
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
              completitions: [{ date: date, status }],
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
    clearCompletions: (routineId) =>
      set((state) => {
        const newStats = state.routineStatistics.map((s) => {
          if (s.id === routineId) return { ...s, completitions: [] };
          return s;
        });
        return { routineStatistics: newStats };
      }),
  })),
);

export const useStatisticStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useStatisticStore,
    (state) => state.routineStatistics,
    // TODO hardcode
    "statistics",
  );
