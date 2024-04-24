interface Props{
  children: React.ReactNode;
}

function Page({children}:Props) {
  return (
      <main>{children}</main>
  );
}

export default Page;