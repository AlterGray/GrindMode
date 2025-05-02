import { Text } from 'react-native';

type TextVariant = 'h4' | 'regular';

type ThemedTextProps = {
  variant?: TextVariant,
  className?: string,
  color?: 'primary' | 'secondary'
  children: React.ReactNode;
};

export const ThemedText: React.FC<ThemedTextProps> = ({ variant = 'regular', className, color = 'primary', children }) => {
  const variantStyles: Record<TextVariant, string> = {
    regular: '',
    h4: 'text-2xl',
  };
  const primaryColors = 'dark:text-dark-textPrimary text-light-textPrimary';
  const secondaryColors = 'dark:text-dark-textSecondary text-light-textSecondary';
  const colors = color === 'primary' ? primaryColors : secondaryColors;

  return (
    <Text className={`${colors} ${variantStyles[variant]} ${className}`}>
      {children}
    </Text>
  );
}
