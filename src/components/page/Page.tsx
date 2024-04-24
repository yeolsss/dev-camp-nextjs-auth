interface Props {
  children: React.ReactNode;
}
function Page({ children }: Props) {
  return (
    <main className="mx-auto max-w-[1000px] w-auto min-w-96">{children}</main>
  );
}

export default Page;
