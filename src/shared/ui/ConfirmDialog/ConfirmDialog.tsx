import React from "react";
import { Modal, Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import ThemedView from "../ThemedView";
import StyledButton from "../StyledButton";
import useConfirmDialogStore from "./ConfirmDialogStore";
import StyledInput from "../StyledInput";

// TODO rewrite with expo modal?
// https://docs.expo.dev/router/advanced/modals/
// TODO finish it
// TODO make it global
const ConfirmDialog: React.FC = () => {
  const { isOpen, title, message, onConfirm, onCancel, variant } =
    useConfirmDialogStore();

  const overlayStyle =
    "flex-1 items-center justify-center bg-slate-900/20 dark:bg-slate-200/20";
  const containerStyle = "w-10/12 rounded-xl p-4 bg-backgroundSurface gap-2";
  const titleStyle = "mb-1 text-base font-medium text-lg";
  const messageStyle = "mb-4 text-sm text-muted";
  const buttonRowStyle = "flex-row justify-end gap-2";

  let content: React.ReactNode;
  switch (variant) {
    case "confirm":
      content = <ThemedText className={messageStyle}>{message}</ThemedText>;
      break;
    case "custom":
      content = message;
      break;
    case "input":
      content = <StyledInput />;
      break;
    case "remove":
      content = <ThemedText className={messageStyle}>{message}</ThemedText>;
      break;
  }
  return (
    <Modal
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onCancel}
      visible={isOpen}
      animationType="fade"
    >
      <Pressable onPress={onCancel} className="absolute inset-0"></Pressable>
      <ThemedView className={overlayStyle} pointerEvents="box-none">
        <ThemedView className={containerStyle}>
          <ThemedText className={titleStyle}>{title}</ThemedText>
          {content}
          <View className={buttonRowStyle}>
            <StyledButton
              variant={"secondary"}
              onPress={onCancel}
              title={"Cancel"}
              color={"secondary"}
            />
            <StyledButton
              variant={"primary"}
              onPress={onConfirm}
              title={"Confirm"}
              color={"primary"}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default ConfirmDialog;
