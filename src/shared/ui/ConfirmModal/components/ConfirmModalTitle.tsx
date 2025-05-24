import ThemedText from "../../ThemedText";

type ConfirmModalTitleProps = {
  text: string;
};

const ConfirmDialogTitle: React.FC<ConfirmModalTitleProps> = ({ text }) => {
  return <ThemedText className="mb-1 text-lg font-medium">{text}</ThemedText>;
};

export default ConfirmDialogTitle;
