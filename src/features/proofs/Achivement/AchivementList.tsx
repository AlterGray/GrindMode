import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { IoniconsName } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/ThemedText";

import AchivemetItem from "./AchivemetItem";

type AchivementListProps = {};

const AchivementList: React.FC<AchivementListProps> = () => {
  const achievements = [
    {
      title: "Achieve1",
      iconName: "home" as const,
    },
    {
      title: "Achieve2",
      iconName: "home" as const,
    },
    {
      title: "Achieve3",
      iconName: "home" as const,
    },
    {
      title: "Achieve4",
      iconName: "home" as const,
    },
    {
      title: "Achieve5",
      iconName: "home" as const,
    },
    {
      title: "Achieve6",
      iconName: "home" as const,
    },
    {
      title: "Achieve7",
      iconName: "home" as const,
    },
    {
      title: "Achieve8",
      iconName: "home" as const,
    },
    {
      title: "Achieve9",
      iconName: "home" as const,
    },
    {
      title: "Achieve10",
      iconName: "home" as const,
    },
  ];

  const renderItem = (
    achivement: { title: string; iconName: IoniconsName },
    index: number,
  ) => (
    <AchivemetItem
      key={index}
      label={achivement.title}
      iconName={achivement.iconName}
      unlocked
    />
  );

  return (
    <View className="gap-4">
      <AnimatedThemedText className="text-2xl font-medium">
        Achievements
      </AnimatedThemedText>

      <FlatList
        data={achievements}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => renderItem(item, index)}
        numColumns={4}
        scrollEnabled={false}
      />
    </View>
  );
};

export default AchivementList;
