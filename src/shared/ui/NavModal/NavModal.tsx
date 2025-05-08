import { Modal, Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import ThemedView from "../ThemedView";
import StyledButton from "../StyledButton";
import RoutineListItem from "@features/routine/RoutineListItem";
import StyledItem from "../StyledList/StyledItem";
import FolderListItem from "@features/folder/components/FolderListItem";
import { Ionicons } from "@expo/vector-icons";
import NavModalListItem from "./NavModalListItem";

// TODO move it to separate file
type Action = {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
};

type NavModalProps = {
  title: string;
  actions: Action[];
  isVisible: boolean;
  onClose: () => void;
};

const NavModal: React.FC<NavModalProps> = ({
  title,
  actions,
  isVisible,
  onClose,
}) => {
  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <Pressable onPress={onClose} className="absolute inset-0" />
      <ThemedView className="absolute bottom-0 w-full gap-4 bg-light-backgroundSurface px-4 py-4 dark:bg-dark-backgroundSurface">
        <ThemedText className="ml-8" variant="h4">
          {title}
        </ThemedText>
        {/* // TODO create shared list item button */}
        {actions.map((action) => (
          <NavModalListItem
            key={action.title}
            onPress={action.onPress}
            iconName={action.iconName}
            title={action.title}
          />
        ))}
      </ThemedView>
    </Modal>
  );
};

export default NavModal;
