"use client";

import CustomLink from "@/components/customLink";
import { usePathname } from "next/navigation";
import { LINK } from "@/constants/link.constants";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function AuthLinkGroup() {
  const pathName = usePathname();
  const defaultClassName = "hover:bg-accent hover:text-primary";
  const activeClassName = `bg-accent text-primary ${defaultClassName}`;
  const { data: session } = useSession();

  if (session === undefined) {
    return null;
  }

  if (session && session.user) {
    return <Button onClick={() => signOut()}>로그아웃</Button>;
  }

  return (
    <div className="bg-primary rounded-2xl flex gap-1 relative">
      <CustomLink
        href="/login"
        className={
          pathName === LINK.LOG_IN ? activeClassName : defaultClassName
        }
      >
        로그인
      </CustomLink>
      <span className="flex justify-center items-center bg-primary text-primary-foreground">
        /
      </span>
      <CustomLink
        href="/signup"
        className={
          pathName === LINK.SIGN_UP ? activeClassName : defaultClassName
        }
      >
        회원가입
      </CustomLink>
    </div>
  );
}

export default AuthLinkGroup;
