import { RoutineStatuses, Theme } from "@shared/types/commonTypes";

import { OrderedRoutinePhases } from "./constants";
import { RoutinePhase, StatusVariantsType } from "./routineTypes";

export const getNextRoutinePhase = (
  phase: RoutinePhase,
): RoutinePhase | null => {
  const index = OrderedRoutinePhases.indexOf(phase);
  if (index === -1 || index === OrderedRoutinePhases.length - 1) {
    return null;
  }
  return OrderedRoutinePhases[index + 1];
};

// TODO rename all "colors" to theme
export const getStatusVariant = (
  status: RoutineStatuses,
  theme: Theme,
): StatusVariantsType => {
  switch (status) {
    case RoutineStatuses.Undone:
      return {
        iconName: "ellipse-sharp",
        iconColor: theme.primarySoft,
        bgColor: "bg-light-primary dark:bg-dark-primary",
        text: "Incomplete",
      };
    case RoutineStatuses.Done:
      return {
        iconName: "checkmark-circle-sharp",
        iconColor: theme.successSoft,
        bgColor: "bg-light-success dark:bg-dark-success",
        text: "Completed",
      };
    case RoutineStatuses.Overdue:
      return {
        iconName: "time-sharp",
        iconColor: theme.warningSoft,
        bgColor: "bg-light-warning dark:bg-dark-warning",
        text: "Overdue",
      };
    case RoutineStatuses.Missed:
      return {
        iconName: "close-sharp",
        iconColor: theme.dangerSoft,
        bgColor: "bg-light-danger dark:bg-dark-danger",
        text: "Missed",
      };
  }
};
