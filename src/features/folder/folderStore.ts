import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";

import { getDefaultFolder, getStoredFolders } from "./storage";
import { Folder, FolderState } from "./types";

// TODO make it more readable(probably extract actions to separate functions)
export const useFolderStore = create<FolderState>()(
  subscribeWithSelector((set) => ({
    folders: (() => {
      const storedFolders = getStoredFolders();
      const defaultFolder = getDefaultFolder();

      if (!storedFolders.some((folder: Folder) => folder.id === DEFAULT_FOLDER))
        return [defaultFolder, ...storedFolders];

      return storedFolders;
    })(),
    selectedId: DEFAULT_FOLDER,
    setSelectedId: (id) =>
      set(({ selectedId }) => {
        if (selectedId === id) return { selectedId };
        return {
          previousSelectedId: selectedId,
          selectedId: id,
        };
      }),
    previousSelectedId: undefined,
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

        return { folders };
      }),
    removeFolder: (id) =>
      set((state) => {
        const filteredFolders = state.folders.filter((f) => f.id !== id);

        const updatedFolders = filteredFolders.map((folder, index) => ({
          ...folder,
          order: index,
        }));

        return { folders: updatedFolders };
      }),
    renameFolder: (folderId, name) =>
      set((state) => {
        const updatedFolders = state.folders.map((folder) =>
          folder.id === folderId ? { ...folder, name } : folder,
        );

        return { folders: updatedFolders };
      }),
    setFolders: (folders) => set(() => ({ folders })),
  })),
);

export const useFolderStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useFolderStore,
    (state) => state.folders,
    "folders",
  );
