import { View } from "react-native";

type SeparatorProps = {
  horizontal?: boolean;
  vertical?: boolean;
};

const Separator: React.FC<SeparatorProps> = ({ horizontal, vertical }) => {
  const classes = [
    "bg-zinc-300 dark:bg-zinc-600 rounded-2xl my-2",
    horizontal ? "h-[1] w-full" : "",
    vertical ? "w-[1] h-2/4 self-center" : "",
  ].join(" ");

  return <View className={classes} />;
};

export default Separator;
