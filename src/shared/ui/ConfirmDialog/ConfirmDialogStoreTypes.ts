import {
  StyledButtonColor,
  StyledButtonVariant,
} from "@shared/types/commonTypes";

export type ConfirmDialogStore = {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryVariant: StyledButtonVariant;
  cancelVariant: StyledButtonVariant;
  primaryColor: StyledButtonColor;
  secondaryColor: StyledButtonColor;
  onConfirm: () => void;
  onCancel: () => void;
  setConfirmDialog: (
    options: Partial<
      Omit<ConfirmDialogStore, "setConfirmDialog" | "closeConfirmModal">
    >,
  ) => void;
  closeConfirmModal: () => void;
};
