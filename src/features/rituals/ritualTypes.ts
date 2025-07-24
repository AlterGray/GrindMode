import { StyleProp, ViewStyle } from "react-native";
import { AnimatedStyle } from "react-native-reanimated";

import { IoniconsName } from "@shared/types/commonTypes";
import { DayType, RitualStatuses } from "@shared/types/commonTypes";
import { ColorName } from "@shared/types/themeTypes";

// TODO status both in ritual and statistic??????
export type Ritual = {
  id: string;
  folderIds: string[];
  title: string;
  status: RitualStatuses;
  startTime: number;
  expectedDuration: number;
  actualDuration: number;
  // TODO bad name
  days: DayType[];
  isTimeBased: boolean;
  isDeleted: boolean;
};

export type RitualInput = Omit<
  Ritual,
  "id" | "folderIds" | "status" | "actualDuration" | "isDeleted"
>;
export type RitualUpdate = Omit<Ritual, "status" | "isDeleted">;
export type RitualFormValues = {
  id?: string; // only used in edit
  title: string;
  startTime: number;
  expectedDuration: number;
  days: DayType[];
  isTimeBased: boolean;
};

// TODO move it to RitualList?
export type RitualState = {
  rituals: Ritual[];
  selectedIds: string[];
  setSelectedIds: (id: string[]) => void;
  isSelecting: boolean;
  setIsSelecting: (isSelecting: boolean) => void;
  addRitual: (ritual: RitualInput) => string;
  removeRitual: (ritualId: string) => void;
  markRitualDeleted: (ritualId: string) => void;
  updateRitual: (ritual: RitualUpdate) => void;
  setRitualStatus: (ritualId: string, status: RitualStatuses) => void;
  addRitualsToFolder: (ritualIds: string[], folderId: string) => void;
  removeRitualsFromFolder: (ritualIds: string[], folderId: string) => void;
};

// TODO make same for folder colors?
// TODO make a type?
export enum RitualPhase {
  Initiation = "INITIATION",
  Consolidation = "CONSOLIDATION",
  Stabilization = "STABILIZATION",
  DeepIntegration = "DEEP_INTEGRATION",
}

export type AnimatedBg = StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;

// TODO align order of status values in all records, switches
export type StatusVariantsType = {
  iconName: IoniconsName;
  animatedIconColor: Partial<{ color: string }>;
  animatedBgColor: AnimatedBg;
  text: string;
};
