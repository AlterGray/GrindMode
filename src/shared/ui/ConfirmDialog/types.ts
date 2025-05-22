export enum ConfirmDialogVariant {
  Confirm = "confirm",
  Input = "input",
  Remove = "remove",
  Custom = "custom",
}

export type ConfirmDialogStore = {
  isOpen: boolean;
  title: string;
  variant: ConfirmDialogVariant;
  message?: React.ReactNode;
  placeholder?: string;
  initialValue?: string;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  setConfirmDialog: (
    options: Partial<
      Omit<ConfirmDialogStore, "setConfirmDialog" | "closeConfirmModal">
    >,
  ) => void;
  closeConfirmDialog: () => void;
};
