import React, { ReactNode } from "react";
import {
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import { useActionModalStore } from "@/stores/actionsModalStore";

type TouchBlockerProps = {
  children: ReactNode;
};

const TouchBlocker: React.FC<TouchBlockerProps> = ({ children }) => {
  const isActionModalOpened = useActionModalStore((state) => state.isOpen);

  // Prevent touch events for the entire screen, except for the components you want
  const blockTouchEvents = (e: GestureResponderEvent) => {
    e.stopPropagation(); // Prevent touch propagation
    return true;
  };

  // Only show the blocker when the action modal is open
  if (!isActionModalOpened) return children;

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 top-0 z-10 bg-slate-100 opacity-70 dark:bg-slate-950 dark:opacity-75`}
    >
      <TouchableWithoutFeedback onPress={blockTouchEvents}>
        <View className={`absolute bottom-0 left-0 right-0 top-0`} />
      </TouchableWithoutFeedback>
      {children}
    </View>
  );
};

export default TouchBlocker;
