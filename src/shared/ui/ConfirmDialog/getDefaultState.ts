// TODO why function? -
// Consistency: Using getDefaultState ensures that each call to closeConfirmModal gets
// a fresh instance of the default state, including a new instance of the message component.

import React from "react";
import DefaultMessage from "./DefaultMessage";
import {
  DEFAULT_PRIMARY_BUTTON_TEXT,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_PRIMARY_VARIANT,
  DEFAULT_SECONDARY_BUTTON_TEXT,
  DEFAULT_SECONDARY_COLOR,
  DEFAULT_SECONDARY_VARIANT,
  DEFAULT_TITLE,
} from "./constants";
import { ConfirmDialogStore } from "./ConfirmDialogStoreTypes";

// Scalability: If you want to add more dynamic defaults or logic, you can easily adjust
// the getDefaultState function without affecting the core implementation.

// Predictability: This pattern prevents stale closures and unexpected re-renders,
// making state management more predictable.
export const getDefaultState = (): Omit<
  ConfirmDialogStore,
  "setConfirmDialog" | "closeConfirmModal"
> => ({
  isOpen: false,
  title: DEFAULT_TITLE,
  message: React.createElement(DefaultMessage),
  primaryButtonText: DEFAULT_PRIMARY_BUTTON_TEXT,
  secondaryButtonText: DEFAULT_SECONDARY_BUTTON_TEXT,
  primaryVariant: DEFAULT_PRIMARY_VARIANT,
  cancelVariant: DEFAULT_SECONDARY_VARIANT,
  primaryColor: DEFAULT_PRIMARY_COLOR,
  secondaryColor: DEFAULT_SECONDARY_COLOR,
  onConfirm: () => {},
  onCancel: () => {},
});
