import { TextInput, TextInputProps } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { Colors } from '@/constants/Colors'

interface StyledInputProps extends TextInputProps {
  className?: string;
}

const StyledInput = React.forwardRef<TextInput, StyledInputProps>(
  ({ className, ...props }, ref) => {
    const isDark = useThemeStore((state) => state.isDark);

    return (
      <TextInput
        ref={ref}
        className={`rounded-md px-4 py-3 text-base bg-light-inputBackground text-light-inputText dark:bg-dark-inputBackground dark:text-dark-inputText ${className}`}
        placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
        {...props}
      />
    )
  }
)

export default StyledInput