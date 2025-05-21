// TODO add enum for proper use?
type ConfirmDialogVariant = "confirm" | "input" | "remove" | "custom";

// TODO React.ReactNode | string
export type ConfirmDialogStore = {
  isOpen: boolean;
  title: string;
  message: React.ReactNode | string;
  variant: ConfirmDialogVariant;
  onConfirm: () => void;
  onCancel: () => void;
  setConfirmDialog: (
    options: Partial<
      Omit<ConfirmDialogStore, "setConfirmDialog" | "closeConfirmModal">
    >,
  ) => void;
  closeConfirmModal: () => void;
};
