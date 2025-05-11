// TODO does it really make sense to use global alias for each import?
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ThemedView from "@ui/ThemedView";
import IconButton from "@ui/IconButton";
import ThemedText from "@ui/ThemedText";
import { useActionModalStore } from "./actionsModalStore";
import { useThemeStore } from "@shared/stores/themeStore";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import PopoverMenu from "./PopoverMenu";
import { ActionType } from "./actionModalTypes";
import { View } from "react-native";

const ActionModal = () => {
  const { isOpen, closeModal, text, actions, isMenuAction, menuActions } =
    useActionModalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);
  const menuButtonRef = useRef<View>(null);

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  // TODO extract to separate component
  const menuAction: ActionType = {
    onPress: () => setIsMenuOpen(true),
    iconName: "ellipsis-vertical",
  };
  const resultActions = [...actions];

  if (!isOpen) return null;

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // TODO does it okay?
  useLayoutEffect(() => {
    if (menuButtonRef.current) {
      menuButtonRef.current.measure((x, y) => {
        setMenuPosition({ x, y }); // Adjust y to position below the button
      });
    }
  }, []);

  // TODO rewrite with <Modal />
  // TODO use router stack?
  return (
    <ThemedView
      className={[
        "w-full flex-row items-center justify-between shadow-md shadow-black/40",
        "bg-light-backgroundSurface dark:bg-dark-backgroundSurface",
      ].join(" ")}
    >
      {/* Header section */}
      <ThemedView
        className={[
          "h-16 flex-row items-center justify-between gap-6",
          "bg-light-backgroundSurface px-4 dark:bg-dark-backgroundSurface",
        ].join(" ")}
      >
        {/* TODO add effect on touch */}
        <IconButton
          iconName="close-outline"
          onPress={closeModal}
          color={iconColor}
        />
        {text && (
          <ThemedText className="text-base font-medium">{text}</ThemedText>
        )}
      </ThemedView>

      {/* Actions */}
      {resultActions.length !== 0 && (
        <ThemedView className="flex-row gap-6 bg-light-backgroundSurface px-4 py-2 dark:bg-dark-backgroundSurface">
          {resultActions.map((action) => (
            <Ionicons
              key={action.iconName}
              name={action.iconName}
              onPress={action.onPress}
              color={iconColor}
              size={26}
            />
          ))}
          {isMenuAction && (
            <View ref={menuButtonRef}>
              <Ionicons
                key={menuAction.iconName}
                name={menuAction.iconName}
                onPress={menuAction.onPress}
                color={iconColor}
                size={26}
              />
            </View>
          )}
        </ThemedView>
      )}
      {/* TODO rename in other place(like onClose for handleClose)? */}
      {/* TODO hardcoded position */}
      <PopoverMenu
        visible={isMenuOpen}
        handleClose={() => setIsMenuOpen(false)}
        items={menuActions}
        position={{
          x: menuPosition.x + 110,
          y: menuPosition.y + 40,
        }}
      />
    </ThemedView>
  );
};

export default ActionModal;
