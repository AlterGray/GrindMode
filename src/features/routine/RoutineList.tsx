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

import RoutineListItem from "./RoutineListItem";
import useFolderNavModal from "./hooks/useFolderNavModal";
import { useRoutineSelection } from "./hooks/useRoutineSelection";
import { useRoutinesWithStatus } from "./hooks/useRoutinesWithStatus";
import { useRoutineStore } from "./routineStore";
import { Routine } from "./routineTypes";

const RoutineList: React.FC = () => {
  // TODO use zustand?
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  const isSelectingRoutines = useRoutineStore((state) => state.isSelecting);
  const selectedRoutineIds = useRoutineStore((state) => state.selectedIds);
  const routinesWithStatus = useRoutinesWithStatus();
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  const router = useRouter();

  const closeDialogs = () => {
    setIsNavModalOpen(false);
    closeActionModal();
    resetSelection();
  };

  // TODO
  const { toggleRoutine, resetSelection, currentMenuAction } =
    useRoutineSelection(() => setIsNavModalOpen(true), closeDialogs);

  const navModalActions = useFolderNavModal(closeDialogs, currentMenuAction);

  const handleRenderRoutine = (item: ItemData) => (
    <RoutineListItem
      item={item as Routine}
      isSelected={selectedRoutineIds.includes(item.id)}
    />
  );

  const handlePressRoutine = (id: string) => {
    router.push({ pathname: ROUTES.ROUTINES_UPDATE, params: { id } });
  };

  const options = [
    { label: "Folder", value: "folder" },
    { label: "Routine", value: "routine" },
  ];

  const createRoutes = {
    folder: ROUTES.FOLDERS_CREATE,
    routine: ROUTES.ROUTINES_CREATE,
  };

  const routinesInFolder = routinesWithStatus.filter((r) =>
    r.folderIds.includes(selectedFolderId),
  );

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledList
        data={routinesInFolder}
        isSelecting={isSelectingRoutines}
        onPress={handlePressRoutine}
        toggleItem={toggleRoutine}
        renderContent={handleRenderRoutine}
      />

      <CreateButton
        options={options}
        routes={createRoutes}
        disabled={isSelectingRoutines}
      />

      <NavModal
        isVisible={isNavModalOpen}
        onClose={() => setIsNavModalOpen(false)}
        title="Select folder"
        actions={navModalActions}
      />
    </ThemedView>
  );
};

export default RoutineList;
