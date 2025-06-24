import { View } from "react-native";

// TODO rename
import { RitualStatuses } from "@shared/types/commonTypes";
import { AnimatedIonicons } from "@shared/ui/AnimatedComponents/AnimatedIonicons";
import ThemedText from "@shared/ui/ThemedText";

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
    <View className={`flex-row gap-2 rounded-sm px-2 py-1 ${variant.bgColor}`}>
      {/* TODO introduce color white */}
      <ThemedText color="white">{variant.text}</ThemedText>
      <AnimatedIonicons
        name={variant.iconName}
        customColorProps={variant.iconColor}
        size={18}
      />
    </View>
  );
};

export default RitualStatus;
