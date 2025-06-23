import { Pressable } from "react-native";

import { useThemeStore } from "@shared/stores/themeStore";
import { IoniconsName } from "@shared/types/commonTypes";

import { AnimatedIonicons } from "./AnimatedComponents/AnimatedIonicons";

const ThemeButton: React.FC = () => {
  const colorScheme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const themeIcons: Record<string, IoniconsName> = {
    light: "sunny-sharp",
    dark: "moon-sharp",
  };

  const currentIconName = themeIcons[colorScheme];

  return (
    <Pressable onPress={toggleTheme} className="active:opacity-70">
      <AnimatedIonicons
        name={currentIconName}
        // TODO create constants for icon sizes
        size={28}
        // TODO
        className="px-4"
      />
    </Pressable>
  );
};

export default ThemeButton;
