import { FloatingModalVariant } from "@shared/types/commonTypes";

export type GlobalFloatingModalOptions = Partial<
  Omit<GlobalFloatingModalState, "openModal" | "closeModal" | "isOpen">
>;

export type DefaultGlobalModalState = Omit<
  GlobalFloatingModalState,
  "openModal" | "closeModal"
>;

export type GlobalFloatingModalState = {
  isOpen: boolean;
  title: string;
  variant: FloatingModalVariant;
  text?: string;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  openModal: (options: GlobalFloatingModalOptions) => void;
  closeModal: () => void;
};
