"use client";

import { useEffect } from "react";

import { useAnimate } from "framer-motion";

export default function Header() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    async function beginAnimation() {
      await animate(scope.current, { opacity: 1 }, { duration: 0.8, delay: 0.6, ease: "easeInOut" });
      await animate(scope.current, { height: "initial" }, { duration: 0.4 });
    }

    beginAnimation();
  }, []);

  return (
    <div
      ref={scope}
      className="flex flex-col items-center justify-center w-full opacity-0 h-full"
    >
      <h1 className="text-5xl font-bold text-gray-900">
        Vercel Lore
      </h1>
    </div>
  );
}
