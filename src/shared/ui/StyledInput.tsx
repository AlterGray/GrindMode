import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface StyledInputProps extends TextInputProps {
  className?: string;
}

const StyledInput = React.forwardRef<TextInput, StyledInputProps>(
  ({ className = "", ...props }, ref) => {
    const baseClasses = [
      "shadow-md rounded-md px-4 py-3 text-base",
      "bg-light-inputBackground text-light-inputText dark:bg-dark-inputBackground dark:text-dark-inputText",
    ].join(" ");
    const placeholderStyles =
      "placeholder:text-light-textSecondary placeholder:dark:text-dark-textSecondary";

    return (
      <TextInput
        ref={ref}
        className={`${baseClasses} ${placeholderStyles} ${className}`}
        {...props}
      />
    );
  },
);

export default StyledInput;
