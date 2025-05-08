import { storage } from "@shared/lib/storage";
import { create } from "zustand";

type Folder = {
  id: string;
  name: string;
};

type FolderState = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
  renameFolder: (folder: Folder) => void;
};

const getStoredFolders = () => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  return [{ name: "All", id: "-1" }, ...folders];
};

// TODO does it make sense to move storage logic into separate file?
export const useFolderStore = create<FolderState>()((set) => ({
  folders: getStoredFolders(),
  addFolder: (name) =>
    set((state) => {
      const id = Date.now().toString();
      const addedFolder = { id, name };
      const folders = [...state.folders, addedFolder];
      storage.set("folders", JSON.stringify(folders));
      return { folders };
    }),
  removeFolder: (id) =>
    set((state) => {
      const folders = state.folders.filter((f) => f.id !== id);
      storage.set("folders", JSON.stringify(folders));
      return { folders };
    }),
  renameFolder: (folder) =>
    set((state) => {
      const folders = state.folders.map((f) => {
        if (f.id === folder.id) f.name = folder.name;
        return f;
      });
      storage.set("folders", JSON.stringify(folders));
      return { folders };
    }),
}));
