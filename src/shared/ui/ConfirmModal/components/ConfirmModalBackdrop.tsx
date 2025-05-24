import { Pressable } from "react-native";

type ConfirmModalBackdropProps = {
  onCancel: () => void;
};

const ConfirmModalBackdrop: React.FC<ConfirmModalBackdropProps> = ({
  onCancel,
}) => {
  return <Pressable className="absolute inset-0" onPress={onCancel} />;
};

export default ConfirmModalBackdrop;
