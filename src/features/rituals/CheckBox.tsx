import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import ThemedText from "@shared/ui/ThemedText";

type CheckboxProps = {
  label: string;
  size?: "sm" | "md";
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

// TODO move to shared
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  size = "md",
  checked = false,
  onChange,
}) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      className="flex-row items-center py-2 gap-2"
      activeOpacity={0.6}
    >
      {checked ? (
        <Feather
          name="check-square"
          size={size === "sm" ? 16 : 18}
          color={colors.icon}
        />
      ) : (
        <Feather
          name="square"
          size={size === "sm" ? 16 : 18}
          color={colors.icon}
        />
      )}

      <ThemedText>{label}</ThemedText>
    </TouchableOpacity>
  );
};
