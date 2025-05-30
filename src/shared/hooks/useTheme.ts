import { useColorScheme } from "nativewind";

export const useTheme = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return {
    colorScheme: colorScheme ?? "light",
    toggleTheme: toggleColorScheme,
  };
};
