import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { isSameDay } from "@shared/lib/utils/date";
import { RitualStatuses } from "@shared/types/commonTypes";

export type CompletionEntry = {
  date: string;
  status: RitualStatuses;
  isDeleted: boolean;
};

// TODO create statistic entry in subscribed way? like when ritual creating?
export type StatisticEntry = {
  id: string;
  createdAt: string;
  brokenDates: string[];
  completitions: CompletionEntry[];
  isDeleted: boolean;
};

type StatisticState = {
  statistics: StatisticEntry[];
  addCompletionEntry: (
    ritualId: string,
    status: RitualStatuses,
    date: string,
  ) => void;
  addStatisticEntry: (ritualId: string, createdAt: string) => void;
  setCompletionEntryStatus: (
    ritualId: string,
    status: RitualStatuses,
    date: string,
  ) => void;
  // TODO DOUBLE if all methods/properties used(check all stores)
  removeStatistic: (ritualId: string) => void;
  markStatisticDeleted: (ritualId: string) => void;
  markCompletionsDeleted: (ritualId: string) => void;
  // TODO rename?
  addBrokenDate: (ritualId: string, date: string) => void;
};

const getStatisticFromStorage = (): StatisticEntry[] => {
  const statistic = storage.getString("statistics");

  return statistic ? JSON.parse(statistic) : [];
};

// TODO two statistic stores
// TODO rename all stuff without "ritual" prefix
export const useRitualStatisticStore = create<StatisticState>()(
  subscribeWithSelector(
    immer((set) => ({
      statistics: getStatisticFromStorage(),
      setCompletionEntryStatus: (
        ritualId: string,
        status: RitualStatuses,
        date: string,
      ) =>
        set((state) => {
          const stat = state.statistics.find((s) => s.id === ritualId);
          const completion = stat?.completitions.find((c) =>
            isSameDay(c.date, date),
          );

          if (completion) {
            completion.status = status;
          }
        }),
      addStatisticEntry: (ritualId, createdAt) => {
        set((state) => {
          state.statistics.push({
            id: ritualId,
            createdAt,
            brokenDates: [],
            completitions: [],
            isDeleted: false,
          });
        });
      },
      // TODO silient type errors
      addCompletionEntry: (ritualId, status, date) =>
        set((state) => {
          const statistics = state.statistics;

          // TODO always exist
          const index = state.statistics.findIndex((s) => s.id === ritualId);

          if (index !== -1) {
            statistics[index].completitions.push({
              date,
              status,
              isDeleted: false,
            });
          } else {
            statistics.push({
              id: ritualId,
              createdAt: new Date().toISOString(),
              brokenDates: [],
              completitions: [{ date, status, isDeleted: false }],
              isDeleted: false,
            });
          }
        }),
      removeStatistic: (ritualId) =>
        set((state) => {
          state.statistics = state.statistics.filter(
            (stat) => stat.id !== ritualId,
          );
        }),
      markStatisticDeleted: (ritualId) => {
        set((state) => {
          state.statistics = state.statistics.filter(
            (stat) => stat.id !== ritualId,
          );
        });
      },
      markCompletionsDeleted: (ritualId) => {
        set((state) => {
          const stat = state.statistics.find((s) => s.id === ritualId);
          if (!stat) {
            if (__DEV__)
              throw new Error(
                `[clearCompletions] Missing stat for ritualId: ${ritualId}`,
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
      addBrokenDate: (ritualId, date) =>
        set((state) => {
          const stat = state.statistics.find((s) => s.id === ritualId);
          if (!stat) {
            if (__DEV__)
              throw new Error(
                `[addBrokenDate] Missing stat for ritualId: ${ritualId}`,
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
    useRitualStatisticStore,
    (state) => state.statistics,
    // TODO hardcode
    "statistics",
  );
