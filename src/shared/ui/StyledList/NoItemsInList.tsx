import React, { ReactNode } from "react";

import ThemedText from "@shared/ui/ThemedText";
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
      <ThemedText variant="h4">{text}</ThemedText>
      {button}
    </ThemedView>
  );
};

export default NoItemsInList;
