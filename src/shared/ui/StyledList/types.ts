import { RoutineStatus } from "@features/routine/routineTypes";

// TODO ROUTINE_STATUS DOESN'T SHARED ITS ONLY FOR ROUTINE
type ItemData = {
  id: string;
  title: string;
  status: RoutineStatus;
};

export { ItemData };
