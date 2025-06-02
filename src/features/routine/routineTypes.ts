import { DayType } from "@shared/types/commonTypes";

export type Routine = {
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

export type RoutineInput = Omit<
  Routine,
  "id" | "folderIds" | "status" | "actualDuration"
>;
export type RoutineUpdate = Omit<Routine, "status">;
export type RoutineFormValues = {
  id?: string; // only used in edit
  title: string;
  description: string;
  startTime: number;
  expectedDuration: number;
  days: DayType[];
};

// TODO move it to RoutineList?
export type RoutineState = {
  routines: Routine[];
  selectedIds: string[];
  setSelectedIds: (id: string[]) => void;
  isSelecting: boolean;
  setIsSelecting: (isSelecting: boolean) => void;
  addRoutine: (routine: RoutineInput) => void;
  removeRoutines: (routineIds: string[]) => void;
  updateRoutine: (routine: RoutineUpdate) => void;
  completeRoutines: (routineIds: string[]) => void;
  addRoutinesToFolder: (routineIds: string[], folderId: string) => void;
  removeRoutinesFromFolder: (routineIds: string[], folderId: string) => void;
};

export type RoutineStatus = "done" | "undone" | "overdue";
