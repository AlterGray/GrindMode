import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";

type TabItemProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const TabItem: React.FC<TabItemProps> = ({ title, isActive, onPress }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        className={
          "gap-1 rounded-md px-2 py-2 active:bg-light-highlight active:opacity-80 active:dark:bg-dark-highlight"
        }
      >
        <ThemedText key={title}>{title}</ThemedText>
        <View
          className={`m-auto h-1 w-1/2 rounded-md ${isActive && "bg-light-tabActive dark:bg-dark-tabActive"}`}
        />
      </Pressable>
    </View>
  );
};

export default TabItem;
