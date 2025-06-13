import { View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

type MetricCardProps = {
  header: string;
  value: number;
};

const MetricCard: React.FC<MetricCardProps> = ({ header, value }) => {
  return (
    <View className="bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary p-4 rounded-lg flex-auto">
      <ThemedText className="text-light-textSecondary dark:text-dark-textSecondary">
        {header}
      </ThemedText>
      <ThemedText className="text-2xl font-medium">{value}</ThemedText>
    </View>
  );
};

export default MetricCard;
