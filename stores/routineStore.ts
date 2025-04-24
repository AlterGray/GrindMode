import { storage } from "@/lib/storage";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import { create } from "zustand";

type Routine = {
    id: string;
    title: string;
    description: string;
    status: 'undone' | 'done' | 'overdue' | 'failed';
    timeUntilCompleting: Timestamp;
    expectedDuration: Timestamp;
    timeOfCompliting: Timestamp;
}

type RoutineState = {
    routines: Routine[];
    addRoutine: (routine: Omit<Routine, 'id' | 'status'>) => void;
    removeRoutines: (routineIds: string[]) => void;
    updateRoutine: (routine: Omit<Routine, 'status'>) => void;
    completeRoutines: (routineIds: string[]) => void;
    selectedIds: string[];
    setSelectedIds: (id: string[]) => void;
}

const TEN_MINUTES_MS = 10 * 60 * 1000;

const getStoredRoutines = (): Routine[] => {
  const storedRoutines = storage.getString('routines');
  return storedRoutines ? JSON.parse(storedRoutines) : [];
};

export const useRoutineStore = create<RoutineState>((set) => ({
    routines: getStoredRoutines(),
    addRoutine: (routine) => set((state) => {
      const newRoutines = [...state.routines, { id: Date.now().toString(), status: 'undone' as const, ...routine }]; // TODO why as const?
      storage.set('routines', JSON.stringify(newRoutines));
      return { routines: newRoutines };
    }),
    removeRoutines: (routineIds) => set((state) => {
      let newRoutines: Routine[] = [];
      state.routines.forEach((r) => {
        if (!routineIds.includes(r.id))
          newRoutines.push(r);
      });

      storage.set('routines', JSON.stringify(newRoutines));
      return { routines: newRoutines };
    }),
    updateRoutine: (routine) => set((state) => {
      const newRoutines = state.routines.map(r => r.id === routine.id ? {...routine, status: r.status} : r);
      storage.set('routines', JSON.stringify(newRoutines));
      return { routines: newRoutines };
    }),
    completeRoutines: (routineIds) => set((state) => {
      const routines = state.routines.map((r) => {
        if (routineIds.includes(r.id)) {
          const diff = Math.abs(r.timeUntilCompleting - r.timeOfCompliting);
          if (diff <= TEN_MINUTES_MS || r.timeOfCompliting > r.timeUntilCompleting) {
            const timeOfCompliting = Date.now();
            r.timeOfCompliting = timeOfCompliting;
            
            if (timeOfCompliting > r.timeUntilCompleting) {
              r.status = 'overdue';
            } else {
              r.status = 'done';
            }
            
          }
        }

        return r;
      }, []);

      storage.set('routines', JSON.stringify(routines));
      return { routines };
    }),
    selectedIds: [],
    setSelectedIds: (ids: string[]) => set(() => ({
      selectedIds: ids,
    })),
}));
