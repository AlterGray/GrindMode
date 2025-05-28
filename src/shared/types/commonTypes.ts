import { Colors } from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";

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

export type DayItemType = { value: DayType; display: string };

export type StyledButtonVariant = "primary" | "secondary" | "text";
export type StyledButtonColor = "primary" | "secondary" | "danger";

export type ValueOf<T> = T[keyof T];
export type RouteType = ValueOf<typeof ROUTES>;

export type Theme = typeof Colors.light;
export type ColorName = keyof Theme;
