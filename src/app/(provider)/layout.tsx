import { Toaster } from "@/components/ui/toaster";
import RootProvider from "@/provider/rootProvider";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <RootProvider>
      {children}
      <Toaster />
    </RootProvider>
  );
}

export default Layout;
