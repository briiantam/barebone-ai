"use client";

import { BackgroundGradient } from "./BackgroundGradient";
import Arrow from "./Arrow";
import { Vortex } from "./Vortex";

const Step = ({
  emoji,
  hours,
  text,
}: {
  emoji: string;
  hours: string;
  text: string;
}) => {
  return (
    <div className="w-full md:w-48 flex flex-col gap-2 items-center justify-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-bold sm:text-l md:text-l lg:text-xl">{hours}</h3>
      <h3 className="font-semibold sm:text-xs md:text-xs lg:text-sm">{text}</h3>
    </div>
  );
};

// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
const Problem = () => {
  return (
    <section className="bg-black text-neutral-content " id="problem">
      <div className="max-w-6xl mx-auto  px-6 sm:px-6 lg:px-8">
        <div className="py-16  md:py-24">
          <BackgroundGradient className="p-[0.5] bg-white  rounded-3xl z-[9] dark:bg-zinc-900">
            <div className="bg-slate-950 rounded-3xl mx-auto px-8 py-12 md:py-16  text-center">
              <h1 className="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-normal mb-6 md:mb-8">
                Startups spend too much time searching for investors
              </h1>
              <p className=" max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20">
                Time spent on investor outreach is time not spent on product...
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-4 lg:gap-2 px-6">
                <Step
                  emoji="🧑‍💻"
                  hours="5 hours"
                  text="Research and compile potential investors list"
                />

                <Arrow extraStyle="md:-scale-x-100 md:-rotate-90" />

                <Step emoji="🔍" hours="4 hours" text="Find contact info" />

                <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />

                <Step emoji="✏️" hours="3 hours" text="Draft email template" />

                <Arrow extraStyle="md:-scale-x-100 md:-rotate-90" />

                <Step emoji="✉️" hours="4 hours" text="Personalize emails" />

                <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />

                <Step
                  emoji="😫"
                  hours="16+ hours"
                  text="and ∞ hours overthinking..."
                />
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 ">
        <div className="flex flex-col gap-2 lg:gap-4 md:mt-10 mb-20 items-center justify-center text-center lg:text-center lg:items-center">
          <Arrow extraStyle="md:-scale-x-350 md:-rotate-270" />
          <p className="text-l md:text-xl lg:text-xl opacity-80 text-slate-100 mb-40">
            There's a better way...
          </p>
        </div>
      </section>
    </section>
  );
};

export default Problem;
