import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeStore } from "@shared/stores/themeStore";
import useConfirmModalStore from "@shared/ui/ConfirmModal/ConfirmModalStore";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { ConfirmModalVariant } from "./ConfirmModal/types";
import { RouteType } from "@shared/types/commonTypes";

type CreateButtonProps = {
  options: { label: string; value: string }[];
  routes: Record<string, RouteType>;
};

const CreateButton: React.FC<CreateButtonProps> = ({ options, routes }) => {
  const [option, setOption] = useState(options[0].value);
  const router = useRouter();
  const isDark = useThemeStore((state) => state.isDark);

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
      className={[
        "elevation-sm absolute bottom-10 right-10 h-14 w-14 items-center justify-center rounded-full p-4",
        "bg-light-secondaryBackground dark:bg-dark-buttonSecondaryBackground",
      ].join(" ")}
    >
      {/* TODO vs Ionic */}
      <FontAwesome
        size={24}
        name="plus"
        color={isDark ? Colors.dark.icon : Colors.light.icon}
      />
    </Pressable>
  );
};

export default CreateButton;
