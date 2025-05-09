import { Pressable, View, Dimensions } from "react-native";
import ThemedText from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import ConfirmDialog from "../ConfirmDialog";
import PopoverMenu, { PopoverMenuItem } from "../ActionsModal/PopoverMenu";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type TabItemProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
  onClose: () => void;
  menuItems: PopoverMenuItem[];
};

const TabItem: React.FC<TabItemProps> = ({
  title,
  isActive,
  onPress,
  onClose,
  menuItems,
}) => {
  // TODO get actual values
  const MENU_WIDTH = 210;
  const MENU_HEIGHT = 200;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const buttonRef = useRef<View>(null);

  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const getMenuPosition = async () => {
    return new Promise<{ x: number; y: number }>((resolve) => {
      if (!buttonRef.current) {
        resolve({ x: 0, y: 0 });
        return;
      }

      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        let posX = pageX + x - width;
        let posY = pageY + height;

        // Adjust X position to prevent overflow
        if (posX + MENU_WIDTH > SCREEN_WIDTH) {
          posX = SCREEN_WIDTH - MENU_WIDTH; // 8px margin
        }
        if (posX < 0) {
          posX = 8; // Prevent left overflow
        }

        // Adjust Y position to prevent overflow
        if (posY + MENU_HEIGHT > SCREEN_HEIGHT) {
          posY = SCREEN_HEIGHT - MENU_HEIGHT - 8; // 8px margin
        }

        resolve({ x: posX, y: posY });
      });
    });
  };

  const updateMenuPosition = async () => {
    const position = await getMenuPosition();
    setMenuPosition(position);
  };

  const openMenu = async () => {
    await updateMenuPosition();
    setIsMenuOpen(true);
  };

  return (
    <View>
      <Pressable
        ref={buttonRef}
        onPress={onPress}
        onLongPress={openMenu}
        className="gap-1 rounded-md px-4 py-4 active:bg-light-highlight active:opacity-80 active:dark:bg-dark-highlight"
      >
        <ThemedText>{title}</ThemedText>

        <View
          className={`m-auto h-1 w-1/2 rounded-md ${
            isActive && "bg-light-tabActive dark:bg-dark-tabActive"
          }`}
        />
      </Pressable>

      {menuItems.length > 0 && (
        <PopoverMenu
          items={menuItems}
          visible={isMenuOpen}
          handleClose={() => setIsMenuOpen(false)}
          position={menuPosition}
        />
      )}

      <ConfirmDialog
        isVisible={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={onClose}
      />
    </View>
  );
};

export default TabItem;
