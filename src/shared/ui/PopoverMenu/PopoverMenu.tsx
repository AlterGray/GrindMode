import { Modal, Pressable } from "react-native";

import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import StyledButton from "@shared/ui/StyledButton";

import { usePopoverMenuStore } from "./popoverMenuStore";
import { PopoverMenuItem } from "./types";

const PopoverMenu: React.FC = () => {
  const {
    items,
    position,
    visible,
    hideMenu: hide,
    handleLayoutChange,
  } = usePopoverMenuStore();

  const handlePress = (item: PopoverMenuItem) => {
    item.onPress();
    hide();
  };

  const actions = items.map((item) => (
    <StyledButton
      key={item.label}
      onPress={() => handlePress(item)}
      // TODO update color
      className="dark:bg-dark-listItemBackground"
      title={item.label}
      variant="secondary-text-20"
    />
  ));

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable onPress={hide} className="absolute inset-0" />
      <AnimatedThemedView
        onLayout={handleLayoutChange}
        style={{ top: position.y, left: position.x }}
        className={
          "w-1/2 p-1 bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary rounded-md"
        }
      >
        {actions}
      </AnimatedThemedView>
    </Modal>
  );
};

export default PopoverMenu;
