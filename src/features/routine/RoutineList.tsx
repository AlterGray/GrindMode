import { useState } from "react";

import { useRouter } from "expo-router";

import { ROUTES } from "@shared/constants/routes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import CreateButton from "@shared/ui/CreateButton";
import NavModal from "@shared/ui/NavModal/NavModal";
import StyledList from "@shared/ui/StyledList/StyledList";
import { ItemData } from "@shared/ui/StyledList/types";
import ThemedView from "@shared/ui/ThemedView";
import TouchBlocker from "@shared/ui/TouchBlocker";

import RoutineListItem from "./RoutineListItem";
import { useRoutineStore } from "./routineStore";
import { Routine } from "./routineTypes";
import useFolderNavModal from "./useFolderNavModal";
import { useRoutineSelectionLogic } from "./useRoutineSelectionLogic";

type RoutineListProps = {
  folderId: string;
};

const RoutineList: React.FC<RoutineListProps> = ({ folderId }) => {
  // TODO use zustand?
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  const routines = useRoutineStore((state) => state.routines);
  const router = useRouter();

  const closeDialogs = () => {
    setIsNavModalOpen(false);
    closeActionModal();
    resetSelection();
  };

  // TODO
  const {
    selectedRoutines,
    toggleRoutine,
    isSelecting,
    resetSelection,
    currentMenuAction,
  } = useRoutineSelectionLogic(
    folderId,
    () => setIsNavModalOpen(true),
    closeDialogs,
  );

  const navModalActions = useFolderNavModal(
    selectedRoutines,
    folderId,
    closeDialogs,
    currentMenuAction,
  );

  const handleRenderRoutine = (item: ItemData) => (
    <RoutineListItem item={item as Routine} />
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

  const routinesInFolder = routines.filter((r) =>
    r.folderIds.includes(folderId),
  );

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <TouchBlocker>
        <StyledList
          data={routinesInFolder}
          selectedItems={selectedRoutines}
          isSelecting={isSelecting}
          onPress={handlePressRoutine}
          toggleItem={toggleRoutine}
          renderContent={handleRenderRoutine}
        />
      </TouchBlocker>

      <CreateButton options={options} routes={createRoutes} />

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
