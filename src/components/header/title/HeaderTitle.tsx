"use client";

import useHeaderTitle from "@/hooks/headerTitle";

function HeaderTitle() {
  const titleName = useHeaderTitle();

  return <h2 className="font-bold text-2xl">{titleName}</h2>;
}

export default HeaderTitle;
