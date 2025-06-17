import { RitualStatuses } from "@shared/types/commonTypes";

// TODO RITUAL_STATUS DOESN'T SHARED ITS ONLY FOR RITUAL
export type ItemData = {
  id: string;
  title: string;
  status: RitualStatuses;
};
