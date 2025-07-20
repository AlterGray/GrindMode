import { useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { AnimatedTouchableOpacity } from "@shared/ui/AnimatedComponents/AnimatedReactComponents";

import Back from "./Back";
import Front from "./Front";

type MetricCardProps = {
  header: string;
  description: string;
  value: number;
  fullWidth?: boolean;
};

const MetricCard: React.FC<MetricCardProps> = ({
  header,
  value,
  description,
  fullWidth = false,
}) => {
  const animatedBgColor = useAnimatedColor("backgroundSecondary");

  const rotation = useSharedValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    rotation.value = withTiming(isFlipped ? 0 : 180, { duration: 300 });
    setIsFlipped(!isFlipped);
  };

  return (
    // TODO show tooltip until user get out finger
    <AnimatedTouchableOpacity
      className={`rounded-md ${
        fullWidth
          ? "w-full justify-center items-center flex-row gap-4"
          : "w-[48%]"
      }`}
      activeOpacity={0.5}
      onPress={flip}
    >
      <Front
        header={header}
        value={value}
        animatedBgColor={animatedBgColor}
        rotation={rotation}
      />

      <Back
        description={description}
        animatedBgColor={animatedBgColor}
        rotation={rotation}
      />
    </AnimatedTouchableOpacity>
  );
};

export default MetricCard;
