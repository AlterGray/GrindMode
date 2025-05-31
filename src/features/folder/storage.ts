import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { storage } from "@shared/lib/storage";

import { Folder } from "./types";

export const getStoredFolders = () => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  return folders;
};

// TODO same for routines?
export const saveFolders = (folders: Folder[]) => {
  storage.set("folders", JSON.stringify(folders));
};

export const getDefaultFolder = () => {
  return {
    name: "All routines",
    id: DEFAULT_FOLDER,
    order: -1,
    color: "default",
  };
};
