import React, { ReactNode } from "react";
import { View } from "react-native";

import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";

type NoItemsInListProps = {
  text: string;
  actionButtons: ReactNode[];
};

const NoItemsInList: React.FC<NoItemsInListProps> = ({
  text,
  actionButtons,
}) => {
  return (
    <AnimatedThemedView className="items-center justify-center gap-2 flex-1">
      <AnimatedThemedText variant="h4">{text}</AnimatedThemedText>
      <View className="flex-row gap-2">{actionButtons}</View>
    </AnimatedThemedView>
  );
};

export default NoItemsInList;
