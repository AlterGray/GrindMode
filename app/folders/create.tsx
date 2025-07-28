import { useState } from "react";
import { ScrollView } from "react-native";

import { useRouter } from "expo-router";

import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType } from "@features/folder/types";
import { useFolderColor } from "@features/folder/useFolderColor";

import { Colors } from "@shared/constants/Colors";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import ColorPicker from "@shared/ui/ColorPicker";
import Separator from "@shared/ui/Separator";
import StyledButton from "@shared/ui/StyledButton";
import StyledInput from "@shared/ui/StyledInput";

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
          placeholder={i18n.t("enterNewFolderName")}
          value={name}
          onChangeText={setName}
          autoFocus
        />

        <Separator horizontal />

        <AnimatedThemedView className="flex-row items-center gap-8">
          <AnimatedThemedText>{i18n.t("folderColor")}</AnimatedThemedText>
          <ColorPicker
            items={items}
            onChange={(color) => setFolderColor(color as FolderColorType)}
          />
        </AnimatedThemedView>

        <StyledButton
          title={i18n.t("create")}
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
