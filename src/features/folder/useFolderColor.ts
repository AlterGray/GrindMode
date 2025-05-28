import { useThemeStore } from "@shared/stores/themeStore";
import { FolderColorType } from "./types";
import { Colors } from "@shared/constants/Colors";

export const useFolderColor = () => {
  const isDark = useThemeStore((state) => state.isDark);
  // TODO: do we really need "??"", restructure colors to repeat same structure as in Colors?
  const getFolderColor = (label: FolderColorType) =>
    Colors.folderColors[label]?.[isDark ? "dark" : "light"] ??
    Colors.folderColors["default"][isDark ? "dark" : "light"];

  return getFolderColor;
};
