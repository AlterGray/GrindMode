import { Modal, Pressable } from "react-native";
import ThemedView from "../ThemedView";
import ThemedText from "../ThemedText";
import { useEffect, useState } from "react";
import StyledButton from "../StyledButton";

// TODO move to separate file
export type PopoverMenuItem = {
  label: string;
  onPress: () => void;
};

type PopoverMenuProps = {
  items: PopoverMenuItem[];
  visible: boolean;
  position: { x: number; y: number };
  handleClose: () => void;
};

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  visible,
  items,
  position,
  handleClose,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable onPress={handleClose} className="absolute inset-0"></Pressable>
      <ThemedView className={`absolute inset-0 bg-transparent`}>
        <ThemedView
          style={{ top: position.y, left: position.x }}
          className={`w-1/2 gap-1 bg-light-backgroundSecondary p-2`}
        >
          {items.map((item) => (
            <StyledButton
              key={item.label}
              onPress={item.onPress}
              className="bg-slate-50"
              title={item.label}
              variant="text"
            />
          ))}
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default PopoverMenu;
