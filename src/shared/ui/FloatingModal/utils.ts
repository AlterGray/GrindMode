import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { ButtonProps, FloatingModalVariant } from "@shared/types/commonTypes";

export const getModalConfig = (variant: FloatingModalVariant) => {
  const defaultMessage = (op: string) =>
    `${i18n.t("press")} "${i18n.t(op.toLocaleLowerCase() + "Operation")}" ${i18n.t("toConfirmOperation")}`;

  const configMap: Record<
    FloatingModalVariant,
    {
      primary?: ButtonProps;
      secondary?: ButtonProps;
      message: string;
    }
  > = {
    [FloatingModalVariant.Confirm]: {
      primary: { title: i18n.t("confirm"), variant: "primary-contained-20" },
      secondary: { title: i18n.t("cancel"), variant: "secondary-text-20" },
      message: defaultMessage("Confirm"),
    },
    [FloatingModalVariant.Remove]: {
      primary: { title: i18n.t("remove"), variant: "remove-contained-20" },
      secondary: { title: i18n.t("cancel"), variant: "secondary-text-20" },
      message: defaultMessage("Remove"),
    },
    [FloatingModalVariant.Reset]: {
      primary: { title: i18n.t("reset"), variant: "remove-contained-20" },
      secondary: { title: i18n.t("cancel"), variant: "secondary-text-20" },
      message: defaultMessage("Reset"),
    },
    [FloatingModalVariant.Cancel]: {
      secondary: { title: i18n.t("cancel"), variant: "primary-contained-20" },
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
