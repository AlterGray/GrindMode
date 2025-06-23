import { TextProps } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { ColorName } from "@shared/types/themeTypes";

type TextVariant = "h4" | "regular";

type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "danger"
  | "white"
  | "inverted"
  | "accent";

type ThemedTextProps = TextProps & {
  variant?: TextVariant;
  className?: string;
  color?: TextColor;
  children: React.ReactNode;
};

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "regular",
  className = "",
  color = "primary",
  children,
  ...props
}) => {
  const variantStyles: Record<TextVariant, string> = {
    regular: "",
    h4: "text-2xl",
  };

  const colorClasses: Record<TextColor, ColorName> = {
    primary: "textPrimary",
    secondary: "textSecondary",
    muted: "textMuted",
    danger: "buttonDangerText",
    white: "textWhite",
    inverted: "textInverted",
    accent: "textAccent",
  };

  const animatedStyles = useAnimatedColor(colorClasses[color], true);

  return (
    <Animated.Text
      style={animatedStyles}
      className={`${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Animated.Text>
  );
};

export default ThemedText;
