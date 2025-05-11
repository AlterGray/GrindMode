import { Modal, Pressable, View } from "react-native";
import ThemedView from "../ThemedView";
import StyledButton from "../StyledButton";
import { useRef } from "react";

// TODO move to separate file
export type PopoverMenu2Item = {
  label: string;
  onPress: () => void;
};

type PopoverMenu2Props = {
  ref: React.RefObject<View | null>;
  items: PopoverMenu2Item[];
  visible: boolean;
  handleClose: () => void;
};

const PopoverMenu2: React.FC<PopoverMenu2Props> = ({
  ref,
  visible,
  items,
  handleClose,
}) => {
  const selfRef = useRef<View>(null);
  const getMenuPosition = () => {
    let position = { x: 0, y: 0 };
    if (ref.current !== null && selfRef.current !== null) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        selfRef.current?.measure((x2, y2, width2, height2, pageX2, pageY2) => {
          position = { x: pageX + width2, y: pageY + height };
        });
      });
    }
    return position;
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable onPress={handleClose} className="absolute inset-0"></Pressable>
      <ThemedView
        style={{ top: getMenuPosition().y, left: getMenuPosition().x }}
        className={`w-1/2 gap-1 bg-light-backgroundSurface p-2 dark:bg-dark-backgroundSurface`}
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
    </Modal>
  );
};

export default PopoverMenu2;
