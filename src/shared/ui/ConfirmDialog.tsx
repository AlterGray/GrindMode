import React from "react";
import { Modal, Pressable, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import StyledButton from "./StyledButton";

type ConfirmDialogProps = {
  isVisible: boolean;
  title?: string;
  message?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  confirmVariant?: "primary" | "secondary" | "text";
  cancelVariant?: "primary" | "secondary" | "text";
  primaryButtonColor?: "primary" | "secondary" | "danger";
  secondaryButtonColor?: "primary" | "secondary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

// TODO rewrite with expo modal?
// https://docs.expo.dev/router/advanced/modals/
// TODO finish it
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isVisible,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  primaryButtonText: confirmText = "Confirm",
  secondaryButtonText: cancelText = "Cancel",
  confirmVariant = "primary",
  cancelVariant = "text",
  primaryButtonColor = "danger",
  secondaryButtonColor = "primary",
  onConfirm,
  onCancel,
}) => {
  const overlayStyle =
    "flex-1 items-center justify-center bg-slate-900/20 dark:bg-slate-200/20";
  const containerStyle = "w-10/12 rounded-xl p-4 bg-backgroundSurface gap-2";
  const titleStyle = "mb-1 text-base font-medium text-lg";
  const messageStyle = "mb-4 text-sm text-muted";
  const buttonRowStyle = "flex-row justify-end gap-2";

  return (
    <Modal
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onCancel}
      visible={isVisible}
      animationType="fade"
    >
      <Pressable onPress={onCancel} className="absolute inset-0"></Pressable>
      <ThemedView className={overlayStyle} pointerEvents="box-none">
        <ThemedView className={containerStyle}>
          <ThemedText className={titleStyle}>{title}</ThemedText>
          {message}
          <View className={buttonRowStyle}>
            <StyledButton
              variant={cancelVariant}
              onPress={onCancel}
              title={cancelText}
              color={secondaryButtonColor}
            />
            <StyledButton
              variant={confirmVariant}
              onPress={onConfirm}
              title={confirmText}
              color={primaryButtonColor}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default ConfirmDialog;
