import React from "react";

import { Ionicons } from "@expo/vector-icons";
import ToggleList from "@shared/ui/ToggleList/ToggleList";
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
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const iconColor = useThemeColors("icon");

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Reset selection each time modal is opened
    setSelectedOption(options[0].value);
  };

  const onConfirm = () => {
    router.push(routes[selectedOption]);
    setIsModalOpen(false);
  };

  const getToggleOptions = () => (
    <ToggleList
      options={options}
      selectedOption={selectedOption}
      onChange={(option) => setSelectedOption(option)}
    />
  );

  return (
    <>
      <Pressable
        onPress={handleOpenModal}
        className={"absolute bottom-10 right-10 rounded-full"}
      >
        {/* TODO add shadow */}
        <Ionicons size={56} name="add-circle-sharp" color={iconColor} />
      </Pressable>
      <FloatingModal
        isOpen={isModalOpen}
        title="What do you want to create?"
        renderContent={getToggleOptions}
        onConfirm={onConfirm}
        onCancel={() => setIsModalOpen(false)}
        variant={FloatingModalVariant.Confirm}
      />
    </>
  );
};

export default CreateButton;
