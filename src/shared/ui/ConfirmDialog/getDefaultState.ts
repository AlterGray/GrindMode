import { ConfirmDialogStore, ConfirmDialogVariant } from "./types";

type DefaultDialogState = Omit<
  ConfirmDialogStore,
  "openConfirmDialog" | "closeConfirmDialog"
>;

export function getDefaultDialogState(): DefaultDialogState {
  return {
    isOpen: false,
    title: "",
    variant: ConfirmDialogVariant.Confirm,
    message: null,
    placeholder: undefined,
    initialValue: undefined,
    onConfirm: () => {},
    onCancel: () => {},
  };
}
