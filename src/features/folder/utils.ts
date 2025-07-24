import { ReactNode } from "react";

import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";

import { Folder } from "./types";

export const foldersToScrollTabs = (
  folders: Folder[],
  getContent: (folderId: string) => ReactNode,
  getFolderMenuItems: (folderId: string) => PopoverMenuItem[],
) =>
  folders
    .map((folder) => {
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
