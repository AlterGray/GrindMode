import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { isSameDay } from "@shared/lib/utils/common";
import { RoutineStatuses } from "@shared/types/commonTypes";

export type CompletionEntry = {
  date: string;
  status: RoutineStatuses;
};

// TODO create statistic entry in subscribed way? like when routine creating?
export type StatisticEntry = {
  id: string;
  createdAt: string;
  brokenCount: number;
  completitions: CompletionEntry[];
};

type RoutineStatisticState = {
  statistics: StatisticEntry[];
  addCompletionEntry: (
    routineId: string,
    status: RoutineStatuses,
    date: string,
  ) => void;
  addStatisticEntry: (routineId: string, createdAt: string) => void;
  setCompletionEntryStatus: (
    routineId: string,
    status: RoutineStatuses,
    date: string,
  ) => void;
  // TODO DOUBLE if all methods/properties used(check all stores)
  removeStatistic: (routineId: string) => void;
  clearCompletions: (routineId: string) => void;
  // TODO rename?
  increaseBrokenCount: (routineId: string) => void;
};

const getStatisticFromStorage = (): StatisticEntry[] => {
  const statistic = storage.getString("statistics");

  return statistic ? JSON.parse(statistic) : [];
};

// TODO rename all stuff without "routine" prefix
export const useRoutineStatisticStore = create<RoutineStatisticState>()(
  subscribeWithSelector(
    immer((set) => ({
      statistics: getStatisticFromStorage(),
      setCompletionEntryStatus: (
        routineId: string,
        status: RoutineStatuses,
        date: string,
      ) =>
        set((state) => {
          const stat = state.statistics.find((s) => s.id === routineId);
          const completion = stat?.completitions.find((c) =>
            isSameDay(c.date, date),
          );

          if (completion) {
            completion.status = status;
          }
        }),
      addStatisticEntry: (routineId, createdAt) => {
        set((state) => {
          state.statistics.push({
            id: routineId,
            createdAt,
            brokenCount: 0,
            completitions: [],
          });
        });
      },
      // TODO silient type errors
      addCompletionEntry: (routineId, status, date) =>
        set((state) => {
          const statistics = state.statistics;

          // TODO always exist
          const index = state.statistics.findIndex((s) => s.id === routineId);

          if (index !== -1) {
            statistics[index].completitions.push({ date, status });
          } else {
            statistics.push({
              id: routineId,
              createdAt: new Date().toISOString(),
              brokenCount: 0,
              completitions: [{ date, status }],
            });
          }
        }),
      removeStatistic: (routineId) =>
        set((state) => {
          state.statistics = state.statistics.filter(
            (stat) => stat.id !== routineId,
          );
        }),
      clearCompletions: (routineId) => {
        set((state) => {
          const stat = state.statistics.find((s) => s.id === routineId);
          if (!stat) {
            if (__DEV__)
              throw new Error(
                `[clearCompletions] Missing stat for routineId: ${routineId}`,
              );
            return;
          }
          stat.completitions = [];
        });
      },
      increaseBrokenCount: (routineId) =>
        set((state) => {
          const stat = state.statistics.find((s) => s.id === routineId);
          if (!stat) {
            if (__DEV__)
              throw new Error(
                `[increaseBrokenCount] Missing stat for routineId: ${routineId}`,
              );
            return;
          }
          stat.brokenCount += 1;
        }),
    })),
  ),
);

export const useStatisticStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useRoutineStatisticStore,
    (state) => state.statistics,
    // TODO hardcode
    "statistics",
  );
