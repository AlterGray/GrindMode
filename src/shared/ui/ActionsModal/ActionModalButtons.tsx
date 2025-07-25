import { useRef } from "react";
import { View } from "react-native";

import { usePopoverMenu } from "@shared/hooks/usePopoverMenu";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import IconButton from "@shared/ui/IconButton";

import { useActionModalStore } from "./actionsModalStore";

type ActionModalActionsProps = {
  // TODO align naming between differnt action types
  iconColor: string;
};

const ActionModalButtons: React.FC<ActionModalActionsProps> = ({
  iconColor,
}) => {
  const { actions, isMenuAction, menuActions } = useActionModalStore();
  const buttonRef = useRef(null);

  const { openMenu } = usePopoverMenu(buttonRef);

  // TODO better solution for classes?
  const actionsClasses =
    "flex-row gap-6 bg-light-backgroundSurface px-4 py-2 dark:bg-dark-backgroundSurface";

  return (
    <AnimatedThemedView className={actionsClasses}>
      {actions.map((action) => (
        <IconButton
          key={action.iconName}
          iconName={action.iconName}
          onPress={action.onPress}
          color={iconColor}
          size={26}
        />
      ))}

      {isMenuAction && (
        <View ref={buttonRef}>
          <IconButton
            iconName={"ellipsis-vertical"}
            onPress={() => openMenu(menuActions)}
            color={iconColor}
            size={26}
          />
        </View>
      )}
    </AnimatedThemedView>
  );
};

export default ActionModalButtons;
