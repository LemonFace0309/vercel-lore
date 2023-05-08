"use client";

import classNames from "classnames";
import { motion } from "framer-motion";

import Card from "./card";
import Section from "./section";

type Event = {
  date: string;
  title: string;
  description: string;
  link: string;
  img: string;
};

type TimelineProps = {
  history: Event[]
}

export default function Timeline({ history }: TimelineProps) {
  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          display: "none",
        },
        visible: {
          opacity: 1,
          display: "flex",
        },
      }}
      initial="initial"
      animate="visible"
      transition={{
        duration: 1.0,
      }}
      className="relative w-full flex flex-col gap-12 before:top-0 before:bottom-0 before:bg-neutral-900 before:absolute before:w-1 lg:before:left-1/2 lg:before:-ml-0.5"
    >
      {history.map((event, i) => (
        <Section
          key={event.date}
          className={classNames(
            "relative w-[calc(100%-2px)] lg:w-1/2 flex items-center self-end justify-end",
            i % 2 == 0 && "lg:self-start lg:justify-start"
          )}
        >
          {/* Connecting Line */}
          <div className="w-full h-1 bg-neutral-900 absolute"></div>
          <Card {...event} className="z-10 ml-12 lg:ml-0" />
          {/* Connecting Box */}
          <div
            className={classNames(
              "absolute w-5 h-5 border-4 border-neutral-900 z-10 bg-white right-full -mr-[0.625rem]",
              i % 2 == 0 && "lg:left-full lg:-ml-[0.625rem]"
            )}
          />
        </Section>
      ))}
    </motion.div>
  );
}
