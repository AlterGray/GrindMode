import { Ionicons } from "@expo/vector-icons";

import { ROUTES } from "@shared/constants/routes";

// TODO move it?
export enum DayType {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export enum FloatingModalVariant {
  Confirm = "CONFIRM",
  Cancel = "CANCEL",
  Remove = "REMOVE",
  Reset = "RESET",
}

export type DayItemType = { value: DayType; display: string };

export type ValueOf<T> = T[keyof T];
export type RouteType = ValueOf<typeof ROUTES>;

export type FloatingModalVariantType = ValueOf<typeof FloatingModalVariant>;

export type ButtonVariant =
  | "primary-contained-20"
  | "remove-contained-20"
  | "secondary-sharped-20"
  | "secondary-text-5"
  | "secondary-text-10"
  | "secondary-text-20";

export type ButtonProps = { title: string; variant: ButtonVariant };

// TODO align it with statuses which displayed for users
// TODO add waiting status and turn ritual into waiting when it is not started or broken
// todo make waiting rituals like arhiced chats in tg?
export enum RitualStatuses {
  Undone = "UNDONE",
  Done = "DONE",
  Overdue = "OVERDUE",
  Missed = "MISSED",
}

export type IoniconsName = keyof typeof Ionicons.glyphMap;

export type LanguageMode = "en" | "ua" | "ru";
