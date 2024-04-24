interface Props {
  children: React.ReactNode;
}

function Page({ children }: Props) {
  return <main className="m-auto max-w-[1200px]">{children}</main>;
}

export default Page;
