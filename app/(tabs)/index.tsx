import React, { useState } from "react";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";
import ConfirmDialog from "@shared/ui/ConfirmDialog/ConfirmDialog";
import ThemedText from "@shared/ui/ThemedText";
import { View } from "react-native";
import StyledInput from "@shared/ui/StyledInput";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { PopoverMenuItem } from "@shared/ui/ActionsModal/PopoverMenu";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";

// TODO
const Index = () => {
  const folders = useFolderStore((state) => state.folders);
  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [isReordering, setIsReordering] = useState(false);
  const setFolders = useFolderStore((state) => state.setFolders);
  const setConfirmDialog = useConfirmDialogStore(
    (state) => state.setConfirmDialog,
  );
  const closeConfirmDialog = useConfirmDialogStore(
    (state) => state.closeConfirmModal,
  );

  const handleRemoveFolder = (folderId: string) => {
    closeConfirmDialog();
    removeFolder(folderId);
  };

  const getMenuItems = (folderId2: string) => {
    let menuItems: PopoverMenuItem[] = [];

    if (folderId2 !== "-1")
      menuItems = [
        {
          // TODO when remove folder which is active then app crashes
          label: "Delete folder",
          onPress: () => {
            openRemoveDialog();
            setFolderId(folderId2);
          },
        },
        {
          label: "Rename folder",
          onPress: () => {
            openRenameDialog();
            setFolderId(folderId2);
          },
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
      const isSingleDefaultFolder = folder.id === "-1" && folders.length === 1;
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

  const openRenameDialog = () => {
    /* TODO add animation for routine list even if a few items there */
    setConfirmDialog({
      isOpen: true,
      title: "Rename folder",
      message: (
        <View>
          <StyledInput placeholder="Folder name" onChangeText={setFolderName} />
        </View>
      ),
      onCancel: closeConfirmDialog,
      onConfirm: () => {
        renameFolder(folderId, folderName);
        closeConfirmDialog();
      },
      primaryColor: "primary",
    });
  };

  const openRemoveDialog = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Remove folder",
      message: (
        <ThemedText>Are you sure you want to remove this folder?</ThemedText>
      ),
      primaryButtonText: "Remove",
      onCancel: closeConfirmDialog,
      onConfirm: () => handleRemoveFolder(folderId),
    });
  };

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs
          tabs={tabs}
          onCloseTab={(id) => {
            setFolderId(id);
            openRemoveDialog();
          }}
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
          folderId={"-1"}
          setIsReordering={() => setIsReordering(false)}
        />
      )}
    </>
  );
};

export default Index;
