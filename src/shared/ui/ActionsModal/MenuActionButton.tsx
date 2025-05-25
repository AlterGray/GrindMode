import { useActionModalStore } from "./actionsModalStore";
import { useRef } from "react";
import { View } from "react-native";
import { usePopoverMenu } from "@shared/hooks/usePopoverMenu";
import { ActionType } from "./actionModalTypes";
import IconButton from "../IconButton";

type MenuActionButtonProps = {
  iconColor: string;
};

const MenuActionButton: React.FC<MenuActionButtonProps> = ({ iconColor }) => {
  const menuActions = useActionModalStore((state) => state.menuActions);
  const buttonRef = useRef<View>(null);
  const { openMenu } = usePopoverMenu(buttonRef);

  const menuAction: ActionType = {
    onPress: () => openMenu(menuActions),
    iconName: "ellipsis-vertical",
  };

  return (
    <View ref={buttonRef}>
      <IconButton
        iconName={menuAction.iconName}
        onPress={menuAction.onPress}
        color={iconColor}
        size={26}
      />
    </View>
  );
};

export default MenuActionButton;
