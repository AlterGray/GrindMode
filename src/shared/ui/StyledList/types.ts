import { RoutineStatus } from "@features/routine/routineTypes";

// TODO ROUTINE_STATUS DOESN'T SHARED ITS ONLY FOR ROUTINE
export type ItemData = {
  id: string;
  title: string;
  status: RoutineStatus;
};
