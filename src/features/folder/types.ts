type Folder = {
  id: string;
  name: string;
  order: number;
  color: string;
};

// TODO handle or restrict same orders
type FolderState = {
  folders: Folder[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  previousSelectedId?: string;
  addFolder: (name: string, color: string) => void;
  removeFolder: (id: string) => void;
  renameFolder: (folderId: string, name: string) => void;
  setFolders: (folders: Folder[]) => void;
};

// TODO
export const folderColorsNames = [
  "default",
  "red",
  "amber",
  "yellow",
  "green",
  "lightBlue",
  "blue",
  "pink",
] as const;

// TODO naming
export type FolderColorType = (typeof folderColorsNames)[number];

export type { Folder, FolderState };
