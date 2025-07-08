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
    // TODO how to don't repeat "light" or "dark" in class names each time?
    <Animated.View
      style={variant.animatedBgColor}
      className={"flex-row gap-2 rounded-sm px-2 py-1"}
    >
      {/* TODO introduce color white */}
      <AnimatedThemedText color="white">{variant.text}</AnimatedThemedText>
      {/* TODO fix animating */}
      <AnimatedIonicons
        name={variant.iconName}
        animatedIconColor={variant.animatedIconColor}
        size={18}
      />
    </Animated.View>
  );
};

export default RitualStatus;
