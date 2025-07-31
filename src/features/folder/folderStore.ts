import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { ALL_FOLDER_ID, TODAY_FOLDER_ID } from "@shared/constants/Folders";
import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";

import { getDefaultFolders, getStoredFolders } from "./storage";
import { Folder, FolderState } from "./types";

// TODO make it more readable(probably extract actions to separate functions)
export const useFolderStore = create<FolderState>()(
  subscribeWithSelector(
    immer((set) => ({
      folders: (() => {
        const storedFolders = getStoredFolders();
        const defaultFolders = getDefaultFolders();
        const isAllFolderExist = storedFolders.find(
          (folder: Folder) => folder.id === ALL_FOLDER_ID,
        );
        const isTodayFolderExist = storedFolders.find(
          (folder: Folder) => folder.id === TODAY_FOLDER_ID,
        );

        if (!isAllFolderExist || !isTodayFolderExist) {
          return [...defaultFolders, ...storedFolders];
        }

        return storedFolders;
      })(),
      selectedId: TODAY_FOLDER_ID,
      setSelectedId: (id) => {
        set((state) => {
          // TODO does it best place to implement this logic?
          if (state.selectedId !== id) {
            state.previousSelectedId = state.selectedId;
            state.selectedId = id;
          }
        });
      },
      previousSelectedId: undefined,
      addFolder: (name, color) => {
        set((state) => {
          const id = Date.now().toString();
          const newFolder = { id, name, order: state.folders.length, color };

          state.folders.push(newFolder);
          state.previousSelectedId = state.selectedId;
          state.selectedId = id;
        });
      },
      removeFolder: (id) => {
        set((state) => {
          state.folders = state.folders
            .filter((f) => f.id !== id)
            .map((folder, i) => ({ ...folder, order: i }));
        });
      },
      renameFolder: (folderId, name) =>
        set((state) => {
          state.folders = state.folders.map((folder) =>
            folder.id === folderId ? { ...folder, name } : folder,
          );
        }),
      setFolders: (folders) => {
        set((state) => {
          state.folders = folders;
        });
      },
    })),
  ),
);

export const useFolderStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useFolderStore,
    (state) => state.folders,
    "folders",
  );
