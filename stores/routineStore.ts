import { Routine, RoutineState } from "@/app/types/routineTypes";
import { storage } from "@/lib/storage";
import { create } from "zustand";

const getStoredRoutines = (): Routine[] => {
  const storedRoutines = storage.getString("routines");
  return storedRoutines ? JSON.parse(storedRoutines) : [];
};

export const useRoutineStore = create<RoutineState>()((set) => ({
  routines: getStoredRoutines(),
  addRoutine: (routine) =>
    set((state) => {
      const newRoutine: Routine = {
        id: Date.now().toString(),
        status: "undone",
        actualDuration: 0,
        ...routine,
      };
      const newRoutines = [...state.routines, newRoutine];
      storage.set("routines", JSON.stringify(newRoutines));
      return { routines: newRoutines };
    }),
  removeRoutines: (routineIds) =>
    set((state) => {
      const newRoutines = state.routines.filter(
        (r) => !routineIds.includes(r.id),
      );
      storage.set("routines", JSON.stringify(newRoutines));
      return { routines: newRoutines };
    }),
  updateRoutine: (routine) =>
    set((state) => {
      const newRoutines = state.routines.map((r) =>
        r.id === routine.id ? { ...routine, status: r.status } : r,
      );
      storage.set("routines", JSON.stringify(newRoutines));
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
      storage.set("routines", JSON.stringify(newRoutines));
      return { routines: newRoutines };
    }),
  selectedIds: [],
  setSelectedIds: (ids) => set(() => ({ selectedIds: ids })),
}));
