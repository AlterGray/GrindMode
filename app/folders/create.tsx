import { useFolderStore } from "@features/folder/folderStore";
import StyledButton from "@shared/ui/StyledButton";
import StyledInput from "@shared/ui/StyledInput";
import ThemedView from "@shared/ui/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

const CreateFolder = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { addFolder } = useFolderStore();
  return (
    <ThemedView className="flex-1">
      <ScrollView className="mx-2 p-4" contentContainerStyle={{ gap: 8 }}>
        {/* // Validate name("All" not allowed) */}
        <StyledInput
          placeholder="Folder name"
          value={name}
          onChangeText={setName}
        />
        <StyledButton
          title="Create"
          onPress={() => {
            addFolder(name);
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
