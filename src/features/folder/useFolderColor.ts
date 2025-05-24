import { useThemeStore } from "@shared/stores/themeStore";
import { FolderColorType } from "./types";
import { Colors } from "@/constants/Colors";

export const useFolderColor = () => {
  const isDark = useThemeStore((state) => state.isDark);
  // TODO: do we really need "??""
  const getFolderColor = (label: FolderColorType) =>
    Colors.folderColors[label]?.[isDark ? "dark" : "light"] ??
    Colors.folderColors["default"][isDark ? "dark" : "light"];

  return getFolderColor;
};
