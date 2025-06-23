import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

import { useAnimatedColor } from "./useAnimatedColor";
import { useThemedAnimatedProps } from "./useThemedAnimatedProps";

export const useTabColor = () => {
  const isModalOpen = useActionModalStore((s) => s.isOpen);

  const activeColor = useAnimatedColor("tabActive", true);
  const inactiveColor = useAnimatedColor("tabInactive", true);
  const disabledColor = useAnimatedColor("tabDisabled", true);

  const activeColorProp = useThemedAnimatedProps("tabActive");
  const inactiveColorProp = useThemedAnimatedProps("tabInactive");
  const disabledColorProp = useThemedAnimatedProps("tabDisabled");

  const pointerEvents: "box-none" | "box-none" = isModalOpen
    ? "box-none"
    : "box-none";

  const resolveTextColor = (focused: boolean) => {
    if (isModalOpen) return disabledColor;
    if (focused) return activeColor;
    return inactiveColor;
  };

  const resolveFillColor = (focused: boolean) => {
    if (isModalOpen) return disabledColorProp;
    if (focused) return activeColorProp;
    return inactiveColorProp;
  };

  return {
    resolveTextColor,
    resolveFillColor,
    pointerEvents: { pointerEvents },
  };
};
