import MainHeader from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <>
      <MainHeader />
      {children}
      <Toaster />
    </>
  );
}

export default RootLayout;
