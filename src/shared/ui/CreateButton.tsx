import { Ionicons } from "@expo/vector-icons";
import useConfirmModalStore from "@shared/ui/ConfirmModal/ConfirmModalStore";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { ConfirmModalVariant } from "./ConfirmModal/types";
import { RouteType } from "@shared/types/commonTypes";
import { useThemeColors } from "@shared/hooks/useThemeColors";

type CreateButtonProps = {
  options: { label: string; value: string }[];
  routes: Record<string, RouteType>;
};

const CreateButton: React.FC<CreateButtonProps> = ({ options, routes }) => {
  const [option, setOption] = useState(options[0].value);
  const router = useRouter();
  const iconColor = useThemeColors("icon");

  const openConfirmDialog = useConfirmModalStore(
    (state) => state.openConfirmModal,
  );
  const closeConfirmModal = useConfirmModalStore(
    (state) => state.closeConfirmModal,
  );

  const onPress = () =>
    openConfirmDialog({
      title: "Select what you want to create",
      message: (
        <ToggleOptions
          options={options}
          // TODO bug stale state
          onChange={(option) => setOption(option)}
        />
      ),
      variant: ConfirmModalVariant.Custom,
      onConfirm: () => {
        router.push(routes[option]);
        closeConfirmModal();
      },
      onCancel: () => closeConfirmModal(),
    });

  return (
    <Pressable
      onPress={onPress}
      className={"absolute bottom-10 right-10 rounded-full"}
    >
      {/* TODO add shadow */}
      <Ionicons size={56} name="add-circle-sharp" color={iconColor} />
    </Pressable>
  );
};

export default CreateButton;
