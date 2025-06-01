import { useAutoFocus } from "@shared/hooks/useAutoFocus";
import React, { useRef } from "react";
import { TextInput, TextInputProps } from "react-native";

interface StyledInputProps extends TextInputProps {
  autoFocus?: boolean;
  className?: string;
  ref?: React.RefObject<TextInput>;
}

const StyledInput: React.FC<StyledInputProps> = ({
  autoFocus = false,
  className = "",
  ref,
  ...props
}) => {
  const localRef = useRef<TextInput>(null);
  const refToUse = ref || localRef;

  useAutoFocus(refToUse, autoFocus);

  const baseClasses = [
    "shadow-md rounded-md px-4 py-3 text-base",
    "bg-light-inputBackground text-light-inputText dark:bg-dark-inputBackground dark:text-dark-inputText",
  ].join(" ");

  const placeholderStyles =
    "placeholder:text-light-textSecondary placeholder:dark:text-dark-textSecondary";

  return (
    <TextInput
      ref={refToUse}
      className={`${baseClasses} ${placeholderStyles} ${className}`}
      {...props}
    />
  );
};

export default StyledInput;
