import { ALL_FOLDER_ID, TODAY_FOLDER_ID } from "@shared/constants/Folders";
import { storage } from "@shared/lib/storage";

import { Folder } from "./types";

export const getStoredFolders = (): Folder[] => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  return folders;
};

export const getDefaultFolders = () => {
  return [
    { name: "Today", id: TODAY_FOLDER_ID, order: -2, color: "default" },
    {
      name: "All",
      id: ALL_FOLDER_ID,
      order: -1,
      color: "default",
    },
  ];
};
