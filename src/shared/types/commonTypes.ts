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
