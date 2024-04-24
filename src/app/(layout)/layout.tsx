import MainHeader from "@/components/header";

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <div className="p-5 w-full">
      <MainHeader />
      {children}
    </div>
  );
}

export default RootLayout;
