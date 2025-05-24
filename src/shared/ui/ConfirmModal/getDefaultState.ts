import { ConfirmModalStore, ConfirmModalVariant } from "./types";

type DefaultModalState = Omit<
  ConfirmModalStore,
  "openConfirmModal" | "closeConfirmModal"
>;

export function getDefaultModalState(): DefaultModalState {
  return {
    isOpen: false,
    title: "",
    variant: ConfirmModalVariant.Confirm,
    message: null,
    placeholder: undefined,
    initialValue: undefined,
    onConfirm: () => {},
    onCancel: () => {},
  };
}
