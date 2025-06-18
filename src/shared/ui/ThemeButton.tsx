import { Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useThemeStore } from "@shared/stores/themeStore";

type ThemeButtonProps = {
  iconColor?: string;
};

const ThemeButton: React.FC<ThemeButtonProps> = ({ iconColor }) => {
  const colorScheme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const themeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    light: "sunny-sharp",
    dark: "moon-sharp",
  };

  const currentIconName = themeIcons[colorScheme];

  return (
    <Pressable onPress={toggleTheme} className="active:opacity-70">
      <Ionicons
        name={currentIconName}
        // TODO create constants for icon sizes
        size={28}
        color={iconColor}
        accessibilityLabel={`Switch theme, current: ${colorScheme}`}
        className="px-4"
      />
    </Pressable>
  );
};

export default ThemeButton;
