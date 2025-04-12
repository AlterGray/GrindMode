import { Text } from 'react-native';

export type ThemedTextProps = {
    children: React.ReactNode;
};

export function ThemedText({
  children
}: ThemedTextProps) {

  return (
    <Text className='dark:text-dark-primaryText text-light-primaryText'>
      {children}
    </Text>
  );
}
