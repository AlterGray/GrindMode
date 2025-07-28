import { i18n } from "@shared/lib/utils/i18n/i18n-js";
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
  { value: DayType.SUNDAY, display: "sunday" },
  { value: DayType.MONDAY, display: "monday" },
  { value: DayType.TUESDAY, display: "tuesday" },
  { value: DayType.WEDNESDAY, display: "wednesday" },
  { value: DayType.THURSDAY, display: "thursday" },
  { value: DayType.FRIDAY, display: "friday" },
  { value: DayType.SATURDAY, display: "saturday" },
];
