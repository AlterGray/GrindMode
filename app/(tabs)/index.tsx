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

// TODO
const Index = () => {
  const folders = useFolderStore((state) => state.folders);
  const removeFolder = useFolderStore((state) => state.removeFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");

  const isFoldersExists = folders.length > 1;
  const tabs = folders
    .map((folder) => {
      if (folder.id === "-1" && folders.length == 1) return;
      else
        return {
          title: folder.name,
          content: <RoutineList folderId={folder.id} />,
          menuItems:
            folder.id === "-1"
              ? []
              : [
                  {
                    label: "Delete folder",
                    onPress: () => {
                      setIsRemoveDialogOpen(true);
                      setFolderId(folder.id);
                    },
                  },
                  {
                    label: "Rename folder",
                    onPress: () => {
                      setIsRenameDialogOpen(true);
                      setFolderId(folder.id);
                    },
                  },
                ],
        };
    })
    .filter((i) => i !== undefined);

  const { setIsOpen } = useActionModalStore();

  const actions = [
    {
      iconName: "checkmark" as const,
      onPress: () => {
        setIsOpen(false);
      },
    },
  ];

  // TODO use header for this
  // TODO FIX IT, IF WE DON'T USE MEMO THEN APP CRASHES, REALLY CONFUSING WHEN FORGETTING ABOUT IT
  useActionModal({
    actions: actions,
    isMenuAction: false,
    menuActions: useMemo(() => [], []),
    onReset: () => {},
  });

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs tabs={tabs} onCloseTab={() => {}} />
      ) : (
        <RoutineList folderId={"-1"} />
      )}

      <ConfirmDialog
        isVisible={isRemoveDialogOpen}
        onCancel={() => setIsRemoveDialogOpen(false)}
        onConfirm={() => {
          removeFolder(folderId);
          setIsRemoveDialogOpen(false);
        }}
        title="Delete folder"
        message={
          <ThemedText>
            "Are you sure you want to delete this folder?"
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
