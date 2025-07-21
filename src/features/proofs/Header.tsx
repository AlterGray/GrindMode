import { View } from "react-native";

import AnimatedThemedText from "@shared/ui/ThemedText";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <View className="justify-center items-center">
      <AnimatedThemedText className="text-3xl font-medium">
        Proof of Work
      </AnimatedThemedText>
      <AnimatedThemedText className="text-lg font-medium" color="secondary">
        "Discipline equals freedom."
      </AnimatedThemedText>
    </View>
  );
};

export default Header;
