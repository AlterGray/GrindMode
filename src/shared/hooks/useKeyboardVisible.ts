import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

// TODO set return type for each function?
export const useKeyboardVisible = () => {
  const [isShow, setIsShow] = useState(true);

  // TODO add animation?
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setIsShow(false),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setIsShow(true),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return isShow;
};
