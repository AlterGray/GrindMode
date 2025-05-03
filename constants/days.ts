import { DayItemType, DayType } from "@/app/types/commonTypes";

// TODO refactor it
const DAYS = [
  DayType.SUNDAY,
  DayType.MONDAY,
  DayType.TUESDAY,
  DayType.WEDNESDAY,
  DayType.THURSDAY,
  DayType.FRIDAY,
  DayType.SATURDAY,
];

// TODO SAME AS TYPE
const DAY_ITEMS_LIST: DayItemType[] = [
  { value: DayType.SUNDAY, display: "S" },
  { value: DayType.MONDAY, display: "M" },
  { value: DayType.TUESDAY, display: "T" },
  { value: DayType.WEDNESDAY, display: "W" },
  { value: DayType.THURSDAY, display: "T" },
  { value: DayType.FRIDAY, display: "F" },
  { value: DayType.SATURDAY, display: "S" },
];

export { DAYS, DAY_ITEMS_LIST };
