import React from "react";
import { Modal, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import StyledButton from "./StyledButton";

type ConfirmDialogProps = {
  isVisible: boolean;
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  confirmVariant?: "primary" | "secondary" | "text";
  cancelVariant?: "primary" | "secondary" | "text";
  primaryButtonColor?: "primary" | "secondary" | "danger";
  secondaryButtonColor?: "primary" | "secondary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

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
  const overlayStyle = "flex-1 items-center justify-center bg-black/50";
  const containerStyle = "w-10/12 rounded-xl p-4 bg-backgroundSurface";
  const titleStyle = "mb-1 text-base font-medium";
  const messageStyle = "mb-4 text-sm text-muted";
  const buttonRowStyle = "flex-row justify-end gap-2";

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View className={overlayStyle}>
        <ThemedView className={containerStyle}>
          <ThemedText className={titleStyle}>{title}</ThemedText>
          <ThemedText className={messageStyle}>{message}</ThemedText>
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
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
