import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type StyledButtonProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
  color?: 'primary' | 'secondary' | 'danger';
  children?: never;
  onPress?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  textClassName = '',
  color = 'primary',
  onPress,
}) => {
  const baseStyles = 'rounded-lg items-center justify-center';

  const backgroundColors = {
    primary: 'bg-light-buttonPrimaryBackground dark:bg-dark-buttonPrimaryBackground',
    secondary: 'bg-light-buttonSecondaryBackground dark:bg-dark-buttonSecondaryBackground',
    danger: 'bg-light-buttonDangerBackground dark:bg-dark-buttonDangerBackground',
    text: 'bg-transparent',
  };

  const textColors = {
    primary: 'text-light-buttonPrimaryText dark:text-dark-buttonPrimaryText',
    secondary: 'text-light-buttonSecondaryText dark:text-dark-buttonSecondaryText',
    danger: 'text-light-buttonDangerText dark:text-dark-buttonDangerText',
    text: 'text-light-textPrimary dark:text-dark-textPrimary',
  };

  const sizeStyles = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
  };

  const isTextVariant = variant === 'text';
  const bgColor = isTextVariant ? backgroundColors.text : backgroundColors[color];
  const textColor = isTextVariant && color !== 'danger' ? textColors.text : textColors[color];

  const activeBgByColor = {
    primary: `active:bg-light-buttonPrimaryBackground dark:active:bg-dark-buttonPrimaryBackground`,
    secondary: `active:bg-light-buttonSecondaryBackground dark:active:bg-dark-buttonSecondaryBackground`,
    danger: `active:bg-light-buttonDangerBackground dark:active:bg-dark-buttonDangerBackground`,
  };

  const variantStyles = {
    primary: `elevation-sm ${bgColor}`,
    secondary: `elevation-sm ${bgColor}`,
    text: `p-4 active:opacity-50 ${activeBgByColor[color]} ${bgColor}`,
  };

  const textVariantStyles = {
    primary: textColor,
    secondary: textColor,
    text: textColor,
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      onPress={onPress}
    >
      <Text className={`${textVariantStyles[variant]} ${textClassName}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
