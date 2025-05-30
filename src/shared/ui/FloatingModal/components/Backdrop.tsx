import { Pressable } from "react-native";

type BackdropProps = {
  onCancel: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ onCancel }) => {
  return <Pressable className="absolute inset-0" onPress={onCancel} />;
};

// TODO change names everywhere where the same problem as in this component was
export default Backdrop;
