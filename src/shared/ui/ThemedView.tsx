import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  className?: string;
  children?: React.ReactNode;
};

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <View
      className={`bg-light-background dark:bg-dark-background ${className}`}
      {...props}
    >
      {children ? children : null}
    </View>
  );
};

export default ThemedView;
