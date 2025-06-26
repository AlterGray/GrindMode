import React from "react";
import { Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { ButtonVariant } from "@shared/types/commonTypes";
import { ColorName } from "@shared/types/themeTypes";

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
  { container: string; text: string; animatedColor: ColorName }
> = {
  "primary-contained-20": {
    container: " py-3 px-6 text-base rounded-lg elevation-sm",
    animatedColor: "buttonPrimaryBackground",
    text: "text-light-buttonPrimaryText dark:text-dark-buttonPrimaryText",
  },
  "remove-contained-20": {
    container: "py-3 px-6 text-base rounded-lg elevation-sm",
    animatedColor: "buttonDangerBackground",
    text: "text-light-buttonDangerText dark:text-dark-buttonDangerText",
  },
  "secondary-text-20": {
    container:
      "bg-transparent py-3 px-6 text-base rounded-lg active:opacity-50",
    animatedColor: "bgTransparent",
    text: "text-light-textPrimary dark:text-dark-textPrimary",
  },
  "secondary-sharped-20": {
    container:
      "p-4 border-b border-light-listItemBorder dark:border-light-listItemBorder rounded-sm active:opacity-60",
    animatedColor: "buttonSecondaryBackground",
    text: "text-light-buttonSecondaryText dark:text-dark-buttonSecondaryText",
  },
  "secondary-text-10": {
    container: "py-2 px-4 text-sm rounded-lg active:opacity-50",
    animatedColor: "bgTransparent",
    text: "text-light-textPrimary dark:text-dark-textPrimary",
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  variant = "primary-contained-20",
  fullWidth = false,
  className = "",
  titleClassName = "",
  onPress,
  children = null,
}) => {
  const animatedColor = useAnimatedColor(
    variantClassMap[variant].animatedColor,
  );
  const { container, text } = variantClassMap[variant];

  return (
    <AnimatedPressable
      className={`active:opacity-80 items-center justify-center ${container} ${fullWidth ? "w-full" : ""} ${className}`}
      onPress={onPress}
      style={animatedColor}
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
