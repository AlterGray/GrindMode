import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import PopoverMenu from "../ActionsModal/PopoverMenu";
import { TabItemProps } from "./types";
import useMenuPosition from "@shared/hooks/useMenuPosition";
import { FolderColorType } from "@features/folder/types";
import ActiveIndicator from "../ActiveIndicator";
import { getFolderColor } from "@features/folder/utils";

const TabItem: React.FC<TabItemProps> = ({
  title,
  color,
  isActive,
  onPress,
  onClose,
  isReordering,
  menuItems,
  onLongPress,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<View>(null);
  const menuRef = useRef<View>(null);

  // TODO remove menu size?
  const { position: menuPosition, handleMenuLayout } =
    useMenuPosition(buttonRef);

  const openMenu = () => setIsMenuOpen(true);
  const computedColor = getFolderColor(color as FolderColorType);

  return (
    <View>
      <Pressable
        ref={buttonRef}
        onPress={onPress}
        onLongPress={isReordering ? onLongPress : openMenu}
        className="gap-1 rounded-md px-4 py-4 active:bg-light-highlight active:opacity-80 active:dark:bg-dark-highlight"
      >
        <ThemedText style={{ color: computedColor }}>{title}</ThemedText>

        {isReordering && (
          <View className="absolute right-0">
            <Ionicons
              name="close-circle"
              size={22}
              color={computedColor}
              onPress={onClose}
              className="relative w-full"
            />
          </View>
        )}

        {/* // TODO ADD ANIMATION */}
        <ActiveIndicator isActive={isActive} color={computedColor} />
      </Pressable>

      <PopoverMenu
        ref={menuRef}
        items={menuItems}
        visible={isMenuOpen}
        handleClose={() => setIsMenuOpen(false)}
        position={menuPosition}
        onLayout={handleMenuLayout}
      />
    </View>
  );
};

export default TabItem;
