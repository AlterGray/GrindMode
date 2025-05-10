import { storage } from "@shared/lib/storage";
import { create } from "zustand";

type Folder = {
  id: string;
  name: string;
  order: number;
};

// TODO handle or restrict same orders
type FolderState = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
  renameFolder: (folderId: string, name: string) => void;
  setFolders: (folders: Folder[]) => void;
};

const getStoredFolders = () => {
  const jsonFolders = storage.getString("folders");
  const folders = jsonFolders ? JSON.parse(jsonFolders) : [];

  if (folders.length === 0)
    return [{ name: "All routines", id: "-1", order: -1 }];

  return folders;
};

// TODO does it make sense to move storage logic into separate file?
export const useFolderStore = create<FolderState>()((set) => ({
  folders: getStoredFolders(),
  addFolder: (name) =>
    set((state) => {
      const id = Date.now().toString();
      const addedFolder = {
        id,
        name,
        order: state.folders.length,
      };
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
  renameFolder: (folderId, name) =>
    set((state) => {
      const folders = state.folders.map((f) => {
        if (f.id === folderId) f.name = name;
        return f;
      });
      storage.set("folders", JSON.stringify(folders));
      return { folders };
    }),
  setFolders: (folders) =>
    set(() => {
      storage.set("folders", JSON.stringify(folders));
      return { folders };
    }),
}));
