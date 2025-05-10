import { Modal, Pressable } from "react-native";
import ThemedView from "../ThemedView";
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
      <ThemedView
        style={{ top: position.y, left: position.x }}
        className={`w-1/2 gap-1 bg-light-backgroundSurface p-2 dark:bg-dark-backgroundSurface`}
      >
        {items.map((item) => (
          <StyledButton
            key={item.label}
            // TODO also close menu when action is pressed
            onPress={item.onPress}
            className="bg-slate-50"
            title={item.label}
            variant="text"
          />
        ))}
      </ThemedView>
    </Modal>
  );
};

export default PopoverMenu;
