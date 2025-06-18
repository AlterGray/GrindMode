import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Ritual, RitualState } from "@features/rituals/ritualTypes";

import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { RitualStatuses } from "@shared/types/commonTypes";

// ZERO DIVIDE ERORRS
const getStoredRituals = (): Ritual[] => {
  const storedRitualsJSON = storage.getString("rituals");
  const storedRituals = storedRitualsJSON ? JSON.parse(storedRitualsJSON) : [];

  return storedRituals;
};

// TODO
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

// TODO extract methods
export const useRitualStore = create<RitualState>()(
  subscribeWithSelector(
    immer((set) => ({
      rituals: getStoredRituals(),
      addRitual: (ritual) => {
        const id = generateId();

        set((state) => {
          const newRitual: Ritual = {
            id,
            folderIds: [DEFAULT_FOLDER],
            status: RitualStatuses.Undone,
            actualDuration: 0,
            ...ritual,
          };

          state.rituals.push(newRitual);
        });

        return id;
      },
      removeRitual: (ritualId) => {
        set((state) => {
          state.rituals = state.rituals.filter((r) => r.id !== ritualId);
        });
      },
      updateRitual: (ritual) => {
        set((state) => {
          state.rituals = state.rituals.map((r) =>
            r.id === ritual.id ? { ...ritual, status: r.status } : r,
          );
        });
      },
      setRitualStatus: (ritualId, status) => {
        set((state) => {
          state.rituals = state.rituals.map((r) =>
            ritualId === r.id ? { ...r, status } : r,
          );
        });
      },
      addRitualsToFolder: (ritualIds, folderId) =>
        set((state) => {
          state.rituals = state.rituals.map((r) =>
            ritualIds.includes(r.id)
              ? { ...r, folderIds: [...r.folderIds, folderId] }
              : r,
          );
        }),
      removeRitualsFromFolder: (ritualIds, folderId) => {
        set((state) => {
          state.rituals = state.rituals.map((r) =>
            ritualIds.includes(r.id)
              ? { ...r, folderIds: r.folderIds.filter((id) => id !== folderId) }
              : r,
          );
        });
      },
      // TODO TODO TODO TODO TODO TODO
      selectedIds: [],
      setSelectedIds: (ids) => set(() => ({ selectedIds: ids })),
      isSelecting: false,
      setIsSelecting: (isSelecting) => set(() => ({ isSelecting })),
    })),
  ),
);

export const useRitualStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useRitualStore,
    (state) => state.rituals,
    "rituals",
  );
