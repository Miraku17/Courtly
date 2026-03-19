"use client";

import FlowingMenu from "@/components/FlowingMenu";
import { FadeIn } from "@/components/common/fade-in";

const sportsItems = [
  { link: "/courts?sport=pickleball", text: "Pickle Ball", image: "/pickle.png" },
  { link: "/courts?sport=tennis", text: "Tennis", image: "/tennis.png" },
  { link: "/courts?sport=basketball", text: "Basketball", image: "/bball1.png" },
];

export const SportsMenu = () => {
  return (
    <section className="bg-bg-dark px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-[2.5rem] font-extrabold uppercase text-text-main md:text-[3.5rem] lg:text-[4.5rem] lg:leading-none">
            Pick Your <span className="text-primary">Sport</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ height: "500px", position: "relative" }}>
            <FlowingMenu
              items={sportsItems}
              speed={15}
              textColor="#ffffff"
              bgColor="#102b0f"
              marqueeBgColor="#d9f170"
              marqueeTextColor="#102b0f"
              borderColor="rgba(255,255,255,0.1)"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
