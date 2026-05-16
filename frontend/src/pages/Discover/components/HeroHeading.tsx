import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function HeroHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Split the text into characters
    const split = new SplitType(headingRef.current, {
      types: "chars",
    });

    // Animate the characters
    gsap.from(split.chars, {
      y: 30,
      opacity: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: "power4.out",
    });

    // Cleanup function to revert the split on unmount
    return () => {
      split.revert();
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-lg leading-tight"
    >
      Find your next fresh look
    </h1>
  );
}