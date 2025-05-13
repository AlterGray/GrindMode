import { storage } from "@shared/lib/storage";
import { Folder } from "./types";

const getStoredFolders = () => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  return folders;
};

const saveFolders = (folders: Folder[]) => {
  storage.set("folders", JSON.stringify(folders));
};

const getDefaultFolder = () => {
  return { name: "All routines", id: "-1", order: -1, color: "default" };
};

export { getStoredFolders, saveFolders, getDefaultFolder };
