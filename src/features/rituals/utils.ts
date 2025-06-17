import { RitualStatuses, Theme } from "@shared/types/commonTypes";

import { OrderedRitualPhases } from "./constants";
import { RitualPhase, StatusVariantsType } from "./ritualTypes";

export const getNextRitualPhase = (phase: RitualPhase): RitualPhase | null => {
  const index = OrderedRitualPhases.indexOf(phase);
  if (index === -1 || index === OrderedRitualPhases.length - 1) {
    return RitualPhase.DeepIntegration;
  }
  return OrderedRitualPhases[index + 1];
};

// TODO rename all "colors" to theme
export const getStatusVariant = (
  status: RitualStatuses,
  theme: Theme,
): StatusVariantsType => {
  switch (status) {
    case RitualStatuses.Undone:
      return {
        iconName: "ellipse-sharp",
        iconColor: theme.primarySoft,
        bgColor: "bg-light-primary dark:bg-dark-primary",
        text: "Incomplete",
      };
    case RitualStatuses.Done:
      return {
        iconName: "checkmark-circle-sharp",
        iconColor: theme.successSoft,
        bgColor: "bg-light-success dark:bg-dark-success",
        text: "Completed",
      };
    case RitualStatuses.Overdue:
      return {
        iconName: "time-sharp",
        iconColor: theme.warningSoft,
        bgColor: "bg-light-warning dark:bg-dark-warning",
        text: "Overdue",
      };
    case RitualStatuses.Missed:
      return {
        iconName: "close-sharp",
        iconColor: theme.dangerSoft,
        bgColor: "bg-light-danger dark:bg-dark-danger",
        text: "Missed",
      };
  }
};
