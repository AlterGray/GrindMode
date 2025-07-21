import { View } from "react-native";
import Animated from "react-native-reanimated";

// TODO rename
import { RitualStatuses } from "@shared/types/commonTypes";
import { AnimatedIonicons } from "@shared/ui/AnimatedComponents/AnimatedIonicons";
import AnimatedThemedText from "@shared/ui/ThemedText";

import { useStatusVariant } from "./utils";

type StatusProps = {
  status: RitualStatuses;
};

// TODO align namings, here with feature prefix, but in UI for example backdrop(for modal) without prefix
// TODO make backdrop shared?
const RitualStatus: React.FC<StatusProps> = ({ status }) => {
  const variant = useStatusVariant(status);

  return (
    <Animated.View
      style={variant.animatedBgColor}
      className={"flex-row gap-2 rounded-sm px-2 py-1"}
    >
      <AnimatedThemedText color="white">{variant.text}</AnimatedThemedText>
      <AnimatedIonicons
        name={variant.iconName}
        animatedIconColor={variant.animatedIconColor}
        size={18}
      />
    </Animated.View>
  );
};

export default RitualStatus;
