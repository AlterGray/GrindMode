import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps } from "react-native";

interface StyledInputProps extends TextInputProps {
  autoFocus?: boolean;
  className?: string;
  ref?: React.Ref<TextInput>;
}

const StyledInput: React.FC<StyledInputProps> = ({
  autoFocus,
  className = "",
  ref,
  ...props
}) => {
  const localRef = useRef<TextInput>(null);
  const refToUse = ref || localRef;

  const baseClasses = [
    "shadow-md rounded-md px-4 py-3 text-base",
    "bg-light-inputBackground text-light-inputText dark:bg-dark-inputBackground dark:text-dark-inputText",
  ].join(" ");

  const placeholderStyles =
    "placeholder:text-light-textSecondary placeholder:dark:text-dark-textSecondary";

  const focusInput = () => {
    if (typeof refToUse === "function") {
      localRef.current?.focus();
    } else {
      refToUse?.current?.focus();
    }
  };

  useEffect(() => {
    if (autoFocus) {
      const timeoutID = setTimeout(() => {
        focusInput();
      }, 100);
      return () => clearTimeout(timeoutID);
    }
  }, [autoFocus]);

  return (
    <TextInput
      ref={refToUse}
      className={`${baseClasses} ${placeholderStyles} ${className}`}
      {...props}
    />
  );
};

export default StyledInput;
