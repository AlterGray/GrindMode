import { Folder } from "./types";
import { DEFAULT_FOLDER } from "@/constants/Folders";
import { ReactNode } from "react";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";

export const foldersToScrollTabs = (
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
