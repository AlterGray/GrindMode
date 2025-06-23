import { View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <View className="justify-center items-center">
      <ThemedText className="text-3xl font-medium">Proof of Work</ThemedText>
      <ThemedText className="text-lg font-medium" color="secondary">
        "Discipline equals freedom."
      </ThemedText>
    </View>
  );
};

export default Header;
