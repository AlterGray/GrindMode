import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useLayoutEffect, useRef, useState } from "react";
import PopoverMenu from "../ActionsModal/PopoverMenu";
import { TabItemProps } from "./types";
import useMenuPosition from "@shared/hooks/useMenuPosition";

const TabItem: React.FC<TabItemProps> = ({
  title,
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

  const {
    position: menuPosition,
    size: menuSize,
    handleMenuLayout,
  } = useMenuPosition(buttonRef);

  const openMenu = () => setIsMenuOpen(true);

  return (
    <View>
      <Pressable
        ref={buttonRef}
        onPress={onPress}
        onLongPress={isReordering ? onLongPress : openMenu}
        className="gap-1 rounded-md px-4 py-4 active:bg-light-highlight active:opacity-80 active:dark:bg-dark-highlight"
      >
        <ThemedText>{title}</ThemedText>

        {isReordering && (
          <View className="absolute right-0">
            <Ionicons
              name="close-circle"
              size={22}
              color={Colors.light.icon}
              onPress={onClose}
              className="relative w-full"
            />
          </View>
        )}

        {isActive && (
          <View
            className={
              "m-auto h-1 w-1/2 rounded-sm bg-light-tabActive dark:bg-dark-tabActive"
            }
          />
        )}
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
