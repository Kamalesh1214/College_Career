import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_KEY = "college-career-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="fixed right-4 top-3 z-50 flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card/85 text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:-translate-y-px hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  );
}
