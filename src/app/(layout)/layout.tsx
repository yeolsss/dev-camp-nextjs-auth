import MainHeader from "@/components/header";

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}

export default RootLayout;
