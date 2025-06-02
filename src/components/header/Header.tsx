"use client";

import HeaderNavigation from "./HeaderNavigation";
import AuthPageNavigation from "./AuthPageNavigation";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import LoginButton from "../button/LoginButton";
import { usePathname } from "next/navigation";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isLoggedAtom } from "@/atoms/isLogged";

const Header = () => {
  const [initialLoginState, setInitialLoginState] = useState<boolean | null>(
    null
  );
  const [isLogged, setIsLoggedIn] = useAtom(isLoggedAtom);
  const { isOpen, setIsOpen } = useSidebarState();
  const currentPath = usePathname();
  const isAuthPage =
    currentPath.includes("/signin") || currentPath.includes("/signup");

  useEffect(() => {
    const localValue = localStorage.getItem("isLogin") === "true";
    setInitialLoginState(localValue);
    setIsLoggedIn(localValue); // isLogged 초기화도 함께!
  }, []);

  const tabletStyle =
    "tablet:h-[60px] tablet:gap-[24px] tablet:px-[72px] tablet:py-[15px] tablet:text-lg";
  const pcStyle =
    "pc:h-[88px] pc:gap-[24px] pc:px-[240px] pc:py-[24px] pc:text-xl";

  return (
    <>
      <header
        className={`flex h-[54px] w-full items-center justify-between border-b-[1px] border-b-gray-100 px-[24px] py-[12px] text-xs ${tabletStyle} ${pcStyle}`}
      >
        <Logo />
        <HeaderNavigation isAuthPage={isAuthPage} />
        {isAuthPage ? (
          <AuthPageNavigation />
        ) : isLogged ? (
          <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <HeaderMenu />
          </button> // initialState가 true여도 바뀌어야 하고, isLogged가 트루여도 바뀌어야 함.
        ) : (
          <LoginButton />
        )}
      </header>
    </>
  );
};

export default Header;
