import { ButtonProps, FloatingModalVariant } from "@shared/types/commonTypes";

export const getModalConfig = (variant: FloatingModalVariant) => {
  const defaultMessage = (op: string) => `Press "${op}" to confirm operation.`;

  let primary: ButtonProps;
  let secondary: ButtonProps;
  let message: string;

  switch (variant) {
    case FloatingModalVariant.Confirm:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = defaultMessage("Confirm");
      break;
    case FloatingModalVariant.Ok:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = "";
      break;
    case FloatingModalVariant.Danger:
      primary = { title: "Remove", variant: "remove-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = defaultMessage("Remove");
      break;
    default:
      primary = { title: "Confirm", variant: "primary-contained-20" };
      secondary = { title: "Cancel", variant: "secondary-text-20" };
      message = "";
  }

  return {
    primary,
    secondary,
    message,
  };
};
