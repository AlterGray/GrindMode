import React from "react";
import { Text, TouchableOpacity } from "react-native";

type StyledButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  titleClassName?: string;
  color?: "primary" | "secondary" | "danger";
  children?: never;
  onPress?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({
  title: text,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  titleClassName = "",
  color = "primary",
  onPress,
}) => {
  const baseStyles = "rounded-lg items-center justify-center";
  const commonBgColors = {
    primary:
      "bg-light-buttonPrimaryBackground dark:bg-dark-buttonPrimaryBackground",
    secondary:
      "bg-light-buttonSecondaryBackground dark:bg-dark-buttonSecondaryBackground",
    danger:
      "bg-light-buttonDangerBackground dark:bg-dark-buttonDangerBackground",
    text: "bg-transparent",
  };

  const commonTextColors = {
    primary: "text-light-buttonPrimaryText dark:text-dark-buttonPrimaryText",
    secondary:
      "text-light-buttonSecondaryText dark:text-dark-buttonSecondaryText",
    danger: "text-light-buttonDangerText dark:text-dark-buttonDangerText",
    text: "text-light-textPrimary dark:text-dark-textPrimary",
  };

  const sizeStyles = {
    sm: "py-2 px-4",
    md: "py-3 px-6",
    lg: "py-4 px-8",
  };

  const isTextVariant = variant === "text";
  const bgColor = isTextVariant ? commonBgColors.text : commonBgColors[color];
  const textColor = commonTextColors[color];

  const activeStyles = isTextVariant
    ? `p-4 active:opacity-50 ${bgColor}`
    : `elevation-sm ${bgColor}`;

  const textButtonVariantStyles =
    "text-light-textAccent font-medium border-b-[1px] border-radius-2 border-light-buttonPrimaryBorder";

  const textVariantStyles =
    variant === "text" ? `${textColor} ${textButtonVariantStyles}` : textColor;

  return (
    <TouchableOpacity
      className={`${baseStyles} ${activeStyles} ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      onPress={onPress}
    >
      <Text className={`${textVariantStyles} ${titleClassName}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
