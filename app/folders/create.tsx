import { useState } from "react";
import { ScrollView } from "react-native";

import { useRouter } from "expo-router";

import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType } from "@features/folder/types";
import { useFolderColor } from "@features/folder/useFolderColor";

import { Colors } from "@shared/constants/Colors";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import ColorPicker from "@shared/ui/ColorPicker";
import StyledButton from "@shared/ui/StyledButton";
import StyledInput from "@shared/ui/StyledInput";
import AnimatedThemedText from "@shared/ui/ThemedText";

// TODO rename file?
const create = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const addFolder = useFolderStore((state) => state.addFolder);

  const [folderColor, setFolderColor] = useState<FolderColorType>("default");
  const getFolderColor = useFolderColor();

  const items = (Colors.folderColorsNames as FolderColorType[]).map(
    (name: FolderColorType) => ({
      label: name,
      value: getFolderColor(name),
    }),
  );

  const handleCreateFolder = () => {
    addFolder(name, folderColor);
    router.back();
  };

  return (
    <AnimatedThemedView className="flex-1">
      <ScrollView className="mx-2 p-4" contentContainerStyle={{ gap: 8 }}>
        {/* // Validate name("All" not allowed) */}
        {/* use keyboard avoid? */}
        <StyledInput
          placeholder="Folder name"
          value={name}
          onChangeText={setName}
          autoFocus
        />

        <AnimatedThemedView className="flex-row items-center gap-8">
          <AnimatedThemedText>Folder color:</AnimatedThemedText>
          <ColorPicker
            items={items}
            onChange={(color) => setFolderColor(color as FolderColorType)}
          />
        </AnimatedThemedView>

        <StyledButton
          title="Create"
          onPress={handleCreateFolder}
          className="ml-auto mr-2"
        />
      </ScrollView>
    </AnimatedThemedView>
  );
};

export default create;

// TODO:
// NOTES
// hard to switch days on index page
// clock picker has wrong color
// adjust max duration
// add aria labels?
