import { Pressable } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";

// TODO move it to separate file
type Action = {
  title: string;
  onPress: () => void;
};

type NavModalProps = {
  title: string;
  actions: Action[];
};

const NavModal: React.FC<NavModalProps> = ({ title, actions }) => {
  return (
    <ThemedView>
      <ThemedText variant="h4">{title}</ThemedText>
      <ThemedView>
        {/* // TODO create shared list item button */}
        {actions.map((action) => (
          <Pressable key={action.title} onPress={action.onPress}>
            <ThemedText>{action.title}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default NavModal;
