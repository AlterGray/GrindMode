import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@shared/stores/themeStore";
import { Folder, FolderColorType } from "./types";
import { DEFAULT_FOLDER } from "@/constants/Folders";
import { ReactNode } from "react";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";

const isDark = useThemeStore((state) => state.isDark);
// TODO: do we really need "??""
const getFolderColor = (label: FolderColorType) =>
  Colors.folderColors[label]?.[isDark ? "dark" : "light"] ??
  Colors.folderColors["default"][isDark ? "dark" : "light"];

const foldersToScrollTabs = (
  folders: Folder[],
  getContent: (folderId: string) => ReactNode,
  getFolderMenuItems: (folderId: string) => PopoverMenuItem[],
) =>
  folders
    .map((folder) => {
      const isSingleDefaultFolder =
        folder.id === DEFAULT_FOLDER && folders.length === 1;
      if (isSingleDefaultFolder) return;
      else
        return {
          id: folder.id,
          title: folder.name,
          color: folder.color,
          order: folder.order,
          content: getContent(folder.id),
          menuItems: getFolderMenuItems(folder.id),
        };
    })
    .filter((i) => i !== undefined);

export { getFolderColor, foldersToScrollTabs as getScrollTabsFromFolders };
