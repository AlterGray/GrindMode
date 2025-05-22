import React, { useState } from "react";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";
import { ConfirmDialogVariant } from "@shared/ui/ConfirmDialog/types";
import { DEFAULT_FOLDER } from "@/constants/Folders";

// TODO
const Index = () => {
  const folders = useFolderStore((state) => state.folders);
  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const [isReordering, setIsReordering] = useState(false);
  const setFolders = useFolderStore((state) => state.setFolders);
  const setConfirmDialog = useConfirmDialogStore(
    (state) => state.setConfirmDialog,
  );
  const closeConfirmDialog = useConfirmDialogStore(
    (state) => state.closeConfirmDialog,
  );

  const handleRemoveFolder = (folderId: string) => {
    closeConfirmDialog();
    removeFolder(folderId);
  };

  const getMenuItems = (folderId: string) => {
    let menuItems: PopoverMenuItem[] = [];

    if (folderId !== DEFAULT_FOLDER)
      menuItems = [
        {
          // TODO when remove folder which is active then app crashes
          label: "Delete folder",
          onPress: () => openRemoveDialog(folderId),
        },
        {
          label: "Rename folder",
          onPress: () => openRenameDialog(folderId),
        },
      ];
    menuItems.push({
      label: "Reorder",
      onPress: () => {
        setActionModal(true, "Reorder items", actions, false, [], () => {
          setIsReordering(false);
        });
        setIsReordering(true);
      },
    });

    return menuItems;
  };

  const isFoldersExists = folders.length > 1;
  const tabs = folders
    .map((folder) => {
      const isSingleDefaultFolder =
        folder.id === DEFAULT_FOLDER && folders.length === 1;
      if (isSingleDefaultFolder) return;
      else
        return {
          id: folder.id,
          title: folder.name,
          color: folder.color,
          order: folder.order,
          content: (
            <RoutineList
              folderId={folder.id}
              setIsReordering={setIsReordering}
            />
          ),
          menuItems: getMenuItems(folder.id),
        };
    })
    .filter((i) => i !== undefined);

  const setActionModal = useActionModalStore((state) => state.setActionModal);
  const closeModal = useActionModalStore((state) => state.closeModal);

  const actions = [
    {
      iconName: "checkmark" as const,
      onPress: closeModal,
    },
  ];

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

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs
          tabs={tabs}
          onCloseTab={openRemoveDialog}
          isReordering={isReordering}
          onDragEnd={(item) => {
            const newFolders = item.data.map((f, i) => {
              const newFolder = folders.find((folder) => folder.id === f.id);
              newFolder!.order = i;
              return newFolder!;
            });
            setFolders(newFolders);
          }}
        />
      ) : (
        <RoutineList
          folderId={DEFAULT_FOLDER}
          setIsReordering={() => setIsReordering(false)}
        />
      )}
    </>
  );
};

export default Index;
