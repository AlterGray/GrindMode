import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { AnimatedTouchableOpacity } from "@shared/ui/AnimatedComponents/AnimatedReactComponents";
import AnimatedThemedText from "@shared/ui/ThemedText";

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
  const animatedBgColor = useAnimatedColor("backgroundSecondary");

  return (
    // TODO show tooltip until user get out finger
    <AnimatedTouchableOpacity
      style={animatedBgColor}
      className={`bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary p-3 rounded-md ${
        fullWidth
          ? "w-full justify-center items-center flex-row gap-4"
          : "w-[48%]"
      }`}
      activeOpacity={0.5}
    >
      <AnimatedThemedText color="secondary">{header}</AnimatedThemedText>
      <AnimatedThemedText className="text-2xl font-medium">
        {value}
      </AnimatedThemedText>
    </AnimatedTouchableOpacity>
  );
};

export default MetricCard;
