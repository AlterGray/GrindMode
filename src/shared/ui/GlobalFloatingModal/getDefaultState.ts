import { FloatingModalVariant } from "@shared/types/commonTypes";
import { DefaultGlobalModalState } from "./types";

export function getDefaultModalState(): DefaultGlobalModalState {
  return {
    isOpen: false,
    title: "Confirm action",
    variant: FloatingModalVariant.Confirm,
    onConfirm: () => {},
    onCancel: () => {},
  };
}
