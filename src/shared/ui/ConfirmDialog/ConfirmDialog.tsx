import React, { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import ThemedView from "../ThemedView";
import StyledButton from "../StyledButton";
import useConfirmDialogStore from "./ConfirmDialogStore";
import StyledInput from "../StyledInput";
import { ConfirmDialogVariant } from "./types";
import { getDialogConfig } from "./utils";

const ConfirmDialog: React.FC = () => {
  const dialog = useConfirmDialogStore();
  const config = getDialogConfig(dialog.variant);
  const [inputText, setInputText] = useState("");

  let content: React.ReactNode;

  const resetInput = () => setInputText(dialog.initialValue ?? "");
  useEffect(() => {
    if (dialog.isOpen && dialog.variant === ConfirmDialogVariant.Input) {
      resetInput();
    }
  }, [dialog.isOpen, dialog.initialValue, dialog.variant]);
  if (dialog.variant === ConfirmDialogVariant.Input) {
    content = (
      <StyledInput
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
    );
  } else if (dialog.variant === ConfirmDialogVariant.Custom) {
    content = dialog.message;
  } else {
    content = (
      <ThemedText className="text-muted mb-4 text-sm">
        {dialog.message ?? config.message}
      </ThemedText>
    );
  }

  return (
    <Modal transparent visible={dialog.isOpen} animationType="fade">
      <Pressable className="absolute inset-0" onPress={dialog.onCancel} />
      <ThemedView className="flex-1 items-center justify-center bg-slate-900/20 dark:bg-slate-200/20">
        <ThemedView className="bg-backgroundSurface w-10/12 gap-2 rounded-xl p-4">
          <ThemedText className="mb-1 text-lg font-medium">
            {dialog.title}
          </ThemedText>
          {content}
          <View className="flex-row justify-end gap-2">
            <StyledButton
              variant={config.secondary.variant}
              title={config.secondary.title}
              onPress={dialog.onCancel}
            />
            <StyledButton
              variant={config.primary.variant}
              title={config.primary.title}
              onPress={() => dialog.onConfirm(inputText)}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default ConfirmDialog;
