import React, { useState } from "react";
import { ScrollView } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import StyledInput from "@/components/ui/StyledInput";
import StyledButton from "@/components/ui/StyledButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRoutineStore } from "@/stores/routineStore";

const UpdateRoutine = () => {
  const router = useRouter();
  const updateRoutine = useRoutineStore((state) => state.updateRoutine);
  const { id } = useLocalSearchParams();
  const routineToUpdate = useRoutineStore((state) =>
    state.routines.find((r) => r.id === id),
  );

  const [title, setTitle] = useState(routineToUpdate?.title || "");
  const [description, setDescription] = useState(
    routineToUpdate?.description || "",
  );

  const handleSubmit = () => {
    if (!title.trim()) return;

    // TODO make it better?
    if (!routineToUpdate) {
      return null;
    }

    updateRoutine({
      id: routineToUpdate.id,
      title: title.trim(),
      description: description.trim(),
      startTime: routineToUpdate.startTime,
      expectedDuration: routineToUpdate.expectedDuration,
      actualDuration: routineToUpdate.actualDuration,
      days: routineToUpdate.days,
    });

    router.back();
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 p-4" contentContainerStyle={{ gap: 8 }}>
        <StyledInput
          placeholder="Routine Title"
          value={title}
          onChangeText={setTitle}
        />

        <StyledInput
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <StyledButton
          text="Save"
          onPress={handleSubmit}
          className="ml-auto mr-4 mt-2"
        />
      </ScrollView>
    </ThemedView>
  );
};

export default UpdateRoutine;
