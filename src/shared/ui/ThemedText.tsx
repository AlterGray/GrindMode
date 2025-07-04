import { Text, TextProps } from "react-native";

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

  const colorClasses: Record<TextColor, string> = {
    primary: "text-light-textPrimary dark:text-dark-textPrimary",
    secondary: "text-light-textSecondary dark:text-dark-textSecondary",
    muted: "text-light-textMuted dark:text-dark-textMuted",
    danger: "text-light-buttonDangerText dark:text-dark-buttonDangerText",
    white: "text-light-textWhite dark:text-dark-textWhite",
    inverted: "text-light-textInverted dark:text-dark-textInverted",
    accent: "text-light-textAccent dark:text-dark-textAccent",
  };

  return (
    <Text
      className={`${colorClasses[color]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
