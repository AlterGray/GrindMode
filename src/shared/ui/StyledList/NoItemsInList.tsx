import React, { ReactNode } from "react";

import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import AnimatedThemedText from "@shared/ui/ThemedText";

type NoItemsInListProps = {
  text: string;
  actionButton?: ReactNode;
};

const NoItemsInList: React.FC<NoItemsInListProps> = ({
  text,
  actionButton: button,
}) => {
  return (
    <AnimatedThemedView className="items-center justify-center gap-2">
      <AnimatedThemedText variant="h4">{text}</AnimatedThemedText>
      {button}
    </AnimatedThemedView>
  );
};

export default NoItemsInList;
