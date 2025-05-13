import {
  StyledButtonColor,
  StyledButtonVariant,
} from "@shared/types/commonTypes";

// TODO React.ReactNode | string
export type ConfirmDialogStore = {
  isOpen: boolean;
  title: string;
  message: React.ReactNode | string;
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
