import { useFolderStore } from "@features/folder/folderStore";
import useConfirmModalStore from "@shared/ui/ConfirmModal/ConfirmModalStore";
import { ConfirmModalVariant } from "@shared/ui/ConfirmModal/types";

const useFolderDialogs = () => {
  const folders = useFolderStore((state) => state.folders);
  const openConfirmDialog = useConfirmModalStore(
    (state) => state.openConfirmModal,
  );
  const closeConfirmDialog = useConfirmModalStore(
    (state) => state.closeConfirmModal,
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
      variant: ConfirmModalVariant.Input,
      initialValue: name,
    });
  };

  const openRemoveDialog = (folderId: string) => {
    openConfirmDialog({
      title: "Remove folder",
      variant: ConfirmModalVariant.Remove,
      onCancel: closeConfirmDialog,
      onConfirm: () => handleRemoveFolder(folderId),
    });
  };

  return { openRenameDialog, openRemoveDialog };
};

export default useFolderDialogs;
