"use client";

import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GlobalManager from "@/customManager/GlobalManager";

const Header = () => {
  return (
    <header className="flex-0 flex flex-col items-center border-b border-solid border-gray-200 bg-white">
      <div className="h-[4.5rem] w-full max-w-[var(--width-max)] px-[var(--width-padding)]">
        <div className="relative hidden h-full items-center justify-between md:flex">
          {/* Logo */}
          <Link href="/" className="flex flex-[0_0_auto] flex-row items-center space-x-[1rem]">
            <Image className="!h-[1.5rem] !w-[1.5rem] dark:invert" src="/logo.svg" alt="logo" width={0} height={0} priority />
            <span className="text-[1.25rem]">{GlobalManager.siteName}</span>
          </Link>

          {/* User Profile */}
          <div className="box-border flex flex-[0_0_auto] flex-row items-center justify-center space-x-[0.5rem] rounded-[0.5rem] bg-[#F3F4F6] px-[1rem] py-[0.75rem]">
            <User />
            <span className="text-[1rem] text-[#374151]">Account</span>
          </div>
        </div>
        <div className="relative flex h-full items-center justify-between md:hidden">
          <Menu />
          <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[1.25rem]">{GlobalManager.siteName}</div>
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
