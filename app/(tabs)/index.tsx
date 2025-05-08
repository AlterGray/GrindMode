import React from "react";
import ScrollTabs from "@shared/ui/ScrollTabs/ScrollTabs";
import { useFolderStore } from "@features/folder/folderStore";
import RoutineList from "@features/routine/RoutineList";

// TODO
const Index = () => {
  const folders = useFolderStore((state) => state.folders);

  const isFoldersExists = folders.length > 1;
  const tabs = folders
    .map((folder) => {
      if (folder.id === "-1" && folders.length == 1) return;
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
