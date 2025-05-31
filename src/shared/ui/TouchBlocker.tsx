import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

type TouchBlockerProps = {
  children: ReactNode;
};

const TouchBlocker: React.FC<TouchBlockerProps> = ({ children }) => {
  const isModalOpen = useActionModalStore((state) => state.isOpen);

  const handleTouch = (e: GestureResponderEvent) => {
    e.stopPropagation();
    return true;
  };

  if (!isModalOpen) return children;

  return (
    <View className="absolute inset-0 z-10 bg-slate-100 opacity-70 dark:bg-slate-950 dark:opacity-75">
      <TouchableWithoutFeedback onPress={handleTouch}>
        <View className="absolute inset-0" />
      </TouchableWithoutFeedback>
      {children}
    </View>
  );
};

export default TouchBlocker;
