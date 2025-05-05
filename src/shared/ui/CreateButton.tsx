import { Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import { Colors } from "@/constants/Colors";

type CreateButtonProps = {
  onPress: () => void;
};

const CreateButton: React.FC<CreateButtonProps> = ({ onPress }) => {
  const { isDark } = useThemeStore();

  return (
    <Pressable
      onPress={onPress}
      className={[
        "elevation-sm absolute bottom-10 right-10 h-14 w-14 items-center justify-center rounded-full p-4",
        "bg-light-secondaryBackground dark:bg-dark-buttonSecondaryBackground",
      ].join(" ")}
    >
      <FontAwesome
        size={24}
        name="plus"
        color={isDark ? Colors.dark.icon : Colors.light.icon}
      />
    </Pressable>
  );
};

export default CreateButton;
