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
