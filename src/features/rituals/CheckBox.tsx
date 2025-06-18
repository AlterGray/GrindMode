import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";

type CheckboxProps = {
  label: string;
  size?: "sm" | "md";
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  size = "md",
  checked = false,
  onChange,
}) => {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="flex-row items-center py-2 active:opacity-80"
    >
      <View
        className={`h-5 w-5 border-[1.5px] mr-3 items-center justify-center ${
          size === "sm" ? "h-4 w-4" : "h-5 w-5"
        } ${checked ? "bg-primary border-primary" : "border-gray-500"}`}
      >
        {checked && (
          <Feather name="check" size={size === "sm" ? 12 : 14} color="#000" />
        )}
      </View>
      <Text>{label}</Text>
    </Pressable>
  );
};
