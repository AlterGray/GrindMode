import React from "react";
import { useState } from "react";
import { Pressable } from "react-native";

import { useRouter } from "expo-router";

import { useKeyboardVisible } from "@shared/hooks/useKeyboardVisible";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
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

  return (
    <>
      <FloatingModal
        isOpen={isModalOpen}
        title={i18n.t("whatDoYouWantToCreate")}
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
          <AnimatedIonicons size={56} name="add-circle-sharp" />
        </Pressable>
      )}
    </>
  );
};

export default CreateButton;
