import { View } from "react-native";

export type ThemedViewProps = {
  className?: string;
  children?: React.ReactNode;
};

const ThemedView: React.FC<ThemedViewProps> = ({ children, className }) => {
  return (
    <View
      className={`bg-light-background dark:bg-dark-background ${className}`}
    >
      {children ? children : null}
    </View>
  );
};

export default ThemedView;
