import { ButtonProps, FloatingModalVariant } from "@shared/types/commonTypes";

export const getModalConfig = (variant: FloatingModalVariant) => {
  const defaultMessage = (op: string) => `Press "${op}" to confirm operation.`;

  const configMap: Record<
    FloatingModalVariant,
    {
      primary?: ButtonProps;
      secondary?: ButtonProps;
      message: string;
    }
  > = {
    [FloatingModalVariant.Confirm]: {
      primary: { title: "Confirm", variant: "primary-contained-20" },
      secondary: { title: "Cancel", variant: "secondary-text-20" },
      message: defaultMessage("Confirm"),
    },
    [FloatingModalVariant.Danger]: {
      primary: { title: "Remove", variant: "remove-contained-20" },
      secondary: { title: "Cancel", variant: "secondary-text-20" },
      message: defaultMessage("Remove"),
    },
    [FloatingModalVariant.Cancel]: {
      secondary: { title: "Cancel", variant: "primary-contained-20" },
      message: "",
    },
  };

  const { primary, secondary, message } = configMap[variant];

  const controlsVariant: "both" | "secondary" =
    secondary && primary ? "both" : "secondary";

  return {
    primary,
    secondary,
    controlsVariant,
    message,
  };
};
