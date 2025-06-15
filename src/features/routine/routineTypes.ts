import { Ionicons } from "@expo/vector-icons";

import { DayType, RoutineStatuses } from "@shared/types/commonTypes";

// TODO status both in routine and statistic??????
export type Routine = {
  id: string;
  folderIds: string[];
  title: string;
  description: string;
  status: RoutineStatuses;
  startTime: number;
  expectedDuration: number;
  actualDuration: number;
  // TODO bad name
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
  addRoutine: (routine: RoutineInput) => string;
  removeRoutine: (routineId: string) => void;
  updateRoutine: (routine: RoutineUpdate) => void;
  setRoutineStatus: (routineId: string, status: RoutineStatuses) => void;
  addRoutinesToFolder: (routineIds: string[], folderId: string) => void;
  removeRoutinesFromFolder: (routineIds: string[], folderId: string) => void;
};

// TODO make same for folder colors?
// TODO make a type?
export enum RoutinePhase {
  Initiation = "INITIATION",
  Consolidation = "CONSOLIDATION",
  Stabilization = "STABILIZATION",
  DeepIntegration = "DEEP_INTEGRATION",
}

// TODO align order of status values in all records, switches
export type StatusVariantsType = {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  bgColor: string;
  text: string;
};
