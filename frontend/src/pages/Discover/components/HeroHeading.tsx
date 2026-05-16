import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface HeroHeadingProps {
  text?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function HeroHeading({ 
  text = "Find your next fresh look", 
  className = "text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-lg leading-tight",
  as: Component = "h1"
}: HeroHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const split = new SplitType(headingRef.current, {
      types: "chars",
    });

    gsap.from(split.chars, {
      y: 30,
      opacity: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: "power4.out",
    });

    return () => {
      split.revert();
    };
  }, [text]);

  return (
    <Component
      ref={headingRef}
      className={className}
    >
      {text}
    </Component>
  );
}