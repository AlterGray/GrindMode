import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

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
  subscribeWithSelector((set) => ({
    routines: getStoredRoutines(),
    addRoutine: (routine) => {
      const newRoutine: Routine = {
        id: Date.now().toString(),
        folderIds: [DEFAULT_FOLDER],
        status: RoutineStatuses.Undone,
        actualDuration: 0,
        ...routine,
      };

      set((state) => ({
        routines: [...state.routines, newRoutine],
      }));

      return newRoutine.id;
    },
    removeRoutine: (routineId) =>
      set((state) => {
        const newRoutines = state.routines.filter((r) => routineId !== r.id);
        return { routines: newRoutines };
      }),
    updateRoutine: (routine) =>
      set((state) => {
        const newRoutines = state.routines.map((r) =>
          r.id === routine.id ? { ...routine, status: r.status } : r,
        );
        return { routines: newRoutines };
      }),
    setRoutineStatus: (routineId, status) =>
      set((state) => {
        const newRoutines = state.routines.map((r) => {
          if (routineId === r.id) {
            return {
              ...r,
              status,
            };
          }
          return r;
        });

        return { routines: newRoutines };
      }),
    addRoutinesToFolder: (routineIds, folderId) =>
      set((state) => {
        const newRoutines = state.routines.map((r) =>
          routineIds.includes(r.id)
            ? { ...r, folderIds: [...r.folderIds, folderId] }
            : r,
        );

        return { routines: newRoutines };
      }),
    removeRoutinesFromFolder: (routineIds, folderId) =>
      set((state) => {
        const newRoutines = state.routines.map((r) =>
          routineIds.includes(r.id)
            ? { ...r, folderIds: r.folderIds.filter((id) => id !== folderId) }
            : r,
        );

        return { routines: newRoutines };
      }),
    // TODO TODO TODO TODO TODO TODO
    selectedIds: [],
    setSelectedIds: (ids) => set(() => ({ selectedIds: ids })),
    isSelecting: false,
    setIsSelecting: (isSelecting) => set(() => ({ isSelecting })),
  })),
);

export const useRoutineStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useRoutineStore,
    (state) => state.routines,
    "routines",
  );
