import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@shared/stores/themeStore";
import { FolderColorType } from "./types";

const isDark = useThemeStore((state) => state.isDark);
// TODO: do we really need "??""
const getFolderColor = (label: FolderColorType) =>
  Colors.folderColors[label]?.[isDark ? "dark" : "light"] ??
  Colors.folderColors["default"][isDark ? "dark" : "light"];

export { getFolderColor };
