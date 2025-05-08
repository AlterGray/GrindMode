import ThemedText from "@shared/ui/ThemedText";
import React from "react";
import { Pressable } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

type FolderListItemProps = {
  title: string;
  numberOfRoutines: number;
};

const FolderListItem: React.FC<FolderListItemProps> = ({
  title,
  numberOfRoutines,
}) => {
  return (
    <View>
      <View className="ml-16 h-0.5" />
      <Pressable>
        <ThemedText>{title}</ThemedText>
        <ThemedText>{numberOfRoutines}</ThemedText>
      </Pressable>
    </View>
  );
};

export default FolderListItem;
