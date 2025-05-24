import { useFolderStore } from "@features/folder/folderStore";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import { ConfirmDialogVariant } from "@shared/ui/ConfirmDialog/types";

const useFolderDialogs = () => {
  const folders = useFolderStore((state) => state.folders);
  // TODO remove closeConfirmDialog from store
  const setConfirmDialog = useConfirmDialogStore(
    (state) => state.setConfirmDialog,
  );
  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);

  const handleRemoveFolder = (folderId: string) => {
    closeConfirmDialog();
    removeFolder(folderId);
  };

  const closeConfirmDialog = () => setConfirmDialog({ isOpen: false });

  const openRenameDialog = (folderId: string) => {
    const folder = folders.find((folder) => folder.id === folderId);
    const name = folder?.name;
    /* TODO add animation for routine list even if a few items there */
    setConfirmDialog({
      isOpen: true,
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
    setConfirmDialog({
      isOpen: true,
      title: "Remove folder",
      variant: ConfirmDialogVariant.Remove,
      onCancel: closeConfirmDialog,
      onConfirm: () => handleRemoveFolder(folderId),
    });
  };

  return { openRenameDialog, openRemoveDialog };
};

export default useFolderDialogs;
