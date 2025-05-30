import { DayType } from "../../shared/types/commonTypes";

type Routine = {
  id: string;
  folderIds: string[];
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
  "id" | "folderIds" | "status" | "actualDuration"
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
  selectedIds: string[];
  setSelectedIds: (id: string[]) => void;
  addRoutine: (routine: RoutineInput) => void;
  removeRoutines: (routineIds: string[]) => void;
  updateRoutine: (routine: RoutineUpdate) => void;
  completeRoutines: (routineIds: string[]) => void;
  addRoutinesToFolder: (routineIds: string[], folderId: string) => void;
  removeRoutinesFromFolder: (routineIds: string[], folderId: string) => void;
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
