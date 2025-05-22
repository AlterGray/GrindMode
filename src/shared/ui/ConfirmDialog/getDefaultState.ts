import { ConfirmDialogStore, ConfirmDialogVariant } from "./types";

export function getDefaultDialogState(): Omit<
  ConfirmDialogStore,
  "setConfirmDialog" | "closeConfirmDialog"
> {
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
