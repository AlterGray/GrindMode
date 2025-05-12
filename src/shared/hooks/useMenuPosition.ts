import { RefObject, useState, useCallback } from "react";
import { Dimensions, LayoutChangeEvent, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const useMenuPosition = (buttonRef: RefObject<View | null>) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMenuLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setSize({ width, height });

      if (buttonRef.current) {
        buttonRef.current.measure(
          (_, __, buttonWidth, buttonHeight, pageX, pageY) => {
            let calculatedX = pageX + buttonWidth / 2 - width / 2;
            let calculatedY = pageY + buttonHeight;

            if (calculatedX + width > SCREEN_WIDTH) {
              calculatedX = SCREEN_WIDTH - width - 8;
            }

            if (calculatedX < 8) {
              calculatedX = 8;
            }

            if (calculatedY + height > SCREEN_HEIGHT) {
              calculatedY = SCREEN_HEIGHT - height - 8;
            }

            setPosition({ x: calculatedX, y: calculatedY });
          },
        );
      }
    },
    [buttonRef],
  );

  return { position, size, handleMenuLayout };
};

export default useMenuPosition;
