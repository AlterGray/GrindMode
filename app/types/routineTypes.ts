import { DayType } from "./commonTypes";

export type Routine = {
  id: string;
  title: string;
  description: string;
  status: "undone" | "done" | "overdue";
  startTime: number;
  expectedDuration: number;
  actualDuration: number;
  days: DayType[];
};

export type RoutineState = {
  routines: Routine[];
  addRoutine: (
    routine: Omit<Routine, "id" | "status" | "actualDuration">,
  ) => void;
  removeRoutines: (routineIds: string[]) => void;
  updateRoutine: (routine: Omit<Routine, "status">) => void;
  completeRoutines: (routineIds: string[]) => void;
  selectedIds: string[];
  setSelectedIds: (id: string[]) => void;
};
