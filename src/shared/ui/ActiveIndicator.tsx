import { memo } from "react";
import { View } from "react-native";

// TODO memoizing the component can prevent unnecessary re-renders(still valid in react 19?)
const ActiveIndicator = memo(
  ({ isActive, color }: { isActive: boolean; color: string }) => {
    return isActive ? (
      <View
        className="m-auto h-1 w-1/2 rounded-sm"
        style={{ backgroundColor: color }}
      />
    ) : null;
  },
);

export default ActiveIndicator;
