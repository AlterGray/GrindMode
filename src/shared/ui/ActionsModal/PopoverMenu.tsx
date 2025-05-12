import { LayoutChangeEvent, Modal, Pressable, View } from "react-native";
import ThemedView from "../ThemedView";
import StyledButton from "../StyledButton";

// TODO move to separate file
export type PopoverMenuItem = {
  label: string;
  onPress: () => void;
};

type PopoverMenuProps = {
  ref?: React.RefObject<View | null>;
  items: PopoverMenuItem[];
  visible: boolean;
  position: { x: number; y: number };
  handleClose: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  ref,
  visible,
  items,
  position,
  handleClose,
  onLayout,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable onPress={handleClose} className="absolute inset-0"></Pressable>
      <ThemedView
        ref={ref}
        onLayout={onLayout}
        style={{ top: position.y, left: position.x }}
        className={
          "w-1/2 gap-1 bg-light-backgroundSecondary p-2 dark:bg-dark-backgroundSecondary"
        }
      >
        {items.map((item) => (
          <StyledButton
            key={item.label}
            // TODO also close menu when action is pressed
            onPress={() => {
              item.onPress();
              handleClose();
            }}
            // TODO update color
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
