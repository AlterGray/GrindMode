import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

import { useAnimatedColor } from "./useAnimatedColor";

export const useTabColor = () => {
  const isModalOpen = useActionModalStore((s) => s.isOpen);

  const activeColor = useAnimatedColor("tabActive", true);
  const inactiveColor = useAnimatedColor("tabInactive", true);
  const disabledColor = useAnimatedColor("tabDisabled", true);

  const pointerEvents: "box-none" | "box-none" = isModalOpen
    ? "box-none"
    : "box-none";

  const resolveTextColor = (focused: boolean) => {
    if (isModalOpen) return disabledColor;
    if (focused) return activeColor;
    return inactiveColor;
  };

  return {
    resolveTextColor,
    pointerEvents: { pointerEvents },
  };
};
