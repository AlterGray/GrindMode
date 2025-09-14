import { DayType, TabType } from "@shared/types/commonTypes";

export const DaysOfWeek: DayType[] = [
  DayType.SUNDAY,
  DayType.MONDAY,
  DayType.TUESDAY,
  DayType.WEDNESDAY,
  DayType.THURSDAY,
  DayType.FRIDAY,
  DayType.SATURDAY,
];

export const TABS: Record<string, TabType> = {
  index: { name: "index", priority: 0, hidden: false, canBeHidden: true },
  time: { name: "time", priority: 1, hidden: false, canBeHidden: true },
  proofs: { name: "proofs", priority: 2, hidden: false, canBeHidden: true },
  settings: {
    name: "settings",
    priority: 3,
    hidden: false,
    canBeHidden: false,
  },
};
