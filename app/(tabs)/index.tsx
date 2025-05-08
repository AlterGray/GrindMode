import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useRoutineStore } from "@features/routine/routineStore";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import ConfirmDialog from "@shared/ui/ConfirmDialog";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";

// TODO
const Index = () => {
  const routines = useRoutineStore((state) => state.routines);
  const folders = useFolderStore((state) => state.folders);

  const isFoldersExists = folders.length > 1;
  const tabs = folders
    .map((folder) => {
      if (
        folder.id === "-1" &&
        routines.filter((r) => r.folderId === folder.id).length === 0
      )
        return;
      else if (folder.id === "-1")
        return { title: "All", content: <RoutineList folderId={folder.id} /> };
      else
        return {
          title: folder.name,
          content: <RoutineList folderId={folder.id} />,
        };
    })
    .filter((i) => i !== undefined);

  return (
    <>
      {isFoldersExists ? (
        <ScrollTabs tabs={tabs} />
      ) : (
        <RoutineList folderId={"-1"} />
      )}
    </>
  );
};

export default Index;
