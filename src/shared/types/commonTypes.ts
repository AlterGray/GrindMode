import { Colors } from "@shared/constants/Colors";
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
  Danger = "DANGER",
}

export type DayItemType = { value: DayType; display: string };

export type ValueOf<T> = T[keyof T];
export type RouteType = ValueOf<typeof ROUTES>;

export type Theme = typeof Colors.light;
export type ColorName = keyof Theme;

export type FloatingModalVariantType = ValueOf<typeof FloatingModalVariant>;

export type ButtonVariant =
  | "primary-contained-20"
  | "secondary-text-10"
  | "secondary-text-20"
  | "remove-contained-20"
  | "secondary-sharped-20";

export type ButtonProps = { title: string; variant: ButtonVariant };

// TODO align it with statuses which displayed for users
export enum RoutineStatuses {
  Undone = "UNDONE",
  Done = "DONE",
  Overdue = "OVERDUE",
  Missed = "MISSED",
}
