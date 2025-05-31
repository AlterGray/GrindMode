import { RefObject } from "react";
import { Dimensions, View } from "react-native";

import { usePopoverMenuStore } from "@shared/ui/PopoverMenu/popoverMenuStore";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const usePopoverMenu = (buttonRef: RefObject<View | null>) => {
  const { setPopoverMenu, hideMenu } = usePopoverMenuStore.getState();

  const openMenu = (items: PopoverMenuItem[]) => {
    if (!buttonRef.current) return;

    buttonRef.current.measureInWindow((x, y, btnWidth, btnHeight) => {
      const MENU_WIDTH = 200; // TODO assume fixed width, or calculate dynamically
      const MENU_HEIGHT = items.length * 40; // estimate per item

      let calculatedX = x + btnWidth / 2 - MENU_WIDTH / 2;
      let calculatedY = y + btnHeight;

      if (calculatedX + MENU_WIDTH > SCREEN_WIDTH)
        calculatedX = SCREEN_WIDTH - MENU_WIDTH - 8;
      if (calculatedX < 8) calculatedX = 8;

      if (calculatedY + MENU_HEIGHT > SCREEN_HEIGHT)
        calculatedY = SCREEN_HEIGHT - MENU_HEIGHT - 8;

      setPopoverMenu({
        items,
        visible: true,
        position: { x: calculatedX, y: calculatedY },
        handleLayoutChange: undefined, // optional now
      });
    });
  };

  return { openMenu, hideMenu };
};
