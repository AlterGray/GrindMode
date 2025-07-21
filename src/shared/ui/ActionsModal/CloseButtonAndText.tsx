import IconButton from "@shared/ui/IconButton";
import AnimatedThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";

import { useActionModalStore } from "./actionsModalStore";

type MenuActionButtonProps = {
  iconColor: string;
};

const CloseButtonAndText: React.FC<MenuActionButtonProps> = ({ iconColor }) => {
  const { closeActionModal, text } = useActionModalStore();

  const containerClasses = [
    "h-16 flex-row items-center justify-between gap-6",
    "bg-light-backgroundSurface px-4 dark:bg-dark-backgroundSurface",
  ].join(" ");

  /* TODO add effect on touch */
  const closeButton = (
    <IconButton
      iconName="close-outline"
      onPress={closeActionModal}
      color={iconColor}
    />
  );

  const actionModalText = (
    <AnimatedThemedText className="text-base font-medium">
      {text}
    </AnimatedThemedText>
  );

  return (
    <ThemedView className={containerClasses}>
      {closeButton}
      {text && actionModalText}
    </ThemedView>
  );
};

export default CloseButtonAndText;
