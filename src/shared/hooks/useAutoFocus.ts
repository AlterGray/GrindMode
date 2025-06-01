import { useEffect } from "react";
import { TextInput } from "react-native";

// TODO consider to creating AutoFocusInput component to don't restrict ref type
export const useAutoFocus = (ref: React.RefObject<TextInput | null>, autoFocus: boolean) => {
  useEffect(() => {
    if (autoFocus && ref?.current) {
      const timeoutID = setTimeout(() => {
        ref.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutID);
    }
  }, [autoFocus]);
}