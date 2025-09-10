import React, { ReactNode } from "react";

import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";

type NoItemsInListProps = {
  text: string;
  actionButton?: ReactNode;
};

const NoItemsInList: React.FC<NoItemsInListProps> = ({
  text,
  actionButton: button,
}) => {
  return (
    <AnimatedThemedView className="items-center justify-center gap-2 flex-1">
      <AnimatedThemedText variant="h4">{text}</AnimatedThemedText>
      {button}
    </AnimatedThemedView>
  );
};

export default NoItemsInList;
