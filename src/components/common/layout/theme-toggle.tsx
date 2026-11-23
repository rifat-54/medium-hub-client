
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex size-9 items-center justify-center rounded-full border border-[#E8E6DF] text-[#315C50] transition-colors hover:bg-[#EEECE5] dark:border-[#303633] dark:text-[#79B5A0] dark:hover:bg-[#303633]"
    >
      <Moon className="size-[19px] dark:hidden" />

      <Sun className="hidden size-[19px] dark:block" />
    </button>
  );
}
