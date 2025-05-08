import { Text, View } from "react-native";

type ToggleOptionsItemProps = {
  title: string;
  isSelected: boolean;
};

// TODO refactor it
const ToggleOptionsItem: React.FC<ToggleOptionsItemProps> = ({
  title,
  isSelected,
}: ToggleOptionsItemProps) => {
  return (
    <View
      className={`items-center justify-center rounded-sm px-2 py-4 shadow-sm shadow-black dark:shadow-sm dark:shadow-white ${isSelected ? "bg-light-listItemBorder dark:bg-dark-listItemBackground" : "bg-light-listItemBackground dark:bg-dark-background"}`}
    >
      <Text className="font-medium text-light-textSecondary dark:text-dark-textSecondary">
        {title}
      </Text>
    </View>
  );
};

export default ToggleOptionsItem;
