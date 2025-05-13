import { Colors } from "@/constants/Colors";
import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType as FolderColorType } from "@features/folder/types";
import { getFolderColor } from "@features/folder/utils";
import StyledButton from "@shared/ui/StyledButton";
import StyledInput from "@shared/ui/StyledInput";
import ThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const create = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { addFolder } = useFolderStore();

  const [folderColor, setFolderColor] = useState<FolderColorType>("default");

  const items = (Colors.folderColorsNames as FolderColorType[]).map(
    (name: FolderColorType) => ({
      label: name,
      value: name,
    }),
  );

  const handleCreateFolder = () => {
    addFolder(name, folderColor);
    router.back();
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView className="mx-2 p-4" contentContainerStyle={{ gap: 8 }}>
        {/* // Validate name("All" not allowed) */}
        <StyledInput
          placeholder="Folder name"
          value={name}
          onChangeText={setName}
        />

        <ThemedView className="flex-row items-center gap-8">
          <ThemedText>Folder color:</ThemedText>
          <ThemedView className="max-h-16 flex-1 justify-center overflow-hidden">
            <WheelPickerExpo
              items={items}
              onChange={({ index }) => setFolderColor(items[index].label)}
              initialSelectedIndex={0}
              height={120}
              renderItem={({ label }) => (
                <ThemedView
                  style={{
                    backgroundColor: getFolderColor(label as FolderColorType),
                    width: 15,
                    height: 15,
                  }}
                />
              )}
              width={70}
              selectedStyle={{
                borderColor: Colors.light.border,
                borderWidth: 2,
              }}
              backgroundColor={Colors.light.background}
            />
          </ThemedView>
        </ThemedView>

        <StyledButton
          title="Create"
          onPress={() => handleCreateFolder()}
          className="ml-auto mr-2"
        />
      </ScrollView>
    </ThemedView>
  );
};

export default create;

// TODO:
// NOTES
// hard to switch days on index page
// clock picker has wrong color
// adjust max duration
// add aria labels?
