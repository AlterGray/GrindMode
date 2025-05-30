import { useTheme } from "@shared/hooks/useTheme";
import { FolderColorType } from "./types";
import { Colors } from "@shared/constants/Colors";

// TODO use only one hook for changeTheme
export const useFolderColor = () => {
  const { colorScheme } = useTheme();
  // TODO: do we really need "??"", restructure colors to repeat same structure as in Colors?
  const getFolderColor = (label: FolderColorType) =>
    Colors.folderColors[label]?.[colorScheme] ??
    Colors.folderColors["default"][colorScheme];

  return getFolderColor;
};
