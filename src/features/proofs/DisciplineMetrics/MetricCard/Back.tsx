import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

type BackProps = {
  description: string;
  animatedBgColor: any;
  rotation: any;
};

const Back: React.FC<BackProps> = ({
  description,
  animatedBgColor,
  rotation,
}) => {
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
    ],
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
  }));

  return (
    <Animated.View
      style={[backStyle, animatedBgColor]}
      className={"inset-0 items-center p-2"}
    >
      <AnimatedThemedText
        numberOfLines={3}
        color="secondary"
        className="text-ellipsis overflow-hidden"
      >
        {description}
      </AnimatedThemedText>
    </Animated.View>
  );
};

export default Back;
