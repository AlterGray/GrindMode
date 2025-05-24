import { Variant } from "../StyledButton";
import { ConfirmModalVariant } from "./types";

// TODO default message exist but if I don't put it then it empty, why if logic here add default value
export const getModalConfig = (variant: ConfirmModalVariant) => {
  const defaultMessage = (op: string) => `Press "${op}" to confirm operation.`;
  // TODO replace with enum!
  let primary: { title: string; variant: Variant };
  let secondary: { title: string; variant: Variant };
  let message: string;

  switch (variant) {
    case ConfirmModalVariant.Confirm:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = defaultMessage("Confirm");
      break;
    case ConfirmModalVariant.Remove:
      primary = { title: "Remove", variant: "remove-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = defaultMessage("Remove");
      break;
    case ConfirmModalVariant.Input:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = ""; // input handled in UI
      break;
    case ConfirmModalVariant.Custom:
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
