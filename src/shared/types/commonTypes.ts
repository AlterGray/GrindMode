// TODO move it?
enum DayType {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

type DayItemType = { value: DayType; display: string };

type StyledButtonVariant = "primary" | "secondary" | "text";
type StyledButtonColor = "primary" | "secondary" | "danger";

export { DayType, DayItemType, StyledButtonVariant, StyledButtonColor };
