import { Text, View } from "react-native";

type ToggleOptionsItemProps = {
  title: string;
};

// TODO refactor it
// TODO make more reusable
const ToggleOptionsItem: React.FC<ToggleOptionsItemProps> = ({
  title,
}: ToggleOptionsItemProps) => {
  return (
    <View className={`items-center justify-center rounded-sm px-2 py-4`}>
      <Text className="font-medium text-light-textSecondary dark:text-dark-textSecondary">
        {title}
      </Text>
    </View>
  );
};

export default ToggleOptionsItem;
