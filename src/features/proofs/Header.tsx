import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import { quotes } from "./quotes";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(1);
  const intervalID = useRef(0);

  useEffect(() => {
    intervalID.current = setInterval(() => {
      const newIndex = Math.floor(Math.random() * quotes.length);
      transition.value = withSequence(
        withTiming(0, { duration: 1000 }, () => {
          runOnJS(setActiveQuoteIndex)(newIndex);
        }),
        withTiming(1, { duration: 1000 }),
      );
    }, 60_000);

    return () => clearInterval(intervalID.current);
  }, []);

  const transition = useSharedValue(activeQuoteIndex);
  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(transition.value, [0, 1], [0.1, 1]),
  }));

  const quote = quotes[activeQuoteIndex].quote;
  const author = quotes[activeQuoteIndex].author;

  return (
    <View className="justify-center items-center gap-2">
      <AnimatedThemedText className="text-3xl font-medium">
        Proof of Work
      </AnimatedThemedText>
      <AnimatedThemedText
        style={animatedOpacityStyle}
        className="text-lg italic text-center leading-relaxed mb-1"
        color="secondary"
      >
        "{quote}" -{" "}
        <AnimatedThemedText
          color="secondary"
          className="text-base text-center font-light"
        >
          {author}
        </AnimatedThemedText>
      </AnimatedThemedText>
    </View>
  );
};

export default Header;
