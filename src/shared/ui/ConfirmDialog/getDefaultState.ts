// TODO why function? -
// Consistency: Using getDefaultState ensures that each call to closeConfirmModal gets
// a fresh instance of the default state, including a new instance of the message component.

import { ConfirmDialogStore } from "./types";

// Scalability: If you want to add more dynamic defaults or logic, you can easily adjust
// the getDefaultState function without affecting the core implementation.

// Predictability: This pattern prevents stale closures and unexpected re-renders,
// making state management more predictable.
export const getDefaultState = (): Omit<
  ConfirmDialogStore,
  "setConfirmDialog" | "closeConfirmModal"
> => ({
  isOpen: false,
  variant: "confirm",
  onConfirm: () => {},
  onCancel: () => {},
  title: "",
  message: "",
});
