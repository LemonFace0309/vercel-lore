"use client";

import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { HiMoon, HiSun } from "react-icons/hi";

import useTheme from "@/hooks/use-theme";
import FadeInContainer from "./fade-in-container";

export default function Header() {
  const [playOnDark] = useSound("/sounds/dark-on.mp3");
  const [playOnLight] = useSound("/sounds/light-on.mp3");
  const [theme, setTheme] = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      playOnLight();
    } else {
      playOnDark();
    }

    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme, playOnDark, playOnLight]);

  return (
    <FadeInContainer className="absolute w-full top-0 items-center justify-end p-4 text-black dark:text-white">
      <div className="hidden md:block">
        <button
          className="items-center justify-center w-12 h-12 rounded-md dark:bg-gray-600 bg-pink focus:outline-none focus:ring-2 ring-blue-700 d-flex"
          onClick={toggleTheme}
        >
          {mounted ? (
            theme === "light" ? (
              <HiMoon className="inline w-6 h-6 ml-1" />
            ) : (
              <HiSun className="inline w-6 h-6" />
            )
          ) : null}
        </button>
      </div>
    </FadeInContainer>
  );
}
