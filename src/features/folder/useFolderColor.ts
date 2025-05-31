import { Colors } from "@shared/constants/Colors";
import { useTheme } from "@shared/hooks/useTheme";

import { FolderColorType } from "./types";

export const useFolderColor = () => {
  const { colorScheme } = useTheme();
  // TODO: do we really need "??"", restructure colors to repeat same structure as in Colors?
  const getFolderColor = (label: FolderColorType) =>
    Colors.folderColors[label]?.[colorScheme] ??
    Colors.folderColors["default"][colorScheme];

  return getFolderColor;
};
