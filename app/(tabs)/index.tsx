import React, { useMemo, useState } from "react";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";
import ConfirmDialog from "@shared/ui/ConfirmDialog";
import ThemedText from "@shared/ui/ThemedText";
import { View } from "react-native";
import StyledInput from "@shared/ui/StyledInput";
import { useActionModal } from "@shared/ui/ActionsModal/useActionModal";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { PopoverMenuItem } from "@shared/ui/ActionsModal/PopoverMenu";

// TODO
const Index = () => {
  const folders = useFolderStore((state) => state.folders);
  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [isReordering, setIsReordering] = useState(false);
  const setFolders = useFolderStore((state) => state.setFolders);

  const handleRemoveFolder = (folderId: string) => {
    setIsRemoveDialogOpen(false);
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
            setIsRemoveDialogOpen(true);
            setFolderId(folderId2);
          },
        },
        {
          label: "Rename folder",
          onPress: () => {
            setIsRenameDialogOpen(true);
            setFolderId(folderId2);
          },
        },
      ];
    menuItems.push({
      label: "Reorder",
      onPress: () => {
        setIsOpen(true);
        setIsReordering(true);
      },
    });

    return menuItems;
  };

  const isFoldersExists = folders.length > 1;
  const tabs = folders
    .map((folder) => {
      if (folder.id === "-1" && folders.length == 1) return;
      else
        return {
          id: folder.id,
          title: folder.name,
          order: folder.order,
          content: <RoutineList folderId={folder.id} />,
          menuItems: getMenuItems(folder.id),
        };
    })
    .filter((i) => i !== undefined);

  const { setIsOpen } = useActionModalStore();

  const actions = [
    {
      iconName: "checkmark" as const,
      onPress: () => setIsOpen(false),
    },
  ];

  // const qq = useMemo(() => actions, [reorderedFolders.length]);

  // TODO too much modals, hard to close it(from user perspective)
  // TODO use header for this
  // TODO FIX IT, IF WE DON'T USE MEMO THEN APP CRASHES, REALLY CONFUSING WHEN FORGETTING ABOUT IT
  useActionModal({
    actions: actions,
    isMenuAction: false,
    menuActions: useMemo(() => [], []),
    onReset: () => setIsReordering(false),
  });

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs
          tabs={tabs}
          onCloseTab={(id) => {
            setFolderId(id);
            setIsRemoveDialogOpen(true);
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
        <RoutineList folderId={"-1"} />
      )}

      {/* // TODO MOVE it to children component? */}
      <ConfirmDialog
        isVisible={isRemoveDialogOpen}
        onCancel={() => setIsRemoveDialogOpen(false)}
        onConfirm={() => handleRemoveFolder(folderId)}
        title="Remove folder"
        message={
          <ThemedText>
            "Are you sure you want to remove this folder?"
          </ThemedText>
        }
      />
      {/* TODO make it global */}
      {/* TODO add animation for routine list even if a few items there */}
      <ConfirmDialog
        isVisible={isRenameDialogOpen}
        onCancel={() => setIsRenameDialogOpen(false)}
        onConfirm={() => {
          renameFolder(folderId, folderName);
          setIsRenameDialogOpen(false);
        }}
        title="Rename folder"
        message={
          <View>
            <StyledInput
              placeholder="Folder name"
              onChangeText={setFolderName}
            />
          </View>
        }
        primaryButtonColor="primary"
      />
    </>
  );
};

export default Index;
