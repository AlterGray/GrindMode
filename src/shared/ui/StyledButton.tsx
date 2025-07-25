import React from "react";
import { Text } from "react-native";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { ButtonVariant } from "@shared/types/commonTypes";
import { ColorName } from "@shared/types/themeTypes";

import { AnimatedPressable } from "./AnimatedComponents/AnimatedReactComponents";

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
  { container: string; bgColor: ColorName; text: string }
> = {
  "primary-contained-20": {
    container: "py-3 px-6 text-base rounded-lg elevation-sm",
    bgColor: "buttonPrimaryBackground",
    text: "text-light-buttonPrimaryText dark:text-dark-buttonPrimaryText",
  },
  "remove-contained-20": {
    container: "py-3 px-6 text-base rounded-lg elevation-sm",
    bgColor: "buttonDangerBackground",
    text: "text-light-buttonDangerText dark:text-dark-buttonDangerText",
  },
  "secondary-sharped-20": {
    container:
      "p-4 border-b border-light-border dark:border-dark-border rounded-sm active:opacity-60",
    bgColor: "buttonSecondaryBackground",
    text: "text-light-buttonSecondaryText dark:text-dark-buttonSecondaryText",
  },
  "secondary-text-5": {
    container: "py-1 px-2 text-sm rounded-lg active:opacity-50",
    bgColor: "bgTransparent",
    text: "text-light-textPrimary dark:text-dark-textPrimary border-b-[1px] dark:border-slate-100",
  },
  "secondary-text-10": {
    container: "py-2 px-4 text-sm rounded-lg active:opacity-50",
    bgColor: "bgTransparent",
    text: "text-light-textPrimary dark:text-dark-textPrimary border-b-[1px] dark:border-slate-100",
  },
  "secondary-text-20": {
    container: "py-3 px-6 text-base rounded-lg active:opacity-50",
    bgColor: "bgTransparent",
    text: "text-light-textPrimary dark:text-dark-textPrimary border-b-[1px] dark:border-slate-100",
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
  const { container, bgColor, text } = variantClassMap[variant];
  const bgColorAnimated = useAnimatedColor(bgColor);

  return (
    <AnimatedPressable
      style={bgColor !== "bgTransparent" ? bgColorAnimated : undefined}
      className={`active:opacity-80 items-center justify-center ${container} ${fullWidth ? "w-full" : ""} ${className}`}
      onPress={onPress}
    >
      {children ? (
        children
      ) : (
        <Text className={`${text} font-medium ${titleClassName}`}>{title}</Text>
      )}
    </AnimatedPressable>
  );
};

export default StyledButton;
