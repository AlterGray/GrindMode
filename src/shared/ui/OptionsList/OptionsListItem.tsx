import { Text, View } from "react-native";

type OptionsListItemProps = {
  title: string;
};

// TODO refactor it
// TODO make more reusable
const OptionsListItem: React.FC<OptionsListItemProps> = ({
  title,
}: OptionsListItemProps) => {
  return (
    <View className={`items-center justify-center rounded-sm px-2 py-4`}>
      <Text className="font-medium text-light-textSecondary dark:text-dark-textSecondary">
        {title}
      </Text>
    </View>
  );
};

export default OptionsListItem;
