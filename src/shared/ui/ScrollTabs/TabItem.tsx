import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { TabItemProps } from "./types";
import { usePopoverMenu } from "@shared/hooks/usePopoverMenu";
import { FolderColorType } from "@features/folder/types";
import ActiveIndicator from "../ActiveIndicator";
import { getFolderColor } from "@features/folder/utils";

// TODO replace this things with "item"
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
  const buttonRef = useRef<View>(null);

  // TODO remove menu size?
  const { openMenu } = usePopoverMenu(buttonRef);

  const computedColor = getFolderColor(color as FolderColorType);

  return (
    <View>
      <Pressable
        ref={buttonRef}
        onPress={onPress}
        onLongPress={isReordering ? onLongPress : () => openMenu(menuItems)}
        className="gap-1 rounded-md px-4 py-4 active:bg-light-highlight active:opacity-80 active:dark:bg-dark-highlight"
      >
        <ThemedText style={{ color: computedColor }}>{title}</ThemedText>
        // TODO does it make sense to rewrite with "status"?
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
    </View>
  );
};

export default TabItem;
