import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Routine, RoutineState } from "@features/routine/routineTypes";

import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { RoutineStatuses } from "@shared/types/commonTypes";

const getStoredRoutines = (): Routine[] => {
  const storedRoutinesJSON = storage.getString("routines");
  const storedRoutines = storedRoutinesJSON
    ? JSON.parse(storedRoutinesJSON)
    : [];

  return storedRoutines;
};

export const useRoutineStore = create<RoutineState>()(
  subscribeWithSelector(
    immer((set) => ({
      routines: getStoredRoutines(),
      addRoutine: (routine) => {
        const id = Date.now().toString();

        set((state) => {
          const newRoutine: Routine = {
            id,
            folderIds: [DEFAULT_FOLDER],
            status: RoutineStatuses.Undone,
            actualDuration: 0,
            ...routine,
          };

          state.routines.push(newRoutine);
        });

        return id;
      },
      removeRoutine: (routineId) => {
        set((state) => {
          state.routines = state.routines.filter((r) => r.id !== routineId);
        });
      },
      updateRoutine: (routine) => {
        set((state) => {
          state.routines = state.routines.map((r) =>
            r.id === routine.id ? { ...routine, status: r.status } : r,
          );
        });
      },
      setRoutineStatus: (routineId, status) => {
        set((state) => {
          state.routines = state.routines.map((r) =>
            routineId === r.id ? { ...r, status } : r,
          );
        });
      },
      addRoutinesToFolder: (routineIds, folderId) =>
        set((state) => {
          state.routines = state.routines.map((r) =>
            routineIds.includes(r.id)
              ? { ...r, folderIds: [...r.folderIds, folderId] }
              : r,
          );
        }),
      removeRoutinesFromFolder: (routineIds, folderId) => {
        set((state) => {
          state.routines = state.routines.map((r) =>
            routineIds.includes(r.id)
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

export const useRoutineStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useRoutineStore,
    (state) => state.routines,
    "routines",
  );
