import classNames from "classnames";

import FadeInContainer from "./fade-in-container";
import HistoryCard from "./history-card";
import Section from "./section";

type Event = {
  id: string;
  date: string;
  title: string;
  description: string;
  link: string;
  img: string;
};

type TimelineProps = {
  history: Event[];
};

export default function Timeline({ history }: TimelineProps) {
  return (
    <FadeInContainer
      className={classNames(
        "relative w-full flex flex-col gap-12 mt-8 lg:mt-16",
        "before:top-0 before:bottom-0 before:bg-neutral-900 dark:before:bg-neutral-100 before:absolute before:w-1 lg:before:left-1/2 lg:before:-ml-0.5",
      )}
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
          <div className="w-full h-1 bg-neutral-900 dark:bg-neutral-100 absolute"></div>
          {/* @ts-expect-error Async Server Component */}
          <HistoryCard {...event} className="z-10 ml-12 lg:ml-0" />
          {/* Connecting Box */}
          <div
            className={classNames(
              "absolute w-5 h-5 border-4 border-neutral-900 dark:border-neutral-100 z-10 bg-lightTheme dark:bg-darkTheme right-full -mr-[0.625rem]",
              i % 2 == 0 && "lg:left-full lg:-ml-[0.625rem]"
            )}
          />
        </Section>
      ))}
    </FadeInContainer>
  );
}
