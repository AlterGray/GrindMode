import { RefObject } from "react";
import { Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// TODO reuse it into usePopoverMenu
export const useComponentPosition = (
  buttonRef: RefObject<View | null>,
  baseHeight: number,
) => {
  const getPosition = (
    callback: (position: { x: number; y: number }) => void,
  ) => {
    if (!buttonRef.current) return;

    buttonRef.current.measureInWindow((x, y, btnWidth, btnHeight) => {
      const COMPONENT_WIDHT = 20; // TODO assume fixed width, or calculate dynamically
      const COMPONENT_HEIGHT = baseHeight; // estimate per item

      let calculatedX = x + btnWidth / 2 - COMPONENT_WIDHT / 2;
      let calculatedY = y + btnHeight;

      if (calculatedX + COMPONENT_WIDHT > SCREEN_WIDTH)
        calculatedX = SCREEN_WIDTH - COMPONENT_WIDHT - 8;
      if (calculatedX < COMPONENT_WIDHT * 4) calculatedX = COMPONENT_WIDHT * 5;

      if (calculatedY + COMPONENT_HEIGHT > SCREEN_HEIGHT)
        calculatedY = SCREEN_HEIGHT - COMPONENT_HEIGHT - 8;

      callback({ x: calculatedX, y: calculatedY });
    });
  };

  return getPosition;
};
