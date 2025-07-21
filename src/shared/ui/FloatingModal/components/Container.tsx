import ThemedView2 from "@shared/ui/ThemedView";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <ThemedView2 className="flex-1 items-center justify-center bg-slate-900/20 dark:bg-slate-200/20">
      <ThemedView2 className="bg-light-backgroundSurface dark:bg-dark-backgroundSurface w-10/12 gap-2 rounded-xl p-4">
        {children}
      </ThemedView2>
    </ThemedView2>
  );
};

export default Container;
