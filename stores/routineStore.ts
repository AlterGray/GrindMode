import { Routine, RoutineState } from '@/app/types/routineTypes';
import { storage } from '@/lib/storage';
import { create } from 'zustand';

const getStoredRoutines = (): Routine[] => {
  const storedRoutines = storage.getString('routines');
  return storedRoutines ? JSON.parse(storedRoutines) : [];
};

export const useRoutineStore = create<RoutineState>((set) => ({
    routines: getStoredRoutines(),
    addRoutine: (routine) => set((state) => {
      const newId = Date.now();
      const newRoutines = [...state.routines, { id: newId.toString(), status: 'undone' as const, actualDuration: 0, ...routine }]; // TODO why as const?
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
          if (r.status === 'undone') {
            const nowTimeMinutes = new Date().getHours() * 60 + new Date().getMinutes();
            const routineTimeMinutes = new Date(r.startTime).getHours() * 60 + new Date(r.startTime).getMinutes();
            const isGood = (nowTimeMinutes - routineTimeMinutes) < 10 && (r.actualDuration - r.expectedDuration) < 15;
            
            r.status = isGood ? 'done' : 'overdue'; // TODO make enums?
          }
      }

      return r;
    });

      storage.set('routines', JSON.stringify(routines));
      return { routines };
    }),
    selectedIds: [],
    setSelectedIds: (ids: string[]) => set(() => ({
      selectedIds: ids,
    })),
}));
