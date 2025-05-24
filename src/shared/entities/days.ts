import { DayItemType, DayType } from "@shared/types/commonTypes";

// TODO refactor it
export const DAYS = [
  DayType.SUNDAY,
  DayType.MONDAY,
  DayType.TUESDAY,
  DayType.WEDNESDAY,
  DayType.THURSDAY,
  DayType.FRIDAY,
  DayType.SATURDAY,
];

// TODO SAME AS TYPE
export const DAY_ITEMS_LIST: DayItemType[] = [
  { value: DayType.SUNDAY, display: "S" },
  { value: DayType.MONDAY, display: "M" },
  { value: DayType.TUESDAY, display: "T" },
  { value: DayType.WEDNESDAY, display: "W" },
  { value: DayType.THURSDAY, display: "T" },
  { value: DayType.FRIDAY, display: "F" },
  { value: DayType.SATURDAY, display: "S" },
];
