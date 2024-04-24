import ReactQueryProvider from "@/app/(provider)/_components/reactQueryProvider/ReactQueryProvider";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}

export default Layout;
