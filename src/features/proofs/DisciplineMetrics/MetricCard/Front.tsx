import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

type FrontProps = {
  header: string;
  value: number;
  animatedBgColor: any;
  rotation: any;
};

const Front: React.FC<FrontProps> = ({
  header,
  value,
  animatedBgColor,
  rotation,
}) => {
  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  return (
    <Animated.View style={[frontStyle, animatedBgColor]} className="p-3">
      <AnimatedThemedText color="secondary">{header}</AnimatedThemedText>
      <AnimatedThemedText className="text-xl font-medium">
        {value}
      </AnimatedThemedText>
    </Animated.View>
  );
};

export default Front;
