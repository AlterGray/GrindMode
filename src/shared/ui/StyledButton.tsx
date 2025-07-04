import React from "react";
import { Pressable, Text } from "react-native";

import { ButtonVariant } from "@shared/types/commonTypes";

type StyledButtonProps = {
  title: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
  onPress?: () => void;
};

const variantClassMap: Record<
  ButtonVariant,
  { container: string; text: string }
> = {
  "primary-contained-20": {
    container:
      "bg-light-buttonPrimaryBackground dark:bg-dark-buttonPrimaryBackground py-3 px-6 text-base rounded-lg elevation-sm",
    text: "text-light-buttonPrimaryText dark:text-dark-buttonPrimaryText",
  },
  "remove-contained-20": {
    container:
      "bg-light-buttonDangerBackground dark:bg-dark-buttonDangerBackground py-3 px-6 text-base rounded-lg elevation-sm",
    text: "text-light-buttonDangerText dark:text-dark-buttonDangerText",
  },
  "secondary-text-20": {
    container:
      "bg-transparent py-3 px-6 text-base rounded-lg active:opacity-50",
    text: "text-light-textPrimary dark:text-dark-textPrimary",
  },
  "secondary-sharped-20": {
    container:
      "bg-light-buttonSecondaryBackground dark:bg-dark-buttonSecondaryBackground p-4 border-b border-light-listItemBorder dark:border-light-listItemBorder rounded-sm active:opacity-60",
    text: "text-light-buttonSecondaryText dark:text-dark-buttonSecondaryText",
  },
  "secondary-text-10": {
    container: "bg-transparent py-2 px-4 text-sm rounded-lg active:opacity-50",
    text: "text-light-textPrimary dark:text-dark-textPrimary",
  },
};

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  variant = "primary-contained-20",
  fullWidth = false,
  className = "",
  titleClassName = "",
  onPress,
  children = null,
}) => {
  const { container, text } = variantClassMap[variant];

  return (
    <Pressable
      className={`active:opacity-80 items-center justify-center ${container} ${fullWidth ? "w-full" : ""} ${className}`}
      onPress={onPress}
    >
      {children ? (
        children
      ) : (
        <Text className={`${text} font-medium ${titleClassName}`}>{title}</Text>
      )}
    </Pressable>
  );
};

export default StyledButton;
