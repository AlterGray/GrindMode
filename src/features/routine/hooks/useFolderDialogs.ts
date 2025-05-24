import { useFolderStore } from "@features/folder/folderStore";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import { ConfirmDialogVariant } from "@shared/ui/ConfirmDialog/types";

const useFolderDialogs = () => {
  const folders = useFolderStore((state) => state.folders);
  const openConfirmDialog = useConfirmDialogStore(
    (state) => state.openConfirmDialog,
  );
  const closeConfirmDialog = useConfirmDialogStore(
    (state) => state.closeConfirmDialog,
  );

  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);

  const handleRemoveFolder = (folderId: string) => {
    closeConfirmDialog();
    removeFolder(folderId);
  };

  const openRenameDialog = (folderId: string) => {
    const folder = folders.find((folder) => folder.id === folderId);
    const name = folder?.name;
    /* TODO add animation for routine list even if a few items there */
    openConfirmDialog({
      title: "Rename folder",
      onCancel: closeConfirmDialog,
      onConfirm: (value) => {
        // TODO "!"
        renameFolder(folderId, value!);
        closeConfirmDialog();
      },
      variant: ConfirmDialogVariant.Input,
      initialValue: name,
    });
  };

  const openRemoveDialog = (folderId: string) => {
    openConfirmDialog({
      title: "Remove folder",
      variant: ConfirmDialogVariant.Remove,
      onCancel: closeConfirmDialog,
      onConfirm: () => handleRemoveFolder(folderId),
    });
  };

  return { openRenameDialog, openRemoveDialog };
};

export default useFolderDialogs;
