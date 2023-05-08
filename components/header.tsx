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
      className="flex items-center justify-center w-full opacity-0 h-screen"
    >
      <h1 className="text-5xl font-bold text-gray-900 mb-8 lg:mb-16">
        Vercel Lore
      </h1>
    </div>
  );
}
