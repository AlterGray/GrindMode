import React from "react";
import { Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { IoniconsName } from "@shared/types/commonTypes";

type IconButtonProps = {
  iconName: IoniconsName;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  size = 32,
  color,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
