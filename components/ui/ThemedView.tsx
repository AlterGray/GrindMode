import { View } from 'react-native';

export type ThemedViewProps = {
  className?: string;
  children: React.ReactNode;
};

export const ThemedView: React.FC<ThemedViewProps> = ({ children, className }) => {
  return <View className={`dark:bg-dark-primaryBackground bg-light-primaryBackground ${className}`}>{children}</View>;
}
