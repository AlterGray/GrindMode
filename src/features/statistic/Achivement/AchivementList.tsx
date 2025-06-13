import { View } from "react-native";

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

  return (
    <View className="flex-row flex-wrap">
      {achievements.map((achievement, index) => (
        <AchivemetItem
          key={index}
          label={achievement.title}
          iconName={achievement.iconName}
          unlocked
        />
      ))}
    </View>
  );
};

export default AchivementList;
