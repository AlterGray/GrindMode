import { RoutineStatuses } from "@shared/types/commonTypes";

// TODO ROUTINE_STATUS DOESN'T SHARED ITS ONLY FOR ROUTINE
export type ItemData = {
  id: string;
  title: string;
  status: RoutineStatuses;
};
