import React, { useState } from "react";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";
import { DEFAULT_FOLDER } from "@/constants/Folders";
import useFolderDialogs from "@features/routine/hooks/useRoutineDialogs";
import { getScrollTabsFromFolders } from "@features/folder/utils";

// TODO
const Index = () => {
  const folders = useFolderStore((state) => state.folders);
  const [isReordering, setIsReordering] = useState(false);
  const setFolders = useFolderStore((state) => state.setFolders);
  const setActionModal = useActionModalStore((state) => state.setActionModal);
  const closeModal = useActionModalStore((state) => state.closeModal);
  const { openRenameDialog, openRemoveDialog } = useFolderDialogs();

  // TODO make shared action type
  const actions = [
    {
      iconName: "checkmark" as const,
      onPress: closeModal,
    },
  ];

  // TODO make selectedFolder zustand controlled and introduce hook
  const getFolderMenuItems = (folderId: string) => {
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
        setActionModal({
          isOpen: true,
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
  const tabs = getScrollTabsFromFolders(
    folders,
    (folderId) => <RoutineList folderId={folderId} />,
    (folderId) => getFolderMenuItems(folderId),
  );

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
        <RoutineList folderId={DEFAULT_FOLDER} />
      )}
    </>
  );
};

export default Index;
