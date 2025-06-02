import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { Routine, RoutineState } from "@features/routine/routineTypes";

import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";

const getStoredRoutines = (): Routine[] => {
  const storedRoutines = storage.getString("routines");
  return storedRoutines ? JSON.parse(storedRoutines) : [];
};

export const useRoutineStore = create<RoutineState>()(
  subscribeWithSelector((set) => ({
    routines: getStoredRoutines(),
    addRoutine: (routine) =>
      set((state) => {
        const newRoutine: Routine = {
          id: Date.now().toString(),
          folderIds: [DEFAULT_FOLDER],
          status: "undone",
          actualDuration: 0,
          ...routine,
        };

        return { routines: [...state.routines, newRoutine] };
      }),
    removeRoutines: (routineIds) =>
      set((state) => {
        const newRoutines = state.routines.filter(
          (r) => !routineIds.includes(r.id),
        );
        return { routines: newRoutines };
      }),
    updateRoutine: (routine) =>
      set((state) => {
        const newRoutines = state.routines.map((r) =>
          r.id === routine.id ? { ...routine, status: r.status } : r,
        );
        return { routines: newRoutines };
      }),
    completeRoutines: (routineIds) =>
      set((state) => {
        const newRoutines = state.routines.map((r) => {
          if (routineIds.includes(r.id) && r.status === "undone") {
            const nowTimeMinutes =
              new Date().getHours() * 60 + new Date().getMinutes();
            const routineTimeMinutes =
              new Date(r.startTime).getHours() * 60 +
              new Date(r.startTime).getMinutes();
            const isGood =
              nowTimeMinutes - routineTimeMinutes < 10 &&
              r.actualDuration - r.expectedDuration < 15;

            return {
              ...r,
              status: isGood ? ("done" as const) : ("overdue" as const),
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
