import { useColorScheme } from "nativewind";

// TODO implement system theme support
export const useTheme = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return {
    colorScheme: colorScheme ?? "light",
    toggleTheme: toggleColorScheme,
  };
};
