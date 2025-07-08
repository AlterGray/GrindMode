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

  const primary = useAnimatedColor("primary");
  const success = useAnimatedColor("success");
  const warning = useAnimatedColor("warning");
  const danger = useAnimatedColor("danger");

  switch (status) {
    case RitualStatuses.Undone:
      return {
        iconName: "ellipse-sharp",
        animatedIconColor: iconPrimarySoft,
        animatedBgColor: primary,
        text: "Incomplete",
      };
    case RitualStatuses.Done:
      return {
        iconName: "checkmark-circle-sharp",
        animatedIconColor: iconSuccessSoft,
        animatedBgColor: success,
        text: "Completed",
      };
    case RitualStatuses.Overdue:
      return {
        iconName: "time-sharp",
        animatedIconColor: iconWarningSoft,
        animatedBgColor: warning,
        text: "Overdue",
      };
    case RitualStatuses.Missed:
      return {
        iconName: "close-sharp",
        animatedIconColor: iconDangerSoft,
        animatedBgColor: danger,
        text: "Missed",
      };
  }
};
