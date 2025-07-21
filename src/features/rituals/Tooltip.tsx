import { useRef, useState } from "react";
import React from "react";
import { Modal, Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useComponentPosition } from "@shared/hooks/useComponentPosition";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { IoniconsName } from "@shared/types/commonTypes";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import Backdrop from "@shared/ui/FloatingModal/components/Backdrop";
import AnimatedThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";

type TooltipProps = {
  text: string;
  iconColor?: string;
  iconName?: IoniconsName;
  // TODO remove hardcodes
  variant?: "info" | "warning" | "danger" | "success";
  containerClassName?: string;
};

// TODO when user press on tooltip - whole screen rerendes
// TODO make it shared ui
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  iconColor,
  iconName,
  variant = "info",
  containerClassName,
}) => {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const colors = useThemeColors();
  const [buttonPosition, setButtonPosition] = useState({
    x: 0,
    y: 0,
  });
  const getPosition = useComponentPosition(buttonRef, 0);

  // TODO infer type from props in all records?
  const tooltipVariants: Record<
    NonNullable<TooltipProps["variant"]>,
    {
      bgColor: string;
      iconColor: string;
      iconName: IoniconsName;
    }
  > = {
    info: {
      bgColor: "bg-light-primary dark:bg-dark-primarySoft",
      iconColor: colors.primary,
      iconName: "information-circle-sharp",
    },
    success: {
      bgColor: "bg-light-success dark:bg-dark-successSoft",
      iconColor: colors.success,
      iconName: "checkmark-circle-sharp",
    },
    warning: {
      bgColor: "bg-light-warning dark:bg-dark-warningSoft",
      iconColor: colors.warning,
      iconName: "warning-sharp",
    },
    danger: {
      bgColor: "bg-light-danger dark:bg-dark-dangerSoft",
      iconColor: colors.danger,
      iconName: "warning-sharp",
    },
  };

  const classes = tooltipVariants[variant];

  // TODO add just danger color?
  // const iconColor = useThemeColors("buttonDangerText");

  return (
    <>
      {/* TODO set for all buttons that property which increase touch area? */}
      {/* add buttons to all places where onPress and so on exist */}
      {/* use that lib which increase accesability */}
      <Pressable
        ref={buttonRef}
        onPress={() => {
          setVisible(!visible);
          getPosition(setButtonPosition);
        }}
        hitSlop={5}
        className={containerClassName}
      >
        <Ionicons
          name={iconName ?? classes.iconName}
          size={20}
          color={iconColor ?? classes.iconColor}
        />
      </Pressable>
      <Modal visible={visible} transparent animationType="fade">
        <Backdrop onCancel={() => setVisible(false)} />
        <View
          className="absolute items-center"
          style={{ top: buttonPosition.y, left: buttonPosition.x }}
        >
          {visible && (
            <ThemedView
              className={`absolute top-6 w-48 rounded-xl px-3 py-2 ${classes.bgColor}`}
            >
              <AnimatedThemedText className="text-sm" color={"white"}>
                {text}
              </AnimatedThemedText>
            </ThemedView>
          )}
        </View>
      </Modal>
    </>
  );
};
