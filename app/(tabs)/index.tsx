import React, { useState } from "react";

import FolderRenameDialog from "@features/folder/components/FolderRenameDialog";
import { useFolderStore } from "@features/folder/folderStore";
import { foldersToScrollTabs } from "@features/folder/utils";
import RoutineList from "@features/routine/RoutineList";

import { DEFAULT_FOLDER } from "@shared/constants/Folders";
import { FloatingModalVariant } from "@shared/types/commonTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";

// TODO performance, too many rerenders(use some tools/techniques to analyz and found it, read articles from like dan abramow and watch it synyak)
const Index = () => {
  // TODO custom hooks + more zustand store for declarative style, intoduce selectors and status flags
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
        key={folderToRename?.name}
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
