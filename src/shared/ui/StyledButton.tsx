import React from "react";
import { Text, TouchableOpacity } from "react-native";

export type Variant =
  | "primary-contained-20"
  | "secondary-text-10"
  | "secondary-text-20"
  | "remove-contained-20";

type StyledButtonProps = {
  title: string;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  titleClassName?: string;
  children?: never;
  onPress?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  variant = "primary-contained-20",
  fullWidth = false,
  className = "",
  titleClassName = "",
  onPress,
}) => {
  // Parse variant: "primary-contained-20" => intent, style, size
  const [intent, style, sizeRaw] = variant.split("-") as [
    "primary" | "secondary" | "remove",
    "contained" | "text",
    "10" | "20",
  ];

  // Map intent to styles
  const bgColorMap = {
    primary:
      "bg-light-buttonPrimaryBackground dark:bg-dark-buttonPrimaryBackground",
    secondary:
      "bg-light-buttonSecondaryBackground dark:bg-dark-buttonSecondaryBackground",
    remove:
      "bg-light-buttonDangerBackground dark:bg-dark-buttonDangerBackground",
    text: "bg-transparent",
  };

  const textColorMap = {
    primary: "text-light-buttonPrimaryText dark:text-dark-buttonPrimaryText",
    secondary:
      "text-light-buttonSecondaryText dark:text-dark-buttonSecondaryText",
    remove: "text-light-buttonDangerText dark:text-dark-buttonDangerText",
    text: "text-light-textPrimary dark:text-dark-textPrimary",
  };

  const sizeStylesMap = {
    "10": "py-2 px-4 text-sm",
    "20": "py-3 px-6 text-base",
  };

  const isText = style === "text";
  const bgColor = isText ? bgColorMap.text : bgColorMap[intent];
  const textColor = isText ? textColorMap.text : textColorMap[intent];
  const sizeStyle = sizeStylesMap[sizeRaw as keyof typeof sizeStylesMap];

  const activeStyles = isText ? "p-4 active:opacity-50" : "elevation-sm";

  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-lg ${bgColor} ${sizeStyle} ${activeStyles} ${fullWidth ? "w-full" : ""} ${className}`}
      onPress={onPress}
    >
      <Text className={`${textColor} font-medium ${titleClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
