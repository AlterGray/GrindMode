import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { RitualStatuses } from "@shared/types/commonTypes";

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
export const useStatusVariant = (
  status: RitualStatuses,
): StatusVariantsType => {
  const iconPrimarySoft = useAnimatedColor("primarySoft", true);
  const iconSuccessSoft = useAnimatedColor("successSoft", true);
  const iconWarningSoft = useAnimatedColor("warningSoft", true);
  const iconDangerSoft = useAnimatedColor("dangerSoft", true);

  switch (status) {
    case RitualStatuses.Undone:
      return {
        iconName: "ellipse-sharp",
        animatedIconColor: iconPrimarySoft,
        bgColor: "bg-light-primary dark:bg-dark-primary",
        text: "Incomplete",
      };
    case RitualStatuses.Done:
      return {
        iconName: "checkmark-circle-sharp",
        animatedIconColor: iconSuccessSoft,
        bgColor: "bg-light-success dark:bg-dark-success",
        text: "Completed",
      };
    case RitualStatuses.Overdue:
      return {
        iconName: "time-sharp",
        animatedIconColor: iconWarningSoft,
        bgColor: "bg-light-warning dark:bg-dark-warning",
        text: "Overdue",
      };
    case RitualStatuses.Missed:
      return {
        iconName: "close-sharp",
        animatedIconColor: iconDangerSoft,
        bgColor: "bg-light-danger dark:bg-dark-danger",
        text: "Missed",
      };
  }
};
