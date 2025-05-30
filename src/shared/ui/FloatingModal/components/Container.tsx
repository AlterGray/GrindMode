import ThemedView from "@shared/ui/ThemedView";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <ThemedView className="flex-1 items-center justify-center bg-slate-900/20 dark:bg-slate-200/20">
      <ThemedView className="bg-backgroundSurface w-10/12 gap-2 rounded-xl p-4">
        {children}
      </ThemedView>
    </ThemedView>
  );
};

export default Container;
