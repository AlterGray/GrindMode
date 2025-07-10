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

type AnimatedThemedTextProps = TextProps & {
  variant?: TextVariant;
  className?: string;
  color?: TextColor;
  children: React.ReactNode;
};

const AnimatedThemedText: React.FC<AnimatedThemedTextProps> = ({
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

  // TODO remove this wrapper, it's redundant
  const colorClasses: Record<TextColor, ColorName> = {
    primary: "textPrimary",
    secondary: "textSecondary",
    muted: "textMuted",
    danger: "buttonDangerText",
    white: "textWhite",
    inverted: "textInverted",
    accent: "textAccent",
  };

  const animatedBgColor = useAnimatedColor(colorClasses[color], true);

  return (
    <Animated.Text
      className={`${colorClasses[color]} ${variantStyles[variant]} ${className}`}
      {...props}
      style={[props.style, animatedBgColor]}
    >
      {children}
    </Animated.Text>
  );
};

export default AnimatedThemedText;
