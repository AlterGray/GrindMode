import { create } from "zustand";
import { Folder, FolderState } from "./types";
import { getDefaultFolder, getStoredFolders, saveFolders } from "./storage";
import { DEFAULT_FOLDER } from "@/constants/Folders";

export const useFolderStore = create<FolderState>()((set) => ({
  folders: (() => {
    const storedFolders = getStoredFolders();
    const defaultFolder = getDefaultFolder();

    if (!storedFolders.some((folder: Folder) => folder.id === DEFAULT_FOLDER))
      return [defaultFolder, ...storedFolders];

    return storedFolders;
  })(),
  addFolder: (name, color) =>
    set((state) => {
      const id = Date.now().toString();
      const newFolder = {
        id,
        name,
        order: state.folders.length,
        color,
      };
      const folders = [...state.folders, newFolder];
      saveFolders(folders);
      return { folders };
    }),
  removeFolder: (id) =>
    set((state) => {
      const filteredFolders = state.folders.filter((f) => f.id !== id);

      const updatedFolders = filteredFolders.map((folder, index) => ({
        ...folder,
        order: index,
      }));

      saveFolders(updatedFolders);
      return { folders: updatedFolders };
    }),
  renameFolder: (folderId, name) =>
    set((state) => {
      const updatedFolders = state.folders.map((folder) =>
        folder.id === folderId ? { ...folder, name } : folder,
      );
      saveFolders(updatedFolders);
      return { folders: updatedFolders };
    }),
  setFolders: (folders) =>
    set(() => {
      saveFolders(folders);
      return { folders };
    }),
}));
