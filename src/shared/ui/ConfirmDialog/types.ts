export enum ConfirmDialogVariant {
  Confirm = "confirm",
  Input = "input",
  Remove = "remove",
  Custom = "custom",
}

export type ConfirmDialogOptions = Partial<
  Omit<
    ConfirmDialogStore,
    "openConfirmDialog" | "closeConfirmDialog" | "isOpen"
  >
>;

export type ConfirmDialogStore = {
  isOpen: boolean;
  title: string;
  variant: ConfirmDialogVariant;
  message?: React.ReactNode;
  placeholder?: string;
  initialValue?: string;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  openConfirmDialog: (options: ConfirmDialogOptions) => void;
  closeConfirmDialog: () => void;
};
