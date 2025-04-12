"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "首页", href: "/" },
    { label: "仪表盘", href: "/dashboard" },
    { label: "设置", href: "/settings" },
  ];

  return (
    <header className="flex-0 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Jasper
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">用户名</span>
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 px-3 py-2">
              <span className="text-gray-700">用户名</span>
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
