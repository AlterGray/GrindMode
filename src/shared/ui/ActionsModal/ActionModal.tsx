// TODO does it really make sense to use global alias for each import?
import React, { useRef } from "react";
import ThemedView from "@ui/ThemedView";
import IconButton from "@ui/IconButton";
import ThemedText from "@ui/ThemedText";
import { useActionModalStore } from "./actionsModalStore";
import { useThemeStore } from "@shared/stores/themeStore";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ActionType } from "./actionModalTypes";
import { View } from "react-native";
import { usePopoverMenu } from "@shared/hooks/usePopoverMenu";

const ActionModal = () => {
  const { isOpen, closeModal, text, actions, isMenuAction, menuActions } =
    useActionModalStore();
  const isDark = useThemeStore((state) => state.isDark);
  const buttonRef = useRef<View>(null);

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const { openMenu } = usePopoverMenu(buttonRef);

  // TODO extract to separate component
  const menuAction: ActionType = {
    onPress: () => openMenu(menuActions),
    iconName: "ellipsis-vertical",
  };
  const resultActions = [...actions];

  if (!isOpen) return null;

  // TODO rewrite with <Modal />
  // TODO use router stack?
  return (
    <ThemedView
      className={[
        "absolute w-full flex-row items-center justify-between py-1",
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
      // TODO
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
            <View ref={buttonRef}>
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
    </ThemedView>
  );
};

export default ActionModal;
