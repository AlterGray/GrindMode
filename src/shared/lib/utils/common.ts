import { i18n } from "../i18n-js";

export const extractDuration = (minutes: number) => {
  if (minutes === 0) return i18n.t("noLimit");
  return `${Math.floor(minutes / 60)}h ${minutes - Math.floor(minutes / 60) * 60}m`;
};

// TODO move to feature utils?
export const formatTimeLabel = (time: number): string => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const hour12 = hour % 12 || 12;
  const period = hour >= 12 ? i18n.t("pm") : i18n.t("am");
  return `${hour12}:${minute} ${period}`;
};

export const formatDurationLabel = (duration: number): string =>
  duration > 0
    ? `${Math.floor(duration / 60)}${i18n.t("hours")} ${duration % 60}${i18n.t("minutes")}`
    : i18n.t("noLimit");

export const capitalize = (val: string) => {
  return (
    // TODO toLowerCase vs toLowerCaseLocal
    String(val).charAt(0).toUpperCase() + String(val.toLowerCase()).slice(1)
  );
};
