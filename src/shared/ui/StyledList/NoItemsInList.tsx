import React, { ReactNode } from "react";

import AnimatedThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";

type NoItemsInListProps = {
  text: string;
  actionButton?: ReactNode;
};

const NoItemsInList: React.FC<NoItemsInListProps> = ({
  text,
  actionButton: button,
}) => {
  return (
    <ThemedView className="items-center justify-center gap-2">
      <AnimatedThemedText variant="h4">{text}</AnimatedThemedText>
      {button}
    </ThemedView>
  );
};

export default NoItemsInList;
