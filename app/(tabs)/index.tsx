import React, { useState } from "react";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";
import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { foldersToScrollTabs } from "@features/folder/utils";
import { FloatingModalVariant } from "@shared/types/commonTypes";
import FolderRenameDialog from "@features/folder/components/FolderRenameDialog";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";

const Index = () => {
  const folders = useFolderStore((state) => state.folders);
  const [folderIdToEdit, setFolderIdToEdit] = useState("");
  // TODO use status?
  const [isReordering, setIsReordering] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  const setFolders = useFolderStore((state) => state.setFolders);
  const openActionModal = useActionModalStore((state) => state.openActionModal);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  const openRemoveDialog = useGlobalFloatingModalStore(
    (state) => state.openModal,
  );
  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);

  // TODO make shared action type
  const actions = [
    {
      iconName: "checkmark" as const,
      onPress: closeActionModal,
    },
  ];

  const handleOpenRemoveDialog = (folderId: string) => {
    openRemoveDialog({
      title: "Remove folder",
      variant: FloatingModalVariant.Danger,
      onConfirm: () => removeFolder(folderId),
    });
    setFolderIdToEdit(folderId);
  };

  // TODO make selectedFolder zustand controlled and introduce hook
  const getFolderMenuItems = (folderId: string) => {
    let menuItems: PopoverMenuItem[] = [];

    if (folderId !== DEFAULT_FOLDER)
      menuItems = [
        {
          label: "Delete folder",
          onPress: () => handleOpenRemoveDialog(folderId),
        },
        {
          label: "Rename folder",
          onPress: () => {
            setIsRenameDialogOpen(true);
            setFolderIdToEdit(folderId);
          },
        },
      ];
    menuItems.push({
      label: "Reorder",
      onPress: () => {
        openActionModal({
          text: "Reorder items",
          actions: actions,
          onCloseDialog: () => setIsReordering(false),
        });
        setIsReordering(true);
      },
    });

    return menuItems;
  };

  const isFoldersExists = folders.length > 1;
  const tabs = foldersToScrollTabs(
    folders,
    (folderId) => <RoutineList folderId={folderId} />,
    (folderId) => getFolderMenuItems(folderId),
  );

  const folderToRename = folders.find((f) => f.id === folderIdToEdit);

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs
          tabs={tabs}
          onCloseTab={handleOpenRemoveDialog}
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
        <RoutineList folderId={DEFAULT_FOLDER} />
      )}

      <FolderRenameDialog
        isOpen={isRenameDialogOpen}
        initialValue={folderToRename?.name ?? ""}
        onConfirm={(newName) => {
          renameFolder(folderIdToEdit, newName);
          setIsRenameDialogOpen(false);
        }}
        onCancel={() => setIsRenameDialogOpen(false)}
      />
    </>
  );
};

export default Index;
