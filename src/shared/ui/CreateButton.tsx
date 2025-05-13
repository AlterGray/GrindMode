import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeStore } from "@shared/stores/themeStore";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";

// TODO
// export type Option = "folder" | "routine";

type CreateButtonProps = {
  options: { label: string; value: string }[];
  routes: Record<string, string>;
};

const CreateButton = ({ options, routes }: CreateButtonProps) => {
  const [option, setOption] = useState(options[0].value);
  const router = useRouter();
  const isDark = useThemeStore((state) => state.isDark);

  const setConfirmDialog = useConfirmDialogStore(
    (state) => state.setConfirmDialog,
  );
  const closeConfirmModal = useConfirmDialogStore(
    (state) => state.closeConfirmModal,
  );

  const onPress = () =>
    setConfirmDialog({
      isOpen: true,
      title: "Select what you want to create",
      message: (
        <ToggleOptions
          options={options}
          // TODO bug stale state
          onChange={(option) => setOption(option)}
        />
      ),
      primaryButtonText: "Create",
      primaryColor: "primary",
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
      <FontAwesome
        size={24}
        name="plus"
        color={isDark ? Colors.dark.icon : Colors.light.icon}
      />
    </Pressable>
  );
};

export default CreateButton;
