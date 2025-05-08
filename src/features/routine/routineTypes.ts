import { DayType } from "../../shared/types/commonTypes";

type Routine = {
  id: string;
  folderId: string;
  title: string;
  description: string;
  status: "undone" | "done" | "overdue";
  startTime: number;
  expectedDuration: number;
  actualDuration: number;
  days: DayType[];
};

type RoutineInput = Omit<
  Routine,
  "id" | "folderId" | "status" | "actualDuration"
>;
type RoutineUpdate = Omit<Routine, "status">;
type RoutineFormValues = {
  id?: string; // only used in edit
  title: string;
  description: string;
  startTime: number;
  expectedDuration: number;
  days: DayType[];
};

type RoutineState = {
  routines: Routine[];
  addRoutine: (routine: RoutineInput) => void;
  removeRoutines: (routineIds: string[]) => void;
  updateRoutine: (routine: RoutineUpdate) => void;
  completeRoutines: (routineIds: string[]) => void;
  selectedIds: string[];
  setSelectedIds: (id: string[]) => void;
};

type RoutineStatus = "done" | "undone" | "overdue";

export {
  Routine,
  RoutineInput,
  RoutineUpdate,
  RoutineFormValues,
  RoutineState,
  RoutineStatus,
};
