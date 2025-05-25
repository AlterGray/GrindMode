import { ActionType } from "./actionModalTypes";
import ThemedView from "../ThemedView";
import { useActionModalStore } from "./actionsModalStore";
import MenuActionButton from "./MenuActionButton";
import IconButton from "../IconButton";

type ActionModalActionsProps = {
  // TODO align naming between differnt action types
  staticActions: ActionType[];
  iconColor: string;
};

const ActionModalActions: React.FC<ActionModalActionsProps> = ({
  staticActions,
  iconColor,
}) => {
  const isMenuAction = useActionModalStore((state) => state.isMenuAction);

  return (
    <ThemedView className="flex-row gap-6 bg-light-backgroundSurface px-4 py-2 dark:bg-dark-backgroundSurface">
      {staticActions.map((action) => (
        <IconButton
          iconName={action.iconName}
          onPress={action.onPress}
          color={iconColor}
          size={26}
        />
      ))}

      {isMenuAction && <MenuActionButton iconColor={iconColor} />}
    </ThemedView>
  );
};

export default ActionModalActions;
