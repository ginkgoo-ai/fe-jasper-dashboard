"use client";

import { ChevronDown, LogOut, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GlobalManager from "@/customManager/GlobalManager";
import { useUserStore } from "@/store";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import LogoutTrigger from "../logoutTigger";
import { useTheme } from "next-themes";

const defaultAvatar = '/default.png';

const ThemeOptions = [
  {
    label: 'System',
    value: 'system',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
];

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [_theme, _setTheme] = useState<any>(theme);
  const { userInfo } = useUserStore();
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    setTheme(_theme);
  }, [_theme]);

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-background focus-within:outline-0 lg:focus-within:outline-1">
        <Avatar className="size-6">
          <AvatarImage src={userInfo?.picture ?? defaultAvatar} />
          <AvatarFallback>{userInfo?.fullname?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm hidden lg:inline">{userInfo ? userInfo.fullname : ''}</span>
        <ChevronDown
          size={16}
          className={cn('transition-transform hidden lg:inline', isOpen ? 'rotate-180' : '')}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" sideOffset={4} align="end">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <div className="w-40">
              <h4 className="mb-1 truncate">{userInfo ? userInfo.fullname : ''}</h4>
              <p className="text-xs font-normal font-sans truncate text-gray-500">
                {userInfo ? userInfo.email : ''}
              </p>
            </div>
            <Avatar className="size-8 !flex-none">
              <AvatarImage src={userInfo?.picture ?? defaultAvatar} />
              <AvatarFallback>{userInfo?.fullname?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="inline-flex items-center gap-2 w-full">
            <Palette size={16} />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={_theme} onValueChange={_setTheme}>
                {ThemeOptions.map((option, index) => {
                  return (
                    <DropdownMenuRadioItem key={index} value={option.value}>
                      <div className="flex items-center gap-2">{option.label}</div>
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <LogoutTrigger>
          <DropdownMenuItem className="inline-flex items-center gap-2 w-full">
            <LogOut size={16} />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = (props: { className?: string }) => {
  return (
    <header
      className={cn(
        'w-full h-16 px-4 flex items-center justify-between border-b border-default sl-layout-background', props.className ?? '',
      )}
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="flex flex-[0_0_auto] flex-row items-center space-x-[1rem]">
          <Image className="!h-[1.5rem] !w-[1.5rem] dark:invert" src="/logo.svg" alt="logo" width={0} height={0} priority />
          <span className="text-base hidden lg:inline">{GlobalManager.siteName}</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <User />
      </div>
    </header>
  );
};

export default Header;
