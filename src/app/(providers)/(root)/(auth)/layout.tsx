interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="m-auto max-w-[1000px] w-auto min-w-96 flex flex-col gap-5">
      {children}
    </div>
  );
}

export default AuthLayout;
