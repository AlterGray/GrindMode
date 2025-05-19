import { Text, TextProps } from "react-native";

type TextVariant = "h4" | "regular";

type ThemedTextProps = TextProps & {
  variant?: TextVariant;
  className?: string;
  color?: "primary" | "secondary" | "muted";
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

  const colorClasses: Record<"primary" | "secondary" | "muted", string> = {
    primary: "dark:text-dark-textPrimary text-light-textPrimary",
    secondary: "dark:text-dark-textSecondary text-light-textSecondary",
    muted: "dark:text-dark-textMuted text-light-textMuted",
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
