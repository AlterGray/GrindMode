import { storage } from "@shared/lib/storage";
import { Folder } from "./types";
import { DEFAULT_FOLDER } from "@/constants/Folders";

const getStoredFolders = () => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  return folders;
};

const saveFolders = (folders: Folder[]) => {
  storage.set("folders", JSON.stringify(folders));
};

const getDefaultFolder = () => {
  return {
    name: "All routines",
    id: DEFAULT_FOLDER,
    order: -1,
    color: "default",
  };
};

export { getStoredFolders, saveFolders, getDefaultFolder };
