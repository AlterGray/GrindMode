import { Text } from 'react-native';

type TextVariant = 'h4' | 'regular';

type ThemedTextProps = {
  variant?: TextVariant,
  className?: string,
  children: React.ReactNode;
};

export const ThemedText: React.FC<ThemedTextProps> = ({ variant = 'regular', className, children }) => {
  const variantStyles: Record<TextVariant, string> = {
    regular: '',
    h4: 'text-2xl',
  };

  return (
    <Text className={`dark:text-dark-textPrimary text-light-textPrimary ${variantStyles[variant]} ${className}`}>
      {children}
    </Text>
  );
}
