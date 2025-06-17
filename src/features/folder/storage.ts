import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { storage } from "@shared/lib/storage";

export const getStoredFolders = () => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  return folders;
};

export const getDefaultFolder = () => {
  return {
    name: "All rituals",
    id: DEFAULT_FOLDER,
    order: -1,
    color: "default",
  };
};
