"use client";

import { useEffect } from "react";

import { useAnimate } from "framer-motion";

export default function Header() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    async function beginAnimation() {
      await animate(scope.current, { opacity: 1, transform: "scale(1.1)" }, { duration: 0.8, delay: 0.6, ease: "easeInOut" });
      await animate(scope.current, { flexGrow:0, transform: "scale(1)" }, { duration: 0.6, ease: "easeInOut" });
    }

    beginAnimation();
  }, []);

  return (
    <div
      ref={scope}
      className="flex flex-col items-center justify-center w-full opacity-0 grow"
    >
      <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
        Vercel Lore
      </h1>
    </div>
  );
}
