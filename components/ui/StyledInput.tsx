import { TextInput, TextInputProps } from "react-native";
import React from "react";

interface StyledInputProps extends TextInputProps {
  className?: string;
}

const StyledInput = React.forwardRef<TextInput, StyledInputProps>(
  ({ className, ...props }, ref) => {
    const placeHolderStyles =
      "placeholder:text-light-textSecondary placeholder:dark:text-dark-textSecondary";
    const baseClasses =
      "rounded-md px-4 py-3 text-base bg-light-inputBackground text-light-inputText dark:bg-dark-inputBackground dark:text-dark-inputText";
    return (
      <TextInput
        ref={ref}
        className={`${baseClasses} ${placeHolderStyles} ${className}`}
        {...props}
      />
    );
  },
);

export default StyledInput;
