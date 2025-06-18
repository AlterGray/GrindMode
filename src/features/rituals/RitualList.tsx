import { useState } from "react";

import { useRouter } from "expo-router";

import { useFolderStore } from "@features/folder/folderStore";

import { ROUTES } from "@shared/constants/routes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import CreateButton from "@shared/ui/CreateButton";
import NavModal from "@shared/ui/NavModal/NavModal";
import StyledList from "@shared/ui/StyledList/StyledList";
import { ItemData } from "@shared/ui/StyledList/types";
import ThemedView from "@shared/ui/ThemedView";

import { RemoveRitualModal } from "./RemoveRitualModal";
import RitualListItem from "./RitualListItem";
import useFolderNavModal from "./hooks/useFolderNavModal";
import { useRitualSelection } from "./hooks/useRitualSelection";
import { useRitualsWithStatus } from "./hooks/useRitualsWithStatus";
import { useRitualStore } from "./ritualStore";
import { Ritual } from "./ritualTypes";

const RitualList: React.FC = () => {
  // TODO use zustand?
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  const isSelectingRituals = useRitualStore((state) => state.isSelecting);
  const selectedRitualIds = useRitualStore((state) => state.selectedIds);
  const ritualsWithStatus = useRitualsWithStatus();
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  const router = useRouter();

  const closeDialogs = () => {
    setIsNavModalOpen(false);
    closeActionModal();
    resetSelection();
  };

  // TODO
  const { toggleRitual, resetSelection, currentMenuAction } =
    useRitualSelection(
      () => setIsNavModalOpen(true),
      () => setIsRemoveModalOpen(true),
      closeDialogs,
    );

  const navModalActions = useFolderNavModal(closeDialogs, currentMenuAction);

  const handleRenderRitual = (item: ItemData) => (
    <RitualListItem
      item={item as Ritual}
      isSelected={selectedRitualIds.includes(item.id)}
    />
  );

  const handlePressRitual = (id: string) => {
    router.push({ pathname: ROUTES.RITUALS_UPDATE, params: { id } });
  };

  const options = [
    { label: "Folder", value: "folder" },
    { label: "Ritual", value: "ritual" },
  ];

  const createRoutes = {
    folder: ROUTES.FOLDERS_CREATE,
    ritual: ROUTES.RITUALS_CREATE,
  };

  const ritualsInFolder = ritualsWithStatus.filter(
    (r) => r.folderIds.includes(selectedFolderId) && !r.isDeleted,
  );

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledList
        data={ritualsInFolder}
        isSelecting={isSelectingRituals}
        onPress={handlePressRitual}
        toggleItem={toggleRitual}
        renderContent={handleRenderRitual}
      />

      <CreateButton
        options={options}
        routes={createRoutes}
        disabled={isSelectingRituals}
      />

      <NavModal
        isVisible={isNavModalOpen}
        onClose={() => setIsNavModalOpen(false)}
        title="Select folder"
        actions={navModalActions}
      />

      {/* TODO should close all modals on: onConfirm */}
      <RemoveRitualModal
        key={isRemoveModalOpen.toString()}
        isOpen={isRemoveModalOpen}
        ritualIds={selectedRitualIds}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={closeDialogs}
      />
    </ThemedView>
  );
};

export default RitualList;
