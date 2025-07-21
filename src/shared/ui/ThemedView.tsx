import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<View | null>;
};

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  className = "",
  ref,
  ...props
}) => {
  return (
    <View ref={ref} className={className} {...props}>
      {children ? children : null}
    </View>
  );
};

export default ThemedView;
