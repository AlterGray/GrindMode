import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { isSameDay } from "@shared/lib/utils/date";
import { RoutineStatuses } from "@shared/types/commonTypes";

export type CompletionEntry = {
  date: string;
  status: RoutineStatuses;
  isDeleted: boolean;
};

// TODO create statistic entry in subscribed way? like when routine creating?
export type StatisticEntry = {
  id: string;
  createdAt: string;
  brokenDates: string[];
  completitions: CompletionEntry[];
  isDeleted: boolean;
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
  markStatisticDeleted: (routineId: string) => void;
  markCompletionsDeleted: (routineId: string) => void;
  // TODO rename?
  addBrokenDate: (routineId: string, date: string) => void;
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
            brokenDates: [],
            completitions: [],
            isDeleted: false,
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
            statistics[index].completitions.push({
              date,
              status,
              isDeleted: false,
            });
          } else {
            statistics.push({
              id: routineId,
              createdAt: new Date().toISOString(),
              brokenDates: [],
              completitions: [{ date, status, isDeleted: false }],
              isDeleted: false,
            });
          }
        }),
      removeStatistic: (routineId) =>
        set((state) => {
          state.statistics = state.statistics.filter(
            (stat) => stat.id !== routineId,
          );
        }),
      markStatisticDeleted: (routineId) => {
        set((state) => {
          state.statistics = state.statistics.filter(
            (stat) => stat.id !== routineId,
          );
        });
      },
      markCompletionsDeleted: (routineId) => {
        set((state) => {
          const stat = state.statistics.find((s) => s.id === routineId);
          if (!stat) {
            if (__DEV__)
              throw new Error(
                `[clearCompletions] Missing stat for routineId: ${routineId}`,
              );
            return;
          }
          // TODO here silient error, like if we pass nonexisting property instead of isDeleted
          stat.completitions = stat.completitions.map((c) => {
            return {
              ...c,
              isDeleted: true,
            };
          });
        });
      },
      addBrokenDate: (routineId, date) =>
        set((state) => {
          const stat = state.statistics.find((s) => s.id === routineId);
          if (!stat) {
            if (__DEV__)
              throw new Error(
                `[increaseBrokenCount] Missing stat for routineId: ${routineId}`,
              );
            return;
          }
          stat.brokenDates.push(date);
        }),
    })),
  ),
);

// TODO rename???
export const useStatisticStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useRoutineStatisticStore,
    (state) => state.statistics,
    // TODO hardcode
    "statistics",
  );
