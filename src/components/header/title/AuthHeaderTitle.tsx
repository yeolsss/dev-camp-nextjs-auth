"use client";

interface Props {
  titleName: string;
}

function AuthHeaderTitle({ titleName }: Props) {
  return <h2 className="font-bold text-2xl">{titleName}</h2>;
}

export default AuthHeaderTitle;
