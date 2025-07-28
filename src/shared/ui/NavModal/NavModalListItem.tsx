import { Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { IoniconsName } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

type NavModalListItemProps = {
  onPress: () => void;
  iconName?: IoniconsName;
  iconColor?: string;
  title: string;
  isMarked?: boolean;
};

const NavModalListItem: React.FC<NavModalListItemProps> = ({
  onPress,
  iconName,
  iconColor,
  title,
  isMarked = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={i18n.t("selectFolderArg", { title })}
      className="flex-row items-center justify-between gap-8 bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary"
    >
      <View className="flex-row items-center gap-8">
        {iconName && <Ionicons name={iconName} size={24} color={iconColor} />}
        <AnimatedThemedText
          className={`${!iconName && "ml-16"}`}
          style={{ color: iconColor }}
        >
          {title}
        </AnimatedThemedText>
      </View>
      {isMarked && <Ionicons name="checkmark" size={24} color={iconColor} />}
    </Pressable>
  );
};

export default NavModalListItem;
