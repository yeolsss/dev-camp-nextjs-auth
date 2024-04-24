"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LINK } from "@/constants/link.constants";

const useHeaderTitle = () => {
  const pathname = usePathname();

  const [titleName, setTitleName] = useState<string>("");

  useEffect(() => {
    switch (pathname) {
      case LINK.SIGN_UP:
        setTitleName("Sign Up");
        break;
      case LINK.LOG_IN:
        setTitleName("Login");
        break;
      default:
        setTitleName("SpartaCodingClub");
    }
  }, [pathname]);

  return titleName;
};

export default useHeaderTitle;
