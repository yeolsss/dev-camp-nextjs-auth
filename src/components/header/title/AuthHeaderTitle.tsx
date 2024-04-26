"use client";

interface Props {
  children: React.ReactNode;
}

function AuthHeaderTitle({ children }: Props) {
  return <h2 className="font-bold text-2xl">{children}</h2>;
}

export default AuthHeaderTitle;
