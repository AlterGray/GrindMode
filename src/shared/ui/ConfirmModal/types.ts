export enum ConfirmModalVariant {
  Confirm = "confirm",
  Input = "input",
  Remove = "remove",
  Custom = "custom",
}

// TODO use enums or something like that for Omit?
export type ConfirmModalOptions = Partial<
  Omit<ConfirmModalStore, "openConfirmModal" | "closeConfirmModal" | "isOpen">
>;

export type ConfirmModalStore = {
  isOpen: boolean;
  title: string;
  variant: ConfirmModalVariant;
  message?: React.ReactNode;
  placeholder?: string;
  initialValue?: string;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  openConfirmModal: (options: ConfirmModalOptions) => void;
  closeConfirmModal: () => void;
};
