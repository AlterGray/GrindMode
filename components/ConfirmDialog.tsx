import React from 'react';
import { Modal, View } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { ThemedView } from './ui/ThemedView';
import StyledButton from './ui/StyledButton';

type ConfirmDialogProps = {
  isVisible: boolean;
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'text';
  cancelVariant?: 'primary' | 'secondary' | 'text';
  primaryButtonColor?: 'primary' | 'secondary' | 'danger';
  secondaryButtonColor?: 'primary' | 'secondary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isVisible,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  primaryButtonText: confirmText = 'Confirm',
  secondaryButtonText: cancelText = 'Cancel',
  confirmVariant = 'primary',
  cancelVariant = 'text',
  primaryButtonColor = 'danger',
  secondaryButtonColor = 'primary',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <ThemedView className="bg-backgroundSurface p-4 rounded-xl w-10/12">
          <ThemedText className="text-base font-medium mb-1">{title}</ThemedText>
          <ThemedText className="text-sm text-muted mb-4">{message}</ThemedText>
          <View className="flex-row justify-end gap-2">
            <StyledButton variant={cancelVariant} onPress={onCancel} text={cancelText} color={secondaryButtonColor} />
            <StyledButton variant={confirmVariant} onPress={onConfirm} text={confirmText} color={primaryButtonColor} />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
