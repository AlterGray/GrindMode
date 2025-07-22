import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

import AnimatedThemedText from "@shared/ui/ThemedText";

import { quotes } from "./quotes";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const intervalID = useRef(0);

  useEffect(() => {
    intervalID.current = setInterval(() => {
      const newIndex = Math.floor(Math.random() * quotes.length);
      setActiveQuoteIndex(newIndex);
    }, 30000);

    return () => clearInterval(intervalID.current);
  }, []);

  const quote = quotes[activeQuoteIndex].quote;
  const author = quotes[activeQuoteIndex].author;

  return (
    <View className="justify-center items-center gap-2">
      <AnimatedThemedText className="text-3xl font-medium">
        Proof of Work
      </AnimatedThemedText>
      <AnimatedThemedText
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
