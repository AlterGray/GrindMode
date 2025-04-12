import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedText } from './ThemedText';
import '@/global.css'

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: never;
  onPress?: () => void;
}

export function StyledButton({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onPress,
}: StyledButtonProps) {
  const baseStyles = 'rounded-lg items-center justify-center';
  const variantStyles = {
    primary: 'bg-light-secondaryBackground text-white',
    secondary: 'bg-secondary text-white',
    text: 'text-primary',
  };

  const sizeStyles = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} dark:bg-dark-secondaryBackground ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      onPress={onPress}
    >
      <ThemedText>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
} 