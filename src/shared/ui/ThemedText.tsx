import { Text, TextProps } from "react-native";

type TextVariant = "h4" | "regular";

type ButtonColor = "primary" | "secondary" | "muted" | "danger";

type ThemedTextProps = TextProps & {
  variant?: TextVariant;
  className?: string;
  color?: ButtonColor;
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

  const colorClasses: Record<ButtonColor, string> = {
    primary: "dark:text-dark-textPrimary text-light-textPrimary",
    secondary: "dark:text-dark-textSecondary text-light-textSecondary",
    muted: "dark:text-dark-textMuted text-light-textMuted",
    danger: "dark:text-dark-buttonDangerText text-light-buttonDangerText",
  };

  const selectedColorClasses = colorClasses[color];

  return (
    <Text
      className={`${selectedColorClasses} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
