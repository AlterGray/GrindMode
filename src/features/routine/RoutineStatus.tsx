import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "@shared/hooks/useThemeColors";
// TODO rename
import { RoutineStatuses } from "@shared/types/commonTypes";
import ThemedText from "@shared/ui/ThemedText";

import { getStatusVariant } from "./utils";

type StatusProps = {
  status: RoutineStatuses;
};

// TODO align namings, here with feature prefix, but in UI for example backdrop(for modal) without prefix
// TODO make backdrop shared?
const RoutineStatus: React.FC<StatusProps> = ({ status }) => {
  const colors = useThemeColors();
  const variant = getStatusVariant(status, colors);

  return (
    // TODO how to don't repeat "light" or "dark" in class names each time?
    <View className={`flex-row gap-2 rounded-sm px-2 py-1 ${variant.bgColor}`}>
      {/* TODO introduce color white */}
      <ThemedText className="text-white">{variant.text}</ThemedText>
      <Ionicons name={variant.iconName} color={variant.iconColor} size={18} />
    </View>
  );
};

export default RoutineStatus;
