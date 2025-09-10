import React, { useState } from "react";

import { Redirect } from "expo-router";

import FolderRenameDialog from "@features/folder/components/FolderRenameDialog";
import { useFolderStore } from "@features/folder/folderStore";
import { foldersToScrollTabs } from "@features/folder/utils";
import RitualList from "@features/rituals/RitualList";

import { ALL_FOLDER_ID, TODAY_FOLDER_ID } from "@shared/constants/Folders";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { useSettingsStore } from "@shared/stores/settingsStore";
import { FloatingModalVariant } from "@shared/types/commonTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";

// TODO performance, too many rerenders(use some tools/techniques to analyz and found it, read articles from like dan abramow and watch it synyak)
const Index = () => {
  const [renamingFolderId, setRenamingFolderId] = useState("");
  // TODO custom hooks + more zustand store for declarative style, intoduce selectors and status flags
  const folders = useFolderStore((state) => state.folders);
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  const setSelectedFolderId = useFolderStore((state) => state.setSelectedId);
  const previousFolder = useFolderStore((state) => state.previousSelectedId);
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

  const hiddenTabs = useSettingsStore((state) => state.hiddenTabs);
  const displayed = Object.values(hiddenTabs).filter((tab) => !tab.hidden);

  if (hiddenTabs.index.hidden) {
    let mostPriorTab = displayed[0];

    for (const tab of displayed) {
      if (tab.priority < mostPriorTab.priority) {
        mostPriorTab = tab;
      }
    }

    // TODO fix
    return <Redirect href={`/(tabs)/${mostPriorTab.name}`} />;
  }

  // TODO make shared action type
  const actions = [
    {
      iconName: "checkmark" as const,
      onPress: closeActionModal,
    },
  ];

  const handleOpenRemoveDialog = (folderId: string) => {
    openRemoveDialog({
      title: i18n.t("removeFolder"),
      variant: FloatingModalVariant.Remove,
      onConfirm: () => {
        removeFolder(folderId);
        setSelectedFolderId(previousFolder || TODAY_FOLDER_ID);
      },
    });
    setRenamingFolderId(folderId);
  };

  // TODO move it out
  const getFolderMenuItems = (folderId: string) => {
    let menuItems: PopoverMenuItem[] = [];

    if (folderId !== ALL_FOLDER_ID && folderId !== TODAY_FOLDER_ID)
      menuItems = [
        {
          label: i18n.t("removeFolder"),
          onPress: () => handleOpenRemoveDialog(folderId),
        },
        {
          label: i18n.t("renameFolder"),
          onPress: () => {
            setIsRenameDialogOpen(true);
            setRenamingFolderId(folderId);
          },
        },
      ];
    menuItems.push({
      label: i18n.t("reorderFolders"),
      onPress: () => {
        openActionModal({
          text: i18n.t("reorderFolders"),
          actions: actions,
          onCloseDialog: () => setIsReordering(false),
        });
        setIsReordering(true);
      },
    });

    return menuItems;
  };

  const isFoldersExists = true;
  const tabs = foldersToScrollTabs(
    folders.map((folder) => ({
      ...folder,
      name: folder.id < "0" ? i18n.t(folder.name) : folder.name,
    })),
    () => <RitualList />,
    (folderId) => getFolderMenuItems(folderId),
  );

  const folderToRename = folders.find((f) => f.id === renamingFolderId);

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs
          selectedTab={selectedFolderId}
          tabs={tabs}
          onPress={(folderId: string) => setSelectedFolderId(folderId)}
          onCloseTab={handleOpenRemoveDialog}
          isReordering={isReordering}
          filteredTitles={[
            i18n.t(folders.find((f) => f.id === ALL_FOLDER_ID)?.name ?? ""),
            i18n.t(folders.find((f) => f.id === TODAY_FOLDER_ID)?.name ?? ""),
          ]}
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
        <RitualList />
      )}

      <FolderRenameDialog
        key={folderToRename?.name}
        isOpen={isRenameDialogOpen}
        initialValue={folderToRename?.name ?? ""}
        onConfirm={(newName) => {
          renameFolder(renamingFolderId, newName);
          setIsRenameDialogOpen(false);
        }}
        onCancel={() => setIsRenameDialogOpen(false)}
      />
    </>
  );
};

export default Index;
