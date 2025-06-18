import { useColorScheme } from "nativewind";

// TODO implement system theme support
export const useTheme = () => {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  return {
    colorScheme: colorScheme ?? "light",
    toggleScheme: toggleColorScheme,
    setScheme: setColorScheme,
  };
};
