import Animated from "react-native-reanimated";
import { Circle, Line, Path } from "react-native-svg";

export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedLine = Animated.createAnimatedComponent(Line);
export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
