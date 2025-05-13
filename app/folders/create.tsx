import { Colors } from "@/constants/Colors";
import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType as FolderColorType } from "@features/folder/types";
import { useThemeStore } from "@shared/stores/themeStore";
import StyledButton from "@shared/ui/StyledButton";
import StyledInput from "@shared/ui/StyledInput";
import ThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const CreateFolder = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { addFolder } = useFolderStore();

  const isDark = useThemeStore((state) => state.isDark);

  const [folderColor, setFolderColor] = useState<FolderColorType>("default");

  const items = (Colors.folderColorsNames as FolderColorType[]).map(
    (name: FolderColorType) => ({
      label: name,
      value: name,
    }),
  );

  const getColor = (label: FolderColorType) =>
    Colors.folderColors[label]?.[isDark ? "dark" : "light"] ??
    Colors.folderColors["default"][isDark ? "dark" : "light"];

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
          {/* // TODO ? vs && */}
          <ThemedView className="max-h-16 flex-1 justify-center overflow-hidden">
            <WheelPickerExpo
              items={items}
              onChange={({ index }) => setFolderColor(items[index].label)}
              initialSelectedIndex={0}
              height={120}
              renderItem={({ label }) => (
                <ThemedView
                  style={{
                    backgroundColor: getColor(label as FolderColorType),
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
          onPress={() => {
            addFolder(name, folderColor);
            router.back();
          }}
          className="ml-auto mr-2"
        />
      </ScrollView>
    </ThemedView>
  );
};

export default CreateFolder;

// TODO:
// NOTES
// hard to switch days on index page
// clock picker has wrong color
// adjust max duration
// add aria labels?
