import { Variant } from "../StyledButton";
import { ConfirmDialogVariant } from "./types";

export const getDialogConfig = (variant: ConfirmDialogVariant) => {
  const defaultMessage = (op: string) => `Press "${op}" to confirm operation.`;
  // TODO replace with enum!
  let primary: { title: string; variant: Variant };
  let secondary: { title: string; variant: Variant };
  let message: string;

  switch (variant) {
    case ConfirmDialogVariant.Confirm:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = defaultMessage("Confirm");
      break;
    case ConfirmDialogVariant.Remove:
      primary = { title: "Remove", variant: "remove-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = defaultMessage("Remove");
      break;
    case ConfirmDialogVariant.Input:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = ""; // input handled in UI
      break;
    case ConfirmDialogVariant.Custom:
    default:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = ""; // assume UI overrides
  }

  return {
    primary,
    secondary,
    message,
  };
};
