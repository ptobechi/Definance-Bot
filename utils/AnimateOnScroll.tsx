"use client";

import { useEffect, useRef } from "react";

interface AnimateOnScrollProps {
  animation: string;
  children: React.ReactNode;
}

const AnimateOnScroll = ({ animation, children }: AnimateOnScrollProps) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              `animate__animated`,
              `animate__${animation}`
              //   `animate__delay-1s`
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      // Cleanup the observer when the component is unmounted
      observer.disconnect();
    };
  }, []);

  return <div ref={elementRef}>{children}</div>;
};

export default AnimateOnScroll;
