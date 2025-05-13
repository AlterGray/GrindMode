import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import PopoverMenu from "../ActionsModal/PopoverMenu";
import { TabItemProps } from "./types";
import useMenuPosition from "@shared/hooks/useMenuPosition";
import { useThemeStore } from "@shared/stores/themeStore";
import { FolderColorType } from "@features/folder/types";

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
  const {
    position: menuPosition,
    size: menuSize,
    handleMenuLayout,
  } = useMenuPosition(buttonRef);

  const openMenu = () => setIsMenuOpen(true);
  const isDark = useThemeStore((state) => state.isDark);
  const computedColor =
    Colors.folderColors[color as FolderColorType]?.[isDark ? "dark" : "light"];

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
