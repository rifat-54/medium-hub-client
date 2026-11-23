"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import ThemeToggle from "./theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/blogs" },
  { name: "Categories", href: "/categories" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E6DF] bg-[#F8F7F2]/95 backdrop-blur-md dark:border-[#303633] dark:bg-[#171A19]/95">

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Medium Hub home"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#315C50] text-white dark:bg-[#79B5A0] dark:text-[#171A19]">
            <BookOpen size={21} />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#202522] dark:text-[#F2F3EF]">
            Medium<span className="text-[#315C50] dark:text-[#79B5A0]">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#315C50] dark:text-[#79B5A0]"
                  : "text-[#656B66] hover:text-[#315C50] dark:text-[#A4ACA6] dark:hover:text-[#79B5A0]"
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute -bottom-[22px] left-0 h-0.5 w-full rounded-full bg-[#315C50] dark:bg-[#79B5A0]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">

          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-medium text-[#656B66] transition-colors hover:text-[#315C50] dark:text-[#A4ACA6] dark:hover:text-[#79B5A0]"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#315C50] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#25483E] dark:bg-[#79B5A0] dark:text-[#171A19] dark:hover:bg-[#91C5B1]"
          >
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex size-10 items-center justify-center rounded-lg text-[#315C50] transition-colors hover:bg-[#EEECE5] dark:text-[#79B5A0] dark:hover:bg-[#303633]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#E8E6DF] bg-[#F8F7F2] dark:border-[#303633] dark:bg-[#171A19] md:hidden">

          <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-[#E9EDE8] text-[#315C50] dark:bg-[#263A32] dark:text-[#79B5A0]"
                    : "text-[#656B66] hover:bg-[#EEECE5] dark:text-[#A4ACA6] dark:hover:bg-[#303633]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-3 border-t border-[#E8E6DF] dark:border-[#303633]" />

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#656B66] hover:bg-[#EEECE5] dark:text-[#A4ACA6] dark:hover:bg-[#303633]"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#315C50] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#25483E] dark:bg-[#79B5A0] dark:text-[#171A19]"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}