import React from "react";

import { Ionicons } from "@expo/vector-icons";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { FloatingModalVariant, RouteType } from "@shared/types/commonTypes";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import FloatingModal from "./FloatingModal/FloatingModal";

type CreateButtonProps = {
  options: { label: string; value: string }[];
  routes: Record<string, RouteType>;
};

const CreateButton: React.FC<CreateButtonProps> = ({ options, routes }) => {
  const [option, setOption] = useState(options[0].value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const iconColor = useThemeColors("icon");

  const getToggleOptions = () => (
    <ToggleOptions options={options} onChange={(option) => setOption(option)} />
  );

  return (
    <>
      <Pressable
        onPress={() => setIsModalOpen(true)}
        className={"absolute bottom-10 right-10 rounded-full"}
      >
        {/* TODO add shadow */}
        <Ionicons size={56} name="add-circle-sharp" color={iconColor} />
      </Pressable>
      <FloatingModal
        isOpen={isModalOpen}
        title="What do you want to create?"
        // TODO renderFunction VS React.ReactNode
        renderContent={getToggleOptions}
        onConfirm={() => {
          router.push(routes[option]);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        variant={FloatingModalVariant.Confirm}
      />
    </>
  );
};

export default CreateButton;
