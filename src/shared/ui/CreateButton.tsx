import React from "react";
import { useState } from "react";
import { Pressable } from "react-native";

import { useRouter } from "expo-router";

import { useKeyboardVisible } from "@shared/hooks/useKeyboardVisible";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { useThemedAnimatedProps } from "@shared/hooks/useThemedAnimatedProps";
import { FloatingModalVariant, RouteType } from "@shared/types/commonTypes";
import ToggleList from "@shared/ui/ToggleList/ToggleList";

import { AnimatedIonicons } from "./AnimatedComponents/AnimatedIonicons";
import FloatingModal from "./FloatingModal/FloatingModal";

type CreateButtonProps = {
  options: { label: string; value: string }[];
  routes: Record<string, RouteType>;
  disabled?: boolean;
};

const CreateButton: React.FC<CreateButtonProps> = ({
  options,
  routes,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isShow = useKeyboardVisible();

  const router = useRouter();

  const onPress = (option: string) => {
    router.push(routes[option]);
    setIsModalOpen(false);
  };

  const getToggleOptions = () => (
    <ToggleList options={options} onPress={onPress} />
  );

  // TODO move it to the file with animated component?
  const iconColorProps = useThemedAnimatedProps("icon");

  return (
    <>
      <FloatingModal
        isOpen={isModalOpen}
        title="What do you want to create?"
        renderContent={getToggleOptions}
        variant={FloatingModalVariant.Cancel}
        onCancel={() => setIsModalOpen(false)}
      />
      {isShow && (
        <Pressable
          onPress={() => setIsModalOpen(true)}
          disabled={disabled}
          className={`absolute bottom-10 right-10 rounded-full z-10 ${
            disabled ? "opacity-60" : ""
          }`}
        >
          {/* TODO add shadow */}
          <AnimatedIonicons
            size={56}
            name="add-circle-sharp"
            customColorProps={iconColorProps}
          />
        </Pressable>
      )}
    </>
  );
};

export default CreateButton;
