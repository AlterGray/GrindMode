import { useEffect } from "react";
import { TextInput } from "react-native";

// TODO consider to creating AutoFocusInput component to don't restrict ref type
// TODO autofocus worked no each time, probably for different devices we need different timeout
// TODO think about another way to handle auto focus, maybe native code
export const useAutoFocus = (
  ref: React.RefObject<TextInput | null>,
  autoFocus: boolean,
) => {
  useEffect(() => {
    if (autoFocus && ref?.current) {
      const timeoutID = setTimeout(() => {
        ref.current?.focus();
      }, 200);
      return () => clearTimeout(timeoutID);
    }
  }, [autoFocus]);
};
