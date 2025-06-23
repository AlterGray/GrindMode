import { TouchableOpacity } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

type MetricCardProps = {
  header: string;
  description?: string;
  value: number;
  fullWidth?: boolean;
};

const MetricCard: React.FC<MetricCardProps> = ({
  header,
  value,
  fullWidth = false,
}) => {
  return (
    // TODO show tooltip until user get out finger
    <TouchableOpacity
      className={`bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary p-3 rounded-md ${
        fullWidth
          ? "w-full justify-center items-center flex-row gap-4"
          : "w-[48%]"
      }`}
      activeOpacity={0.5}
    >
      <ThemedText color="secondary">{header}</ThemedText>
      <ThemedText className="text-2xl font-medium">{value}</ThemedText>
    </TouchableOpacity>
  );
};

export default MetricCard;
