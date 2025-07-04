import { Pressable } from "react-native";

import { useThemeStore } from "@shared/stores/themeStore";
import { IoniconsName } from "@shared/types/commonTypes";

import { AnimatedIonicons } from "./AnimatedComponents/AnimatedIonicons";

type ThemeButtonProps = {
  className?: string;
};

const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
  const colorScheme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const themeIcons: Record<string, IoniconsName> = {
    light: "sunny-sharp",
    dark: "moon-sharp",
  };

  const currentIconName = themeIcons[colorScheme];

  return (
    <Pressable
      onPress={toggleTheme}
      hitSlop={8}
      className={`active:opacity-70 ${className}`}
    >
      <AnimatedIonicons
        name={currentIconName}
        // TODO create constants for icon sizes
        size={28}
        // TODO
      />
    </Pressable>
  );
};

export default ThemeButton;
