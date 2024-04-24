"use client";

import Link from "next/link";

interface Props {
  titleName: string;
}

function HeaderTitle({ titleName }: Props) {
  return (
    <Link href={"/"}>
      <h2 className="font-bold text-4xl">{titleName}</h2>
    </Link>
  );
}

export default HeaderTitle;
