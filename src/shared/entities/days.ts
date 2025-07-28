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
  { value: DayType.SUNDAY, display: i18n.t("sunday") },
  { value: DayType.MONDAY, display: i18n.t("monday") },
  { value: DayType.TUESDAY, display: i18n.t("tuesday") },
  { value: DayType.WEDNESDAY, display: i18n.t("wednesday") },
  { value: DayType.THURSDAY, display: i18n.t("thursday") },
  { value: DayType.FRIDAY, display: i18n.t("friday") },
  { value: DayType.SATURDAY, display: i18n.t("saturday") },
];
